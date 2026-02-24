-- ================================================
-- Replace Portfolio Data with Real Demo Projects
-- Run this in your Supabase SQL Editor
-- ================================================

-- Step 1: Clear existing portfolio entries
DELETE FROM portfolios;

-- Step 2: Insert real demo projects
INSERT INTO portfolios (title, description, category, client_name, project_url, thumbnail_url, images, tech_stack, completion_date, is_featured, is_active)
VALUES

-- 1. Royal Marble Studio
(
    'Royal Marble Studio',
    'Premium luxury marble and natural stone installations website. Showcasing 30+ years of craftsmanship excellence with an elegant, image-rich design featuring Italian marble, granite, quartz collections, and a project gallery.',
    'corporate',
    'Royal Marble Studio',
    'https://marble-majesty-studio.vercel.app/',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
    '[]',
    '["React", "Vite", "Tailwind CSS", "Vercel"]',
    '2025-01-15',
    true,
    true
),

-- 2. Decorizz
(
    'Decorizz - Luxury Home Décor',
    'Premium modern home décor e-commerce platform. Features curated luxury collections of wall art, designer clocks, and minimalist planters with a sleek shopping experience and elegant product showcases.',
    'e-commerce',
    'Decorizz',
    'https://decorizz-luxury-redesign.vercel.app/',
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop',
    '[]',
    '["React", "Vite", "Tailwind CSS", "Vercel"]',
    '2025-02-10',
    true,
    true
),

-- 3. PlaySchool Website
(
    'PlaySchool - Early Learning Center',
    'Vibrant and engaging website for a children''s play school. Features colorful UI, program details, admission forms, gallery sections, and parent testimonials designed to attract and inform parents.',
    'corporate',
    'PlaySchool',
    'http://autosite.infinityfree.me/PlaySchool/',
    'https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&h=600&fit=crop',
    '[]',
    '["HTML", "CSS", "JavaScript"]',
    '2024-11-20',
    false,
    true
),

-- 4. Andaman Paradise
(
    'Andaman Paradise - Tourism Portal',
    'Official tourism portal for the Andaman Islands featuring pristine island destinations, seasonal experiences, live weather updates, traveler stories, and comprehensive travel planning tools with stunning visual design.',
    'corporate',
    'Andaman Paradise',
    'https://andaman-paradise.vercel.app/homepage',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop',
    '[]',
    '["React", "Vite", "Tailwind CSS", "Vercel"]',
    '2025-01-25',
    true,
    true
),

-- 5. A One Event Management
(
    'A One Events',
    'Full-service event management company website featuring wedding planning, corporate events, birthday celebrations, and more. Includes service catalogs, event galleries, booking forms, and client testimonials.',
    'corporate',
    'A One Events',
    'https://autosite.infinityfree.me/aoneevent/pages/homepage.html',
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop',
    '[]',
    '["HTML", "CSS", "JavaScript"]',
    '2024-10-15',
    false,
    true
),

-- 6. Food Ordering Platform
(
    'FoodHub - Online Ordering',
    'Modern food ordering and restaurant website with menu browsing, online ordering system, delivery tracking, and restaurant showcase. Designed with appetizing visuals and seamless user experience.',
    'e-commerce',
    'FoodHub',
    'https://autosite.infinityfree.me/food/',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop',
    '[]',
    '["HTML", "CSS", "JavaScript"]',
    '2024-09-20',
    false,
    true
),

-- 7. Dental Oasis
(
    'Dental Oasis - Dental Clinic',
    'Professional dental clinic website featuring appointment booking, service listings, doctor profiles, patient testimonials, and a clean medical-grade design that builds trust and drives patient conversions.',
    'corporate',
    'Dental Oasis',
    'https://autosite.infinityfree.me/Dental-Oasis',
    'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=600&fit=crop',
    '[]',
    '["HTML", "CSS", "JavaScript"]',
    '2024-08-10',
    true,
    true
),

-- 8. Shrihari - Business Website
(
    'Shrihari Enterprises',
    'Corporate business website showcasing company services, portfolio, team members, and contact information. Professional design with modern aesthetics, smooth animations, and responsive layout.',
    'corporate',
    'Shrihari Enterprises',
    'https://autosite.infinityfree.me/shrihari',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
    '[]',
    '["HTML", "CSS", "JavaScript"]',
    '2024-07-05',
    false,
    true
),

-- 9. Yashvi Boutique
(
    'Yashvi Boutique',
    'Elegant fashion boutique e-commerce website with product catalog, collection showcases, size guides, and shopping cart. Designed with luxury aesthetics to elevate the brand''s premium positioning.',
    'e-commerce',
    'Yashvi Boutique',
    'https://autosite.infinityfree.me/Yashvi-Boutique/',
    'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=600&fit=crop',
    '[]',
    '["HTML", "CSS", "JavaScript"]',
    '2024-12-01',
    true,
    true
),

-- 10. Dakshiini Cafe
(
    'Dakshiini Cafe',
    'South Indian café website featuring a rich menu showcase, ambiance gallery, online reservation system, and location details. Warm, inviting design that captures the essence of authentic South Indian cuisine.',
    'startup',
    'Dakshiini Cafe',
    'https://autosite.infinityfree.me/DakshiiniCafe/pages/homepage.html',
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop',
    '[]',
    '["HTML", "CSS", "JavaScript"]',
    '2024-11-10',
    false,
    true
),

-- 11. Hospital CRM
(
    'Hospital CRM System',
    'Comprehensive hospital management CRM with patient records, appointment scheduling, doctor dashboards, billing management, and admin controls. Full-stack web application built for healthcare efficiency.',
    'corporate',
    'Hospital CRM',
    'https://autosite.infinityfree.me/hospital-crm/login.php',
    'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&h=600&fit=crop',
    '[]',
    '["PHP", "MySQL", "Bootstrap", "JavaScript"]',
    '2024-06-15',
    true,
    true
),

-- 12. Juicy - Juice Bar
(
    'Juicy - Fresh Juice Bar',
    'Vibrant and refreshing juice bar website with menu displays, nutritional information, online ordering, and store locator. Eye-catching design with bold colors that capture the brand''s energy.',
    'startup',
    'Juicy',
    'https://autosite.infinityfree.me/juicy/',
    'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=800&h=600&fit=crop',
    '[]',
    '["HTML", "CSS", "JavaScript"]',
    '2024-10-25',
    false,
    true
),

-- 13. Srishti PlaySchool
(
    'Srishti PlaySchool',
    'Creative and child-friendly play school website featuring curriculum details, activities showcase, facility tours, admission process, and parent resources. Designed with playful elements to reflect the school''s nurturing environment.',
    'corporate',
    'Srishti PlaySchool',
    'https://autosite.infinityfree.me/SrishtiPlaySchool/',
    'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop',
    '[]',
    '["HTML", "CSS", "JavaScript"]',
    '2024-12-20',
    false,
    true
),

-- 14. RiderzArmy
(
    'RiderzArmy - Ride Sharing Platform',
    'Modern ride-sharing and delivery platform with real-time tracking, driver onboarding, fare estimation, and seamless booking experience. Built for speed and reliability with a sleek mobile-first interface.',
    'startup',
    'RiderzArmy',
    'https://rider-techfreak.lovable.app',
    'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
    '[]',
    '["React", "Vite", "Tailwind CSS", "Lovable"]',
    '2025-02-15',
    true,
    true
),

-- 15. LUXEHAIR
(
    'LUXEHAIR - Premium Hair Solutions',
    'Premium wigs and hair solutions e-commerce platform for men and women. Features curated collections of medical wigs, hair systems, and custom fittings with elegant product showcases and confidence-boosting brand aesthetics.',
    'e-commerce',
    'LUXEHAIR',
    'https://hair-techfreak.lovable.app',
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop',
    '[]',
    '["React", "Vite", "Tailwind CSS", "Lovable"]',
    '2025-02-18',
    true,
    true
),

-- 16. LoanGuru
(
    'LoanGuru - Smart Loan Platform',
    'Fintech loan comparison and application platform. Features EMI calculators, eligibility checks, multi-lender comparisons, and streamlined application workflows designed to simplify the borrowing experience.',
    'startup',
    'LoanGuru',
    'https://loan-guru-techfreak.lovable.app',
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop',
    '[]',
    '["React", "Vite", "Tailwind CSS", "Lovable"]',
    '2025-02-20',
    false,
    true
),

-- 17. InsightConnect
(
    'InsightConnect - Analytics Dashboard',
    'Corporate analytics and business intelligence platform with interactive dashboards, data visualization, team collaboration tools, and real-time reporting. Designed for data-driven decision making with a clean, professional interface.',
    'corporate',
    'InsightConnect',
    'https://insight-connect-techfreak.lovable.app',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    '[]',
    '["React", "Vite", "Tailwind CSS", "Lovable"]',
    '2025-02-22',
    false,
    true
),

-- 18. Sudhir Portfolio
(
    'Sudhir - Developer Portfolio',
    'Personal full-stack developer portfolio showcasing projects, technical skills, education, certifications from Cisco and IBM, and contact information. Clean, modern design with smooth scrolling and responsive layout.',
    'corporate',
    'Sudhir',
    'https://heyadhira.github.io/SudhirPortfolio/',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
    '[]',
    '["HTML", "CSS", "JavaScript", "GitHub Pages"]',
    '2025-01-10',
    false,
    true
);
