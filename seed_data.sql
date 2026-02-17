-- ================================================
-- TechFreak - Dummy Seed Data
-- Run this in your Supabase SQL Editor AFTER
-- running supabase_migration.sql and add_service_columns.sql
-- ================================================


-- ================================================
-- 1. SERVICES (6 services)
-- ================================================
INSERT INTO services (title, description, icon, price_starting, features, image_url, is_featured, is_active, "order", slug, long_description) VALUES

('Website Development',
 'Custom, responsive websites built with modern technologies. From landing pages to complex business platforms.',
 'Globe', 4999,
 '["Responsive Design", "SEO Optimized", "Fast Loading Speed", "Custom UI/UX", "CMS Integration", "SSL Certificate", "1 Year Free Hosting", "Mobile Friendly"]',
 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
 true, true, 1,
 'website-development',
 'At TechFreak, we specialize in crafting stunning, high-performance websites that leave a lasting impression. Our expert developers use the latest technologies like React, Next.js, and Tailwind CSS to build websites that are not only visually appealing but also blazing fast and fully responsive across all devices.\n\nEvery website we build is optimized for search engines from the ground up. We implement proper semantic HTML, meta tags, structured data, and performance optimizations to ensure your site ranks well on Google. Our websites consistently score 90+ on Google PageSpeed Insights.\n\nWhether you need a simple business landing page or a complex multi-page platform with custom features, our team delivers pixel-perfect results on time and within budget. We also provide free hosting for the first year and ongoing support to keep your site running smoothly.'),

('E-Commerce Solutions',
 'Full-featured online stores with payment integration, inventory management, and order tracking.',
 'ShoppingCart', 9999,
 '["Payment Gateway", "Inventory Management", "Order Tracking", "Product Catalog", "Discount Coupons", "Multi-Currency Support", "WhatsApp Order Updates", "Admin Dashboard"]',
 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
 true, true, 2,
 'e-commerce-solutions',
 'Launch your online store with TechFreak''s comprehensive e-commerce solutions. We build powerful, scalable online stores that help businesses sell products and services across India and globally.\n\nOur e-commerce platforms come equipped with secure payment gateways (Razorpay, Stripe, UPI), real-time inventory management, automated order tracking, and customer notification systems via WhatsApp and email. We handle everything from product catalog design to checkout flow optimization.\n\nWith features like discount coupons, multi-currency support, wishlist functionality, and a powerful admin dashboard, you''ll have everything you need to run a successful online business. Our stores are mobile-first and optimized for high conversion rates.'),

('SEO Services',
 'Boost your search rankings with data-driven SEO strategies. On-page, off-page, and technical SEO.',
 'Search', 2999,
 '["Keyword Research", "On-Page SEO", "Technical SEO Audit", "Link Building", "Monthly Reports", "Local SEO", "Content Strategy", "Competitor Analysis"]',
 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=800',
 false, true, 3,
 'seo-services',
 'Drive organic traffic and dominate search results with TechFreak''s professional SEO services. Our data-driven approach combines keyword research, technical optimization, content strategy, and link building to deliver measurable results.\n\nWe start with a comprehensive SEO audit of your website to identify technical issues, content gaps, and opportunities. Then we create a customized strategy that targets high-value keywords relevant to your business and location.\n\nOur monthly reporting keeps you informed of progress with detailed analytics on rankings, traffic, conversions, and ROI. Whether you''re targeting local customers in your city or competing nationally, our SEO team has the expertise to get your website to the top of Google search results.'),

('UI/UX Design',
 'Beautiful, intuitive interfaces designed with your users in mind. Research-driven design that converts.',
 'PenTool', 7999,
 '["User Research", "Wireframing", "Prototyping", "Visual Design", "Design System", "Usability Testing", "Brand Guidelines", "Figma Deliverables"]',
 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
 false, true, 4,
 'ui-ux-design',
 'Create memorable digital experiences with TechFreak''s UI/UX design services. We combine user research, creative design, and data-driven decisions to build interfaces that users love and businesses benefit from.\n\nOur design process begins with understanding your users through research, interviews, and competitive analysis. We then create wireframes and interactive prototypes in Figma, allowing you to test and validate concepts before a single line of code is written.\n\nFrom visual design and brand guidelines to complete design systems, we deliver everything your development team needs to build pixel-perfect products. Our designs focus on accessibility, usability, and conversion optimization.'),

('Web Applications',
 'Powerful, scalable web applications for business automation, CRM, dashboards, and enterprise needs.',
 'Server', 14999,
 '["Custom Dashboard", "User Authentication", "API Integration", "Real-time Features", "Database Design", "Cloud Hosting", "Admin Panel", "Security Best Practices"]',
 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
 true, true, 5,
 'web-applications',
 'Transform your business operations with custom web applications built by TechFreak. From CRM systems and project management tools to booking platforms and inventory dashboards, we build enterprise-grade applications tailored to your needs.\n\nOur web applications are built with modern tech stacks including React, Node.js, Python, and cloud services like AWS and Supabase. We implement robust user authentication, role-based access control, real-time features, and comprehensive API integrations.\n\nEvery application we build follows security best practices, is fully tested, and comes with a powerful admin panel for easy management. We also provide detailed documentation and training to ensure your team can leverage the full potential of the application.'),

('Mobile App Development',
 'Cross-platform mobile apps for iOS and Android. Native performance with React Native.',
 'Smartphone', 19999,
 '["iOS & Android", "Push Notifications", "Offline Support", "App Store Deployment", "Analytics Integration", "In-App Payments", "Social Login", "Performance Optimized"]',
 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800',
 false, true, 6,
 'mobile-app-development',
 'Reach your customers on the go with TechFreak''s mobile app development services. We build beautiful, high-performance cross-platform apps using React Native that work seamlessly on both iOS and Android devices.\n\nOur mobile apps come packed with essential features like push notifications, offline support, social login, in-app payments (UPI, wallet integration), and deep analytics. We handle the entire process from design to deployment on both the App Store and Google Play.\n\nWith a focus on native performance, smooth animations, and intuitive UX, our apps deliver an experience that keeps users engaged and coming back. We also offer ongoing maintenance and feature updates to keep your app competitive.');


-- ================================================
-- 2. BLOG POSTS (5 posts)
-- ================================================
INSERT INTO blog_posts (title, slug, excerpt, content, featured_image, category, tags, author_name, read_time, is_published, is_featured, published_at) VALUES

('Why Every Indian Business Needs a Website in 2025',
 'why-every-indian-business-needs-website-2025',
 'In today''s digital-first economy, having a website is no longer optional. Discover why your business cannot afford to be without one.',
 '## The Digital Revolution in India

India''s internet user base has crossed 800 million in 2025, making it the second-largest online market in the world. With UPI transactions hitting record highs and digital commerce growing at 25% year-over-year, the message is clear: **your customers are online**.

### The Cost of Not Having a Website

Many small businesses still rely solely on social media or Google My Business. While these are important channels, they have serious limitations:

- **You don''t own your audience** — Platform algorithms change constantly
- **Limited customization** — You can''t create a unique brand experience
- **No analytics control** — You miss out on valuable customer insights
- **Competition advantage** — Your competitors with websites are capturing your potential customers

### What a Professional Website Can Do

A well-designed website serves as your **24/7 salesperson**. It works while you sleep, answering questions, showcasing products, and converting visitors into customers.

#### Key Benefits:
1. **Credibility & Trust** — 75% of consumers judge a business''s credibility based on their website
2. **Lead Generation** — Capture contact information and nurture prospects
3. **SEO Traffic** — Get discovered by people searching for your services
4. **Cost-Effective Marketing** — Cheaper than traditional advertising in the long run

### Getting Started

The good news? Getting a professional website doesn''t have to be expensive. At TechFreak, we offer premium websites starting at just ₹4,999, making digital transformation accessible to businesses of all sizes.

**Ready to take your business online? [Contact us](/Contact) for a free consultation.**',
 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
 'business',
 '["digital marketing", "indian business", "website design", "online presence"]',
 'TechFreak Team', 5, true, true, '2025-01-15T10:00:00Z'),

('Top 10 Web Design Trends to Watch in 2025',
 'top-10-web-design-trends-2025',
 'From AI-powered interfaces to immersive 3D experiences, these design trends are shaping the future of web design.',
 '## The Future of Web Design

Web design is evolving faster than ever. Here are the top 10 trends that are defining digital experiences in 2025.

### 1. AI-Powered Personalization
Websites now use AI to personalize content, layouts, and recommendations for each visitor in real-time.

### 2. Glassmorphism 2.0
The frosted glass effect has evolved with more sophisticated blur layers, gradient overlays, and depth effects.

### 3. Dark Mode by Default
More websites are shipping dark mode as the default theme, with elegant light mode alternatives.

### 4. Micro-Interactions
Subtle animations on hover, scroll, and click that make interfaces feel alive and responsive.

### 5. Variable Fonts
Dynamic typography that adjusts weight, width, and style fluidly for better readability and performance.

### 6. 3D Elements & WebGL
Interactive 3D graphics are becoming mainstream thanks to libraries like Three.js and improved browser support.

### 7. Voice UI Integration
Websites with voice search and navigation are gaining traction, especially for accessibility.

### 8. Bento Grid Layouts
Inspired by Apple, the bento box layout offers a structured yet dynamic way to present content.

### 9. Minimalist Navigation
Simplified navigation patterns with hamburger menus, sticky headers, and smart progressive disclosure.

### 10. Performance-First Design
Core Web Vitals and page speed are now design considerations, not afterthoughts.

**Want a website that embraces these trends? [Talk to our design team](/Contact) today!**',
 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800',
 'web-development',
 '["web design", "trends", "UI/UX", "2025", "frontend"]',
 'TechFreak Team', 7, true, true, '2025-02-01T10:00:00Z'),

('How to Choose the Right E-Commerce Platform for Your Store',
 'how-to-choose-right-ecommerce-platform',
 'Shopify vs WooCommerce vs Custom? We break down the pros and cons of each e-commerce solution for Indian businesses.',
 '## Choosing Your E-Commerce Platform

Picking the right platform is one of the most important decisions for your online store. Let''s compare the most popular options.

### Shopify
**Best for:** Quick launch, non-technical founders
- ✅ Easy to set up, hosted solution
- ✅ App ecosystem for extensions
- ❌ Monthly fees add up (₹2,000-₹22,000/month)
- ❌ Limited customization
- ❌ Transaction fees on non-Shopify payments

### WooCommerce (WordPress)
**Best for:** Budget-conscious, content-heavy stores
- ✅ Free core plugin
- ✅ Highly customizable
- ❌ Requires hosting and maintenance
- ❌ Can be slow without optimization
- ❌ Security is your responsibility

### Custom-Built Solution
**Best for:** Unique business needs, scalability
- ✅ Complete control over features
- ✅ No recurring platform fees
- ✅ Optimized performance
- ❌ Higher initial investment
- ❌ Requires a development team

### Our Recommendation

For most Indian businesses starting out, **a custom-built solution offers the best long-term value**. At TechFreak, our e-commerce packages start at ₹9,999 and include everything you need: payment gateway, inventory management, and a mobile-optimized store.

**Need help deciding? [Get a free consultation](/Contact).**',
 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
 'e-commerce',
 '["e-commerce", "shopify", "woocommerce", "online store", "india"]',
 'TechFreak Team', 6, true, false, '2025-01-28T10:00:00Z'),

('SEO Secrets: How We Rank Websites on Google''s First Page',
 'seo-secrets-rank-websites-google-first-page',
 'Our proven SEO framework that has helped 50+ Indian businesses achieve page-one rankings on Google.',
 '## Our Proven SEO Framework

After optimizing 50+ websites for Indian businesses, we have developed a systematic approach that consistently delivers page-one rankings.

### Phase 1: Foundation (Week 1-2)
**Technical SEO Audit**
- Site speed optimization (target: < 2s load time)
- Mobile responsiveness check
- Schema markup implementation
- XML sitemap and robots.txt setup
- Fix broken links and crawl errors

### Phase 2: On-Page Optimization (Week 3-4)
**Content & Structure**
- Keyword research (volume, difficulty, intent)
- Title tags and meta descriptions
- Header tag hierarchy
- Internal linking strategy
- Image optimization with alt tags

### Phase 3: Content Strategy (Month 2-3)
**Authority Building**
- Blog content calendar
- Long-tail keyword targeting
- FAQ pages for voice search
- Location-specific landing pages

### Phase 4: Off-Page SEO (Ongoing)
**Link Building**
- Guest posting on relevant blogs
- Business directory listings
- Social media signals
- Local citations for GMB

### Results We Have Delivered
- **150%** average increase in organic traffic
- **Top 3** rankings for 80% of target keywords
- **3x** improvement in lead generation

**Want similar results? [Start your SEO journey](/Contact) with us today!**',
 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=800',
 'seo',
 '["SEO", "google ranking", "organic traffic", "search engine optimization"]',
 'TechFreak Team', 8, true, false, '2025-02-10T10:00:00Z'),

('Building a Successful Startup Website: A Complete Guide',
 'building-successful-startup-website-guide',
 'Everything you need to know about creating a website that drives growth for your startup, from MVP to scale.',
 '## From Idea to Launch

Your startup website is your most important marketing asset. Here is how to get it right from day one.

### Start with an MVP Website

Do not over-engineer your first website. Focus on:
1. **Clear value proposition** on the hero section
2. **Social proof** (testimonials, logos, numbers)
3. **Strong CTA** (contact form, demo booking)
4. **About page** that builds trust
5. **Blog** for SEO and authority

### Design Principles for Startups

- **Speed over perfection** — Launch fast, iterate based on data
- **Mobile-first** — 70% of Indian web traffic is mobile
- **Conversion-focused** — Every page should have a purpose
- **Brand consistency** — Colors, fonts, and tone of voice

### Tech Stack Recommendations

For most startups, we recommend:
- **Frontend:** React + Tailwind CSS (fast, modern, maintainable)
- **Backend:** Supabase or Firebase (serverless, scalable, affordable)
- **Hosting:** Vercel or Netlify (free tier, global CDN)
- **Analytics:** Google Analytics 4 + Hotjar

### Common Mistakes to Avoid

1. ❌ Spending months building before launching
2. ❌ Ignoring mobile experience
3. ❌ No analytics tracking from day one
4. ❌ Missing SEO basics (meta tags, sitemap)
5. ❌ No clear call-to-action

### What It Costs

A professional startup website in India can cost anywhere from ₹5,000 to ₹5,00,000 depending on complexity. At TechFreak, we offer startup-friendly packages starting at ₹4,999.

**Ready to build? [Let us help you launch](/Contact).**',
 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800',
 'web-development',
 '["startup", "website guide", "MVP", "business growth", "web development"]',
 'TechFreak Team', 6, true, false, '2025-02-05T10:00:00Z');


-- ================================================
-- 3. PORTFOLIO PROJECTS (6 projects)
-- ================================================
INSERT INTO portfolios (title, description, category, client_name, project_url, thumbnail_url, images, tech_stack, completion_date, is_featured, is_active) VALUES

('FreshMart - Online Grocery Store',
 'A full-featured online grocery delivery platform with real-time inventory tracking, route optimization for delivery, and an integrated payment system supporting UPI, cards, and COD.',
 'e-commerce',
 'FreshMart India Pvt Ltd',
 'https://freshmart.example.com',
 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
 '["https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800", "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800"]',
 '["React", "Node.js", "PostgreSQL", "Razorpay", "Tailwind CSS"]',
 '2024-11-15', true, true),

('CloudDesk - SaaS Dashboard',
 'An enterprise project management and team collaboration dashboard with real-time chat, Kanban boards, time tracking, and comprehensive analytics. Serves 500+ active users.',
 'corporate',
 'CloudDesk Technologies',
 'https://clouddesk.example.com',
 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
 '["https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800", "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800"]',
 '["React", "Supabase", "Tailwind CSS", "Chart.js", "WebSocket"]',
 '2024-12-01', true, true),

('Artisan Jewels - Luxury E-Commerce',
 'A premium e-commerce platform for a handcrafted jewelry brand featuring 360° product views, virtual try-on, and customized packaging options. Increased online sales by 200%.',
 'e-commerce',
 'Artisan Jewels',
 'https://artisanjewels.example.com',
 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=800',
 '["https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=800", "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800"]',
 '["Next.js", "Stripe", "Cloudinary", "MongoDB", "Framer Motion"]',
 '2025-01-10', true, true),

('MediCare Clinic - Healthcare Portal',
 'A comprehensive healthcare portal with online appointment booking, patient records management, telemedicine video calls, and prescription management for a multi-specialty clinic.',
 'corporate',
 'MediCare Clinic',
 'https://medicare.example.com',
 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
 '["https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800", "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800"]',
 '["React", "Firebase", "Twilio", "Node.js", "Material UI"]',
 '2024-10-20', true, true),

('TravelBuddy - Startup Landing Page',
 'A high-conversion landing page for a travel startup featuring itinerary builder, secure payments, and customer reviews. Boosted bookings by 150%.',
 'startup',
 'TravelBuddy Tours',
 'https://travelbuddy.example.com',
 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
 '["https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800", "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800"]',
 '["React", "Supabase", "Razorpay", "Tailwind CSS", "Google Maps API"]',
 '2024-09-05', true, true),

('LearnHub - EdTech Platform',
 'An interactive e-learning platform with video courses, live classes, quizzes, certificates, and a student dashboard. Onboarded 2000+ students in the first month.',
 'educational',
 'LearnHub Education',
 'https://learnhub.example.com',
 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800',
 '["https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800", "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800"]',
 '["Next.js", "Supabase", "Mux Video", "Tailwind CSS", "Stripe"]',
 '2025-01-25', true, true),

('FitTrack - Fitness App Landing',
 'Modern landing page for a fitness tracking startup. Features scroll animations, pricing tables, and app store redirection.',
 'startup',
 'FitTrack Inc',
 'https://fittrack.example.com',
 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800',
 '["https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800"]',
 '["Astro", "Tailwind CSS", "Framer Motion"]',
 '2025-02-01', true, true),

('Global Finance - Corporate Portal',
 'Secure intranet portal for a financial firm with document management, employee directory, and news feed.',
 'corporate',
 'Global Finance Ltd',
 'https://globalfinance.example.com',
 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
 '["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800"]',
 '["React", "DotNet Core", "Azure AD", "SQL Server"]',
 '2024-08-15', true, true),

('University of Future - Student Portal',
 'Comprehensive student portal for checking grades, registering for courses, and accessing library resources.',
 'educational',
 'University of Future',
 'https://uof.example.com',
 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
 '["https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800"]',
 '["Next.js", "Prisma", "PostgreSQL", "NextAuth"]',
 '2024-11-20', true, true);


-- ================================================
-- 4. PRICING PLANS (4 plans)
-- ================================================
INSERT INTO pricing_plans (name, price, original_price, description, features, is_popular, category, "order", is_active) VALUES

('Starter',
 4999, 7999,
 'Perfect for small businesses and personal websites. Get online with a professional single-page website.',
 '["Single Page Website", "Mobile Responsive", "Contact Form", "WhatsApp Integration", "Basic SEO Setup", "SSL Certificate", "1 Year Free Hosting", "3 Revisions"]',
 false, 'basic', 1, true),

('Professional',
 9999, 14999,
 'Ideal for growing businesses. Multi-page website with advanced features and content management.',
 '["Up to 7 Pages", "Mobile Responsive", "Contact Form + CRM", "WhatsApp Integration", "Advanced SEO", "SSL Certificate", "1 Year Free Hosting", "Blog Integration", "Google Analytics", "Social Media Integration", "5 Revisions", "Priority Support"]',
 true, 'professional', 2, true),

('Business',
 19999, 29999,
 'Complete digital solution for established businesses. E-commerce ready with all premium features.',
 '["Up to 15 Pages", "E-Commerce Ready", "Payment Gateway (UPI/Cards)", "Inventory Management", "Mobile Responsive", "Admin Dashboard", "Advanced SEO + Local SEO", "SSL Certificate", "1 Year Free Hosting", "Blog + CMS", "Email Marketing Setup", "Google Analytics + Search Console", "Social Media Integration", "Unlimited Revisions", "24/7 Priority Support"]',
 false, 'business', 3, true),

('Enterprise',
 49999, 79999,
 'Custom web application with enterprise-grade features. For businesses with unique, complex requirements.',
 '["Custom Web Application", "Unlimited Pages", "Custom Admin Dashboard", "API Integrations", "User Authentication", "Real-time Features", "Database Design", "Cloud Hosting (AWS/GCP)", "CI/CD Pipeline", "Security Audit", "Performance Optimization", "1 Year Maintenance", "Dedicated Project Manager", "SLA Guarantee", "Source Code Ownership"]',
 false, 'enterprise', 4, true);


-- ================================================
-- 5. TEAM MEMBERS (5 members)
-- ================================================
INSERT INTO team_members (name, designation, bio, photo_url, email, linkedin, twitter, github, "order", is_active) VALUES

('Adhira Sharma',
 'Founder & CEO',
 'Visionary tech entrepreneur with 5+ years of experience in web development. Passionate about making premium technology accessible to Indian businesses at affordable prices.',
 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400',
 'adhira@techfreak.in',
 'https://linkedin.com/in/adhira-sharma',
 'https://twitter.com/adhira_tech',
 'https://github.com/adhira',
 1, true),

('Rahul Verma',
 'Lead Full Stack Developer',
 'Full-stack ninja with expertise in React, Node.js, and cloud technologies. 150+ projects delivered with a focus on performance and scalability.',
 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
 'rahul@techfreak.in',
 'https://linkedin.com/in/rahul-verma',
 NULL,
 'https://github.com/rahulverma',
 2, true),

('Priya Patel',
 'UI/UX Designer',
 'Creative designer who turns complex problems into simple, beautiful, and intuitive interfaces. Figma wizard with a keen eye for detail and user psychology.',
 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
 'priya@techfreak.in',
 'https://linkedin.com/in/priya-patel',
 'https://twitter.com/priya_designs',
 NULL,
 3, true),

('Arjun Mehta',
 'SEO & Marketing Lead',
 'Data-driven digital marketer specializing in SEO, content strategy, and growth hacking. Has helped 50+ businesses achieve page-one Google rankings.',
 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
 'arjun@techfreak.in',
 'https://linkedin.com/in/arjun-mehta',
 'https://twitter.com/arjun_seo',
 NULL,
 4, true),

('Sneha Reddy',
 'Backend Developer',
 'Systems architect specializing in database design, API development, and cloud infrastructure. Expert in Node.js, Python, PostgreSQL, and AWS.',
 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400',
 'sneha@techfreak.in',
 'https://linkedin.com/in/sneha-reddy',
 NULL,
 'https://github.com/snehareddy',
 5, true);


-- ================================================
-- 6. TESTIMONIALS (8 testimonials)
-- ================================================
INSERT INTO testimonials (client_name, client_designation, company, photo_url, content, rating, project_type, is_featured, is_active) VALUES

('Vikram Singh',
 'CEO',
 'FreshMart India',
 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
 'TechFreak built our entire grocery delivery platform from scratch. The team was incredibly professional, delivered ahead of schedule, and the quality exceeded our expectations. Our online sales increased by 300% within the first quarter!',
 5, 'E-Commerce', true, true),

('Ananya Kapoor',
 'Founder',
 'Artisan Jewels',
 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400',
 'Working with TechFreak was a dream. They understood our luxury brand perfectly and translated it into a stunning online store. The virtual try-on feature they built is a game-changer for our customers.',
 5, 'E-Commerce', true, true),

('Rajesh Kumar',
 'Director',
 'MediCare Clinic',
 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
 'The healthcare portal TechFreak built for us has transformed how we manage appointments and patient records. The telemedicine feature was a lifesaver during COVID. Highly recommended for healthcare businesses!',
 5, 'Web Application', true, true),

('Meera Joshi',
 'Marketing Head',
 'TravelBuddy Tours',
 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
 'Our bookings increased by 150% after TechFreak redesigned our website. The itinerary builder and seamless payment integration made the booking process so much smoother for our customers.',
 5, 'Website', false, true),

('Amit Patel',
 'Co-Founder',
 'CloudDesk Technologies',
 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
 'TechFreak delivered a complex SaaS dashboard that handles 500+ users with real-time features. Their technical expertise, attention to detail, and commitment to deadlines is unmatched.',
 5, 'Web Application', true, true),

('Nisha Gupta',
 'Owner',
 'Nisha''s Boutique',
 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400',
 'I was worried about going online but TechFreak made it so easy! They built a beautiful website for my boutique in just 2 weeks. The admin panel is so simple that even I can update products myself.',
 5, 'Website', false, true),

('Sanjay Deshmukh',
 'Principal',
 'LearnHub Education',
 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
 'The e-learning platform TechFreak built for us onboarded 2000+ students in the first month. Video streaming is smooth, the quiz system works perfectly, and the admin dashboard gives us all the analytics we need.',
 5, 'Web Application', false, true),

('Pooja Sharma',
 'Manager',
 'Green Earth Organics',
 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
 'Best investment we made for our organic food business! TechFreak''s website helped us reach customers across the city. Their SEO work got us ranking #1 for ''organic food delivery'' in just 3 months.',
 4, 'Website', false, true);


-- ================================================
-- 7. LEADS (5 sample inquiries)
-- ================================================
INSERT INTO leads (name, email, phone, company, service_interested, budget, message, source, status, is_read) VALUES

('Ravi Shankar',
 'ravi@newstartup.in',
 '+91 98765 12345',
 'New Startup India',
 'Website Development',
 '₹5,000 - ₹10,000',
 'Hi, I am looking to build a website for my food delivery startup. We need a landing page with order form and WhatsApp integration. Can you share a quote?',
 'contact-form', 'new', false),

('Deepika Nair',
 'deepika@fashionbrand.com',
 '+91 87654 32109',
 'Nair Fashion House',
 'E-Commerce Solutions',
 '₹15,000 - ₹30,000',
 'We want to launch an online store for our clothing brand. Need payment gateway, inventory management, and a sleek modern design. When can we discuss?',
 'contact-form', 'contacted', true),

('Mohit Agarwal',
 'mohit@realestate.co.in',
 '+91 76543 21098',
 'Agarwal Properties',
 'SEO Services',
 '₹3,000 - ₹5,000/month',
 'Our real estate website gets very low traffic from Google. We need professional SEO help to rank for property-related keywords in our city.',
 'whatsapp', 'new', false),

('Kavita Iyer',
 'kavita@fitnessstudio.in',
 '+91 65432 10987',
 'FlexFit Studio',
 'Web Applications',
 '₹20,000 - ₹50,000',
 'We need a membership management system with online class booking, payment tracking, and a member portal. Can you build this as a web application?',
 'contact-form', 'proposal-sent', true),

('Suresh Reddy',
 'suresh@schoolmgmt.edu',
 '+91 54321 09876',
 'Bright Future Academy',
 'Web Applications',
 '₹30,000 - ₹60,000',
 'Looking for a school management system with student portal, attendance tracking, fee management, and parent notifications via SMS and WhatsApp.',
 'contact-form', 'new', false);


-- ================================================
-- 8. SITE SETTINGS (key configuration)
-- ================================================
INSERT INTO site_settings (setting_key, setting_value, setting_type) VALUES

('site_info', '{
    "name": "TechFreak",
    "tagline": "Premium Web Development Agency",
    "description": "Transform your business with stunning, high-performance websites. Premium web development services for Indian businesses at affordable prices.",
    "founded_year": 2024,
    "projects_delivered": 150,
    "client_satisfaction": 98,
    "team_size": 5
}', 'general'),

('contact_info', '{
    "phone": "+91 98765 43210",
    "email": "hello@techfreak.in",
    "whatsapp": "+91 98765 43210",
    "address": "India",
    "working_hours": "Mon-Sat: 9:00 AM - 6:00 PM IST"
}', 'contact'),

('social_links', '{
    "facebook": "https://facebook.com/techfreak",
    "twitter": "https://twitter.com/techfreak_in",
    "instagram": "https://instagram.com/techfreak",
    "linkedin": "https://linkedin.com/company/techfreak",
    "youtube": "https://youtube.com/@techfreak",
    "github": "https://github.com/techfreak"
}', 'social'),

('seo_defaults', '{
    "meta_title": "TechFreak - Premium Web Development Agency | Websites Starting at ₹4,999",
    "meta_description": "Transform your business with stunning, high-performance websites. Premium web development services for Indian businesses at affordable prices.",
    "meta_keywords": "web development, website design, e-commerce, SEO, UI/UX, India, affordable websites",
    "og_image": "/img/logo.png"
}', 'seo'),

('hero_section', '{
    "title": "We Build Websites That Grow Your Business",
    "subtitle": "Premium web development services for Indian businesses. Stunning designs, lightning-fast performance, and affordable prices starting at just ₹4,999.",
    "cta_text": "Get Free Quote",
    "cta_link": "/Contact",
    "stats": [
        {"value": "150+", "label": "Projects Delivered"},
        {"value": "98%", "label": "Client Satisfaction"},
        {"value": "4.9", "label": "Google Rating"},
        {"value": "24/7", "label": "Support"}
    ]
}', 'content');


-- ================================================
-- Done! All dummy data has been inserted.
-- You can now view and manage this data from
-- the TechFreak admin panel.
-- ================================================
