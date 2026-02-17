import { useQuery } from '@tanstack/react-query';
import { localClient } from '@/api/localClient';

const defaultSettings = {
    site_name: 'TechFreak',
    tagline: 'Premium Web Development Services',
    phone: '+91 98765 43210',
    email: 'hello@techfreak.in',
    address: 'Mumbai, Maharashtra, India',
    whatsapp: '919876543210',
    meta_title: 'TechFreak - Premium Web Development Services',
    meta_description: 'Professional web development services for Indian businesses. Custom websites, e-commerce, SEO optimization starting at ₹4,999.',
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
    hero_title: 'Build Your Dream Website',
    hero_subtitle: 'Starting at ₹4,999',
    hero_description: 'Transform your business with stunning, high-performance websites.'
};

export function useSiteSettings() {
    const { data: savedSettingsResponse, isLoading } = useQuery({
        queryKey: ['site-settings'],
        queryFn: () => localClient.get('/settings'),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    // localClient.get('/settings') returns a { key: value } map
    const savedSettings = savedSettingsResponse || {};

    // Merge saved settings with default settings
    const settings = { ...defaultSettings };

    if (savedSettings && typeof savedSettings === 'object') {
        Object.entries(savedSettings).forEach(([key, value]) => {
            try {
                // Try to parse if it's a JSON string, otherwise use the value directly
                settings[key] = typeof value === 'string' && (value.startsWith('{') || value.startsWith('['))
                    ? JSON.parse(value)
                    : value;
            } catch {
                settings[key] = value;
            }
        });
    }

    return { settings, isLoading };
}
