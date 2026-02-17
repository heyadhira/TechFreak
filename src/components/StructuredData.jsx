import { useEffect } from 'react';

/**
 * Injects JSON-LD structured data into the document head.
 * Automatically cleans up when unmounted or data changes.
 */
export default function StructuredData({ data }) {
    useEffect(() => {
        if (!data) return;

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(data);
        script.id = `structured-data-${data['@type'] || 'default'}`;

        // Remove existing script with same id
        const existing = document.getElementById(script.id);
        if (existing) existing.remove();

        document.head.appendChild(script);

        return () => {
            const el = document.getElementById(script.id);
            if (el) el.remove();
        };
    }, [data]);

    return null;
}

// Pre-built structured data generators

export function getOrganizationData() {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "TechFreak",
        "url": "https://techfreak.in",
        "logo": "https://techfreak.in/img/logo.png",
        "description": "Premium web development agency offering affordable, high-performance websites for Indian businesses.",
        "foundingDate": "2024",
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-98765-43210",
            "contactType": "sales",
            "areaServed": "IN",
            "availableLanguage": ["English", "Hindi"]
        },
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "IN"
        },
        "sameAs": [
            "https://facebook.com/techfreak",
            "https://twitter.com/techfreak_in",
            "https://instagram.com/techfreak",
            "https://linkedin.com/company/techfreak"
        ]
    };
}

export function getWebsiteData() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "TechFreak",
        "url": "https://techfreak.in",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://techfreak.in/Blog?search={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };
}

export function getLocalBusinessData() {
    return {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "TechFreak",
        "url": "https://techfreak.in",
        "image": "https://techfreak.in/img/logo.png",
        "telephone": "+91-98765-43210",
        "email": "hello@techfreak.in",
        "priceRange": "₹₹",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "IN"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "150",
            "bestRating": "5"
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "09:00",
            "closes": "18:00"
        }
    };
}

export function getServiceData(service) {
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": service.title,
        "description": service.description,
        "provider": {
            "@type": "Organization",
            "name": "TechFreak",
            "url": "https://techfreak.in"
        },
        "areaServed": {
            "@type": "Country",
            "name": "India"
        },
        ...(service.price_starting && {
            "offers": {
                "@type": "Offer",
                "price": service.price_starting,
                "priceCurrency": "INR",
                "availability": "https://schema.org/InStock"
            }
        }),
        ...(service.image_url && {
            "image": service.image_url
        })
    };
}

export function getBreadcrumbData(items) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
        }))
    };
}

export function getFAQData(faqs) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };
}

export function getBlogPostData(post) {
    return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.description || post.excerpt,
        "datePublished": post.created_date || post.created_at,
        "dateModified": post.updated_at || post.created_at,
        "author": {
            "@type": "Organization",
            "name": "TechFreak"
        },
        "publisher": {
            "@type": "Organization",
            "name": "TechFreak",
            "logo": {
                "@type": "ImageObject",
                "url": "https://techfreak.in/img/logo.png"
            }
        },
        ...(post.image_url && { "image": post.image_url }),
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://techfreak.in/BlogPost?slug=${post.slug}`
        }
    };
}
