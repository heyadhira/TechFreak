-- ================================================
-- Supabase SQL Migration for TechFreak
-- Run this in your Supabase SQL Editor
-- ================================================

-- 1. Blog Posts
CREATE TABLE IF NOT EXISTS blog_posts (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image TEXT,
    category TEXT DEFAULT 'web-development',
    tags JSONB,
    meta_title TEXT,
    meta_description TEXT,
    author_name TEXT,
    read_time INTEGER,
    is_published BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Leads
CREATE TABLE IF NOT EXISTS leads (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    service_interested TEXT,
    budget TEXT,
    message TEXT NOT NULL,
    source TEXT DEFAULT 'contact-form',
    status TEXT DEFAULT 'new',
    notes TEXT,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Portfolios
CREATE TABLE IF NOT EXISTS portfolios (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    client_name TEXT,
    project_url TEXT,
    thumbnail_url TEXT,
    images JSONB,
    tech_stack JSONB,
    completion_date DATE,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Pricing Plans
CREATE TABLE IF NOT EXISTS pricing_plans (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    original_price DECIMAL(10, 2),
    description TEXT,
    features JSONB,
    is_popular BOOLEAN DEFAULT false,
    category TEXT DEFAULT 'basic',
    "order" INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Services
CREATE TABLE IF NOT EXISTS services (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    title_hindi TEXT,
    description TEXT NOT NULL,
    description_hindi TEXT,
    icon TEXT,
    price_starting DECIMAL(10, 2),
    features JSONB,
    image_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    "order" INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Site Settings
CREATE TABLE IF NOT EXISTS site_settings (
    id BIGSERIAL PRIMARY KEY,
    setting_key TEXT UNIQUE NOT NULL,
    setting_value JSONB,
    setting_type TEXT DEFAULT 'general',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 7. Team Members
CREATE TABLE IF NOT EXISTS team_members (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    designation TEXT NOT NULL,
    bio TEXT,
    photo_url TEXT,
    email TEXT,
    linkedin TEXT,
    twitter TEXT,
    github TEXT,
    "order" INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 8. Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
    id BIGSERIAL PRIMARY KEY,
    client_name TEXT NOT NULL,
    client_designation TEXT,
    company TEXT,
    photo_url TEXT,
    content TEXT NOT NULL,
    rating INTEGER DEFAULT 5,
    project_type TEXT,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- ================================================
-- Row Level Security (RLS) Policies
-- Public read access, authenticated write access
-- ================================================

-- Enable RLS on all tables
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Public read policies (anyone can view published content)
CREATE POLICY "Public read blog_posts" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Public read portfolios" ON portfolios FOR SELECT USING (true);
CREATE POLICY "Public read pricing_plans" ON pricing_plans FOR SELECT USING (true);
CREATE POLICY "Public read services" ON services FOR SELECT USING (true);
CREATE POLICY "Public read site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public read team_members" ON team_members FOR SELECT USING (true);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (true);

-- Allow anyone to submit leads (contact form)
CREATE POLICY "Public insert leads" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read leads" ON leads FOR SELECT USING (true);

-- Authenticated user policies (admin CRUD)
CREATE POLICY "Admin insert blog_posts" ON blog_posts FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update blog_posts" ON blog_posts FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin delete blog_posts" ON blog_posts FOR DELETE TO authenticated USING (true);

CREATE POLICY "Admin update leads" ON leads FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin delete leads" ON leads FOR DELETE TO authenticated USING (true);

CREATE POLICY "Admin insert portfolios" ON portfolios FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update portfolios" ON portfolios FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin delete portfolios" ON portfolios FOR DELETE TO authenticated USING (true);

CREATE POLICY "Admin insert pricing_plans" ON pricing_plans FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update pricing_plans" ON pricing_plans FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin delete pricing_plans" ON pricing_plans FOR DELETE TO authenticated USING (true);

CREATE POLICY "Admin insert services" ON services FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update services" ON services FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin delete services" ON services FOR DELETE TO authenticated USING (true);

CREATE POLICY "Admin insert site_settings" ON site_settings FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update site_settings" ON site_settings FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Admin insert team_members" ON team_members FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update team_members" ON team_members FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin delete team_members" ON team_members FOR DELETE TO authenticated USING (true);

CREATE POLICY "Admin insert testimonials" ON testimonials FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update testimonials" ON testimonials FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin delete testimonials" ON testimonials FOR DELETE TO authenticated USING (true);

-- ================================================
-- Storage: Create a public bucket for uploads
-- ================================================
-- NOTE: You must also create a storage bucket named "uploads" in
-- Supabase Dashboard > Storage > New Bucket > Name: "uploads" > Public: ON
