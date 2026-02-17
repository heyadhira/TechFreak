import { supabase } from './supabaseClient';

// Map API endpoints to Supabase table names
const endpointToTable = {
    '/posts': 'blog_posts',
    '/services': 'services',
    '/portfolio': 'portfolios',
    '/pricing': 'pricing_plans',
    '/team': 'team_members',
    '/testimonials': 'testimonials',
    '/leads': 'leads',
    '/settings': 'site_settings',
};

// Default ordering for certain tables
const tableOrdering = {
    'blog_posts': { column: 'published_at', ascending: false },
    'services': { column: 'order', ascending: true },
    'pricing_plans': { column: 'order', ascending: true },
    'team_members': { column: 'order', ascending: true },
    'testimonials': { column: 'created_at', ascending: false },
    'leads': { column: 'created_at', ascending: false },
};

// Default filters for public-facing queries
const tableDefaultFilters = {
    'testimonials': { column: 'is_active', value: true },
};

/**
 * Parse an endpoint like "/posts/5" or "/portfolio?featured=true" into
 * { table, id, type, params } handling query parameters.
 */
function parseEndpoint(endpoint) {
    // Strip query parameters
    const [path, queryString] = endpoint.split('?');
    const params = {};
    if (queryString) {
        new URLSearchParams(queryString).forEach((value, key) => {
            params[key] = value;
        });
    }

    // Special: /posts/by-slug/{slug}
    const slugMatch = path.match(/^\/posts\/by-slug\/(.+)$/);
    if (slugMatch) {
        return { table: 'blog_posts', type: 'by-slug', slug: slugMatch[1], params };
    }

    // Special: /leads/unread-count
    if (path === '/leads/unread-count') {
        return { table: 'leads', type: 'unread-count', params };
    }

    // Special: /upload
    if (path === '/upload') {
        return { table: null, type: 'upload', params };
    }

    // Special: /settings (no ID-based routes)
    if (path === '/settings') {
        return { table: 'site_settings', type: 'settings', params };
    }

    // Standard: /resource or /resource/:id
    for (const [routePath, table] of Object.entries(endpointToTable)) {
        if (path === routePath) {
            return { table, type: 'list', params };
        }
        if (path.startsWith(routePath + '/')) {
            const id = path.slice(routePath.length + 1);
            return { table, type: 'single', id, params };
        }
    }

    console.error('Unknown endpoint:', endpoint);
    return { table: null, type: 'unknown', params };
}

/**
 * Handle GET requests
 */
async function handleGet(endpoint) {
    const parsed = parseEndpoint(endpoint);

    if (parsed.type === 'by-slug') {
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('slug', parsed.slug)
            .eq('is_published', true)
            .single();
        if (error) throw new Error(error.message);
        return data;
    }

    if (parsed.type === 'unread-count') {
        const { count, error } = await supabase
            .from('leads')
            .select('*', { count: 'exact', head: true })
            .eq('is_read', false);
        if (error) throw new Error(error.message);
        return { count };
    }

    if (parsed.type === 'settings') {
        const { data, error } = await supabase
            .from('site_settings')
            .select('setting_key, setting_value');
        if (error) throw new Error(error.message);
        // Return as { key: value } map to match Laravel behavior
        const map = {};
        (data || []).forEach(row => {
            map[row.setting_key] = row.setting_value;
        });
        return map;
    }

    if (parsed.type === 'single') {
        const { data, error } = await supabase
            .from(parsed.table)
            .select('*')
            .eq('id', parsed.id)
            .single();
        if (error) throw new Error(error.message);
        return data;
    }

    if (parsed.type === 'list') {
        let query = supabase.from(parsed.table).select('*');

        // Apply default filters (skip if ?active=all is passed — admin needs all records)
        const defaultFilter = tableDefaultFilters[parsed.table];
        if (defaultFilter && parsed.params?.active !== 'all') {
            query = query.eq(defaultFilter.column, defaultFilter.value);
        }

        // Apply query parameter filters (e.g. ?featured=true&category=web)
        const paramToColumn = {
            featured: 'is_featured',
            category: 'category',
            active: 'is_active',
            is_read: 'is_read',
        };
        for (const [param, value] of Object.entries(parsed.params || {})) {
            const column = paramToColumn[param] || param;
            // Skip 'all' values (used as "no filter")
            if (value === 'all') continue;
            // Convert string booleans
            const converted = value === 'true' ? true : value === 'false' ? false : value;
            query = query.eq(column, converted);
        }

        // Apply ordering
        const ordering = tableOrdering[parsed.table];
        if (ordering) {
            query = query.order(ordering.column, { ascending: ordering.ascending, nullsFirst: false });
        }

        const { data, error } = await query;
        if (error) throw new Error(error.message);
        return data || [];
    }

    throw new Error(`Unhandled GET endpoint: ${endpoint}`);
}

/**
 * Handle POST requests
 */
async function handlePost(endpoint, body) {
    const parsed = parseEndpoint(endpoint);

    // File upload to Cloudinary (URL stored in Supabase)
    if (parsed.type === 'upload') {
        if (!(body instanceof FormData)) {
            throw new Error('Upload requires FormData');
        }
        const file = body.get('file');
        const folder = body.get('folder') || 'uploads';

        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
        const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;
        const apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET;

        const timestamp = Math.round(Date.now() / 1000);

        // Generate SHA-1 signature: folder=X&timestamp=T + apiSecret
        const paramsToSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
        const encoder = new TextEncoder();
        const data = encoder.encode(paramsToSign);
        const hashBuffer = await crypto.subtle.digest('SHA-1', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const signature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

        const cloudinaryData = new FormData();
        cloudinaryData.append('file', file);
        cloudinaryData.append('folder', folder);
        cloudinaryData.append('timestamp', String(timestamp));
        cloudinaryData.append('api_key', apiKey);
        cloudinaryData.append('signature', signature);

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            { method: 'POST', body: cloudinaryData }
        );

        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            throw new Error(err.error?.message || 'Cloudinary upload failed');
        }

        const result = await response.json();
        return {
            path: result.public_id,
            url: result.secure_url,
        };
    }

    // Settings update (special shape: { settings: { key: value, ... } })
    if (parsed.type === 'settings') {
        const settings = body.settings || body;
        for (const [key, value] of Object.entries(settings)) {
            const { error } = await supabase
                .from('site_settings')
                .upsert({ setting_key: key, setting_value: value, setting_type: 'general' }, { onConflict: 'setting_key' });
            if (error) throw new Error(error.message);
        }
        // Return updated settings
        return handleGet('/settings');
    }

    // Standard create
    if (parsed.table) {
        // Auto-set defaults for visibility fields (admin forms don't always include these)
        if (parsed.table === 'blog_posts') {
            if (body.is_published === undefined) body.is_published = true;
            if (!body.published_at) body.published_at = new Date().toISOString();
        }
        if (['services', 'portfolios', 'pricing_plans', 'team_members', 'testimonials'].includes(parsed.table)) {
            if (body.is_active === undefined) body.is_active = true;
        }

        const { data, error } = await supabase
            .from(parsed.table)
            .insert(body)
            .select()
            .single();
        if (error) throw new Error(error.message);
        return data;
    }

    throw new Error(`Unhandled POST endpoint: ${endpoint}`);
}

/**
 * Handle PUT requests
 */
async function handlePut(endpoint, body) {
    const parsed = parseEndpoint(endpoint);

    if (!parsed.table || !parsed.id) {
        throw new Error(`PUT requires a table and ID. Endpoint: ${endpoint}`);
    }

    // Auto-set published_at for blog posts
    if (parsed.table === 'blog_posts' && body.is_published && !body.published_at) {
        // Only set if not already set — check current value
        const { data: existing } = await supabase
            .from('blog_posts')
            .select('published_at')
            .eq('id', parsed.id)
            .single();
        if (!existing?.published_at) {
            body.published_at = new Date().toISOString();
        }
    }

    const { data, error } = await supabase
        .from(parsed.table)
        .update(body)
        .eq('id', parsed.id)
        .select()
        .single();
    if (error) throw new Error(error.message);
    return data;
}

/**
 * Handle DELETE requests
 */
async function handleDelete(endpoint) {
    const parsed = parseEndpoint(endpoint);

    if (!parsed.table || !parsed.id) {
        throw new Error(`DELETE requires a table and ID. Endpoint: ${endpoint}`);
    }

    const { error } = await supabase
        .from(parsed.table)
        .delete()
        .eq('id', parsed.id);
    if (error) throw new Error(error.message);
    return null;
}

/**
 * The localClient — same interface as before, backed by Supabase.
 * All page components use localClient.get/post/put/delete and continue to work unchanged.
 */
export const localClient = {
    get: (endpoint) => handleGet(endpoint),
    post: (endpoint, data) => handlePost(endpoint, data),
    put: (endpoint, data) => handlePut(endpoint, data),
    delete: (endpoint) => handleDelete(endpoint),
};
