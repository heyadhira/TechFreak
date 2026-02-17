# TechFreak — Web Development Agency Platform

A modern, full-featured agency website with an integrated admin panel for content management. Built with React, Supabase, and Cloudinary.

## Features

- **Public Website** — Home, Services, Portfolio, Blog, About, Contact pages
- **Service Detail Pages** — Individual SEO-optimized pages for each service
- **Admin Panel** — Full CRUD for services, blog posts, portfolio, team, testimonials, pricing, leads, and site settings
- **Lead Management** — Contact form submissions with status tracking, notes, and CSV export
- **Blog CMS** — WYSIWYG editor, categories, tags, featured posts
- **Image Uploads** — Cloudinary integration for all media
- **SEO** — Structured data, meta tags, `robots.txt`, `sitemap.xml`
- **Dark Mode** — Theme toggle with system preference detection
- **Responsive Design** — Glassmorphism, Framer Motion animations, mobile-first

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS + Framer Motion |
| UI Components | Shadcn UI (Radix primitives) |
| Backend | Supabase (Postgres, Auth, Storage) |
| Image CDN | Cloudinary |
| Data Fetching | TanStack React Query |
| Routing | React Router v6 |
| Icons | Lucide React |
| Notifications | Sonner toasts |

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project
- A [Cloudinary](https://cloudinary.com) account

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
```

### 3. Set up the database

Run the migration script in your Supabase SQL editor:

```bash
# Schema — creates all tables, indexes, and RLS policies
supabase_migration.sql

# Seed data (optional) — populates tables with sample content
seed_data.sql
```

### 4. Run the dev server

```bash
npm run dev
```

### 5. Configure admin access

Navigate to `/AdminLogin` and sign in. Then go to **Settings** to update your site name, contact info, SEO, and social links.

## Project Structure

```
src/
├── api/
│   ├── localClient.js      # Supabase API handler (CRUD, image uploads)
│   └── supabaseClient.js   # Supabase client init
├── components/
│   ├── admin/               # AdminLayout, AdminProtectedRoute, ProjectDownloader
│   ├── home/                # Homepage sections (Hero, Services, Portfolio, etc.)
│   ├── ui/                  # Shadcn UI components
│   ├── SEO.jsx              # Page-level SEO meta tags
│   └── StructuredData.jsx   # JSON-LD structured data
├── hooks/                   # Custom React hooks
├── lib/                     # Auth contexts, theme, routing utilities
├── pages/                   # All page components (public + admin)
├── utils/                   # Helper functions
├── App.jsx                  # Root component with routing
├── Layout.jsx               # Site layout (navbar + footer)
└── pages.config.js          # Page registry
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Auto-fix lint issues |

## Admin Panel

Access at `/AdminLogin`. Manage:

- **Services** — Title, description, pricing, features, images
- **Blog** — Rich text posts with tags, categories, featured images
- **Portfolio** — Project showcases with tech stacks and images
- **Team** — Member bios, photos, social links
- **Testimonials** — Client reviews with ratings
- **Pricing** — Plan tiers with feature lists
- **Leads** — Contact form submissions, status tracking
- **Settings** — Site name, SEO, contact info, social links, hero section

## Deployment

Deploy to [Vercel](https://vercel.com):

```bash
npm run build
```

The `vercel.json` is pre-configured for SPA routing.

---

Built with ❤️ by TechFreak
