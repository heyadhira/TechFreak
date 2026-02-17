# Setup Guide

## 1. Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Open the **SQL Editor** and run `supabase_migration.sql` to create all tables
3. (Optional) Run `seed_data.sql` to populate sample data
4. Copy your **Project URL** and **Anon Key** from Settings → API

## 2. Cloudinary Setup

1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Copy your **Cloud Name** from the dashboard

## 3. Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
```

## 4. Install & Run

```bash
npm install
npm run dev
```

## 5. Admin Configuration

1. Navigate to `/AdminLogin`
2. Go to **Settings** and update:
   - Site name and tagline
   - Phone, email, address, WhatsApp number
   - SEO meta title and description
   - Social media links
   - Hero section content

## 6. Add Content

Use the admin panel to add:

- Services (with pricing, features, images)
- Portfolio projects (with tech stacks, images)
- Blog posts (with rich text editor)
- Team members (with photos, social links)
- Client testimonials (with ratings)
- Pricing plans (with feature lists)

## 7. Deploy

Deploy to Vercel, Netlify, or any static hosting:

```bash
npm run build
```

The `dist/` folder contains the production build. `vercel.json` is included for Vercel SPA routing.
