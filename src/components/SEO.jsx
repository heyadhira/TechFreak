import { useEffect } from 'react';

const DEFAULT_SEO = {
    siteName: 'TechFreak',
    siteUrl: 'https://techfreak.in',
    defaultTitle: 'TechFreak - Premium Web Development Agency | Websites Starting at ₹4,999',
    defaultDescription: 'Transform your business with stunning, high-performance websites. TechFreak offers premium web development services for Indian businesses at affordable prices. 150+ projects delivered with 98% client satisfaction.',
    defaultImage: '/img/logo.png',
    twitterHandle: '@techfreak_in',
    locale: 'en_IN',
};

const PAGE_SEO = {
    Home: {
        title: 'TechFreak - Premium Web Development Agency | Best Websites in India',
        description: 'Transform your business with stunning, high-performance websites starting at ₹4,999. Expert web development, e-commerce, SEO & UI/UX design. 150+ projects delivered.',
        keywords: 'web development agency india, affordable website design, premium websites, e-commerce development, SEO services india, best web developer',
    },
    Services: {
        title: 'Our Services - Web Development, E-Commerce, SEO & More | TechFreak',
        description: 'Explore our premium web development services: custom websites, e-commerce stores, SEO optimization, UI/UX design, and web applications. Starting at ₹4,999.',
        keywords: 'web development services, e-commerce development, SEO services, UI UX design, web applications, mobile responsive websites',
    },
    ServiceDetail: {
        title: 'Service Details | TechFreak',
        description: 'Learn more about our premium web development services. Quality-assured, on-time delivery with 98% client satisfaction.',
        keywords: 'web development service, professional website, custom development, TechFreak services',
    },
    Portfolio: {
        title: 'Our Portfolio - Projects & Case Studies | TechFreak',
        description: 'Browse our portfolio of 150+ successfully delivered projects. See how we helped Indian businesses grow with stunning websites and web applications.',
        keywords: 'web development portfolio, website projects, case studies, client work, website examples india',
    },
    About: {
        title: 'About TechFreak - Your Trusted Web Development Partner',
        description: 'Learn about TechFreak, India\'s trusted web development agency. Our mission, team, and commitment to delivering premium websites at affordable prices.',
        keywords: 'about techfreak, web development company india, our team, web agency, company story',
    },
    Blog: {
        title: 'Blog - Web Development Tips, Trends & Insights | TechFreak',
        description: 'Stay updated with the latest web development trends, tips, and insights. Expert articles on design, SEO, e-commerce, and technology.',
        keywords: 'web development blog, technology trends, SEO tips, website design articles, tech insights india',
    },
    BlogPost: {
        title: 'Blog Post | TechFreak',
        description: 'Read our latest insights on web development, technology, and digital marketing.',
        keywords: 'web development article, tech blog, digital marketing insights',
    },
    Contact: {
        title: 'Contact Us - Get a Free Quote | TechFreak',
        description: 'Get in touch with TechFreak for a free consultation and quote. We\'re ready to build your dream website. Call +91 98765 43210 or fill our contact form.',
        keywords: 'contact techfreak, free website quote, web development inquiry, get in touch, hire web developer india',
    },
    Team: {
        title: 'Our Team - The Experts Behind TechFreak',
        description: 'Meet the talented team of developers, designers, and strategists at TechFreak who bring your web projects to life.',
        keywords: 'techfreak team, web developers india, design team, development experts, our people',
    },
    Testimonials: {
        title: 'Client Testimonials & Reviews | TechFreak',
        description: 'See what our clients say about TechFreak. Real reviews and testimonials from businesses we\'ve helped with premium web development services.',
        keywords: 'client reviews, testimonials, customer feedback, web development reviews, techfreak reviews',
    },
};

/**
 * SEO component that dynamically updates document head meta tags.
 * Use on any page: <SEO pageName="Services" />
 * Override defaults: <SEO pageName="ServiceDetail" title="Custom Title" description="Custom desc" />
 */
export default function SEO({ pageName, title, description, keywords, image, url, type = 'website' }) {
    useEffect(() => {
        const pageSeo = PAGE_SEO[pageName] || {};

        const finalTitle = title || pageSeo.title || DEFAULT_SEO.defaultTitle;
        const finalDescription = description || pageSeo.description || DEFAULT_SEO.defaultDescription;
        const finalKeywords = keywords || pageSeo.keywords || '';
        const finalImage = image || DEFAULT_SEO.defaultImage;
        const finalUrl = url || `${DEFAULT_SEO.siteUrl}/${pageName || ''}`;

        // Title
        document.title = finalTitle;

        // Helper to set/create meta tags
        const setMeta = (attr, key, content) => {
            if (!content) return;
            let el = document.querySelector(`meta[${attr}="${key}"]`);
            if (!el) {
                el = document.createElement('meta');
                el.setAttribute(attr, key);
                document.head.appendChild(el);
            }
            el.setAttribute('content', content);
        };

        // Standard meta
        setMeta('name', 'description', finalDescription);
        setMeta('name', 'keywords', finalKeywords);
        setMeta('name', 'author', 'TechFreak');
        setMeta('name', 'robots', 'index, follow');

        // Open Graph
        setMeta('property', 'og:type', type);
        setMeta('property', 'og:title', finalTitle);
        setMeta('property', 'og:description', finalDescription);
        setMeta('property', 'og:image', finalImage.startsWith('http') ? finalImage : `${DEFAULT_SEO.siteUrl}${finalImage}`);
        setMeta('property', 'og:url', finalUrl);
        setMeta('property', 'og:site_name', DEFAULT_SEO.siteName);
        setMeta('property', 'og:locale', DEFAULT_SEO.locale);

        // Twitter
        setMeta('name', 'twitter:card', 'summary_large_image');
        setMeta('name', 'twitter:title', finalTitle);
        setMeta('name', 'twitter:description', finalDescription);
        setMeta('name', 'twitter:image', finalImage.startsWith('http') ? finalImage : `${DEFAULT_SEO.siteUrl}${finalImage}`);
        setMeta('name', 'twitter:site', DEFAULT_SEO.twitterHandle);

        // Canonical URL
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            document.head.appendChild(canonical);
        }
        canonical.setAttribute('href', finalUrl);

    }, [pageName, title, description, keywords, image, url, type]);

    return null;
}
