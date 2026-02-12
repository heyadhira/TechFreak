import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { localClient } from '@/api/localClient';
import {
    Calendar, Clock,
    Facebook, Twitter, Linkedin, Copy, Sparkles,
    Newspaper, BookOpen, PenTool
} from 'lucide-react';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import GradientButton from '../components/ui/GradientButton';
import PageHero from '../components/ui/PageHero';
import { toast } from 'sonner';

const defaultPost = {
    title: "10 Website Design Trends for 2024 That Will Boost Conversions",
    slug: "website-design-trends-2024",
    excerpt: "Discover the latest web design trends that are helping businesses increase their conversion rates and stand out online.",
    content: `
# Introduction

The digital landscape is constantly evolving, and staying ahead of design trends is crucial for businesses looking to maximize their online presence. In 2024, we're seeing a fascinating blend of innovation and user-centric design principles.

## 1. AI-Powered Personalization

Artificial intelligence is revolutionizing how websites interact with visitors. Dynamic content that adapts to user behavior is becoming the norm.

## 2. Micro-Interactions

Small, subtle animations that respond to user actions create a more engaging experience. These micro-interactions guide users and provide feedback.

## 3. Dark Mode Options

Offering dark mode isn't just a preference anymore—it's an expectation. Users appreciate having control over their viewing experience.

## 4. Glassmorphism 2.0

The frosted glass effect has evolved with more sophisticated implementations, creating depth and hierarchy in designs.

## 5. Sustainable Design

Eco-friendly design practices, including optimized images and green hosting, are becoming important differentiators.

## 6. Voice User Interface

With the rise of voice assistants, websites are beginning to incorporate voice navigation and search capabilities.

## 7. 3D Elements

Subtle 3D elements and illustrations add depth and visual interest without overwhelming the user.

## 8. Accessibility-First Design

Inclusive design is no longer optional. Websites are being built with accessibility as a core principle.

## 9. Minimalist Navigation

Simplified navigation structures help users find what they need quickly without cognitive overload.

## 10. Performance-Focused Design

Speed is king. Designs are being optimized for performance, with lazy loading and efficient code.

## Conclusion

These trends reflect a broader shift towards user-centric, accessible, and performance-optimized web design. Implementing even a few of these can significantly improve your website's effectiveness.
  `,
    featured_image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=600&fit=crop",
    category: "design",
    author_name: "Priya Mehta",
    read_time: 8,
    created_date: "2024-01-15",
    tags: ["Web Design", "Trends", "UI/UX", "2024"]
};

const relatedPosts = [
    {
        id: 2,
        title: "Why Every Small Business Needs a Professional Website",
        slug: "small-business-needs-website",
        featured_image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
        category: "marketing",
        read_time: 6
    },
    {
        id: 5,
        title: "5 UX Mistakes That Are Killing Your Conversions",
        slug: "ux-mistakes-killing-conversions",
        featured_image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=400&h=250&fit=crop",
        category: "design",
        read_time: 7
    },
    {
        id: 3,
        title: "Complete Guide to SEO for Indian Businesses",
        slug: "seo-guide-indian-businesses",
        featured_image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400&h=250&fit=crop",
        category: "seo",
        read_time: 12
    }
];

export default function BlogPost() {
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug');

    const { data: fetchPost } = useQuery({
        queryKey: ['blog-post', slug],
        queryFn: () => localClient.get(`/posts/by-slug/${slug}`),
        enabled: !!slug
    });

    const post = fetchPost || defaultPost;

    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
    };

    const shareOnSocial = (platform) => {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(post.title);

        const urls = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
            twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
            linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`
        };

        window.open(urls[platform], '_blank', 'width=600,height=400');
    };

    return (
        <div className="pt-20">
            <PageHero
                title={post.title}
                subtitle={`Starting at ₹4,999`}
                badge={post.category?.replace('-', ' ')}
                badgeIcon={BookOpen}
                backgroundImage={post.featured_image}
                primaryBtnText="Back to Blog"
                primaryBtnLink={createPageUrl("Blog")}
                secondaryBtnText="Explore Services"
                secondaryBtnLink={createPageUrl("Services")}
                floatingIcons={[
                    { icon: PenTool, className: "top-20 left-[10%] text-blue-400", delay: 0.2 },
                    { icon: Sparkles, className: "top-40 right-[15%] text-amber-400", delay: 0.4 },
                    { icon: Newspaper, className: "bottom-20 left-[20%] text-indigo-400", delay: 0.6 }
                ]}
            />

            <div className="container mx-auto px-4 relative z-10 -mt-10 mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-wrap items-center gap-6 p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-white/80"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                            <PenTool className="w-5 h-5 text-indigo-400" />
                        </div>
                        <span className="font-medium">By {post.author_name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-white/40" />
                        {format(new Date(post.created_at || post.created_date), 'MMM d, yyyy')}
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-white/40" />
                        {post.read_time} min read
                    </div>
                </motion.div>
            </div>

            {/* Content */}
            <section className="py-16 bg-white transition-colors duration-300">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-4 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-3">
                            <motion.article
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="prose prose-lg prose-slate max-w-none"
                            >
                                <ReactMarkdown
                                    components={{
                                        h1: ({ children }) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
                                        h2: ({ children }) => <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>,
                                        h3: ({ children }) => <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>,
                                        p: ({ children }) => <p className="mb-4 leading-relaxed text-slate-600">{children}</p>,
                                        ul: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>,
                                        ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>,
                                        li: ({ children }) => <li className="text-slate-600">{children}</li>,
                                        a: ({ children, href }) => <a href={href} className="text-indigo-600 hover:underline">{children}</a>,
                                        blockquote: ({ children }) => (
                                            <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-slate-600 my-4">
                                                {children}
                                            </blockquote>
                                        ),
                                        code: ({ children }) => (
                                            <code className="px-2 py-1 bg-slate-100 rounded text-sm text-slate-800">{children}</code>
                                        )
                                    }}
                                >
                                    {post.content}
                                </ReactMarkdown>
                            </motion.article>

                            {/* Tags */}
                            {post.tags && post.tags.length > 0 && (
                                <div className="mt-8 pt-8 border-t border-slate-200">
                                    <h4 className="font-semibold text-slate-900 mb-3">Tags</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags.map((tag, i) => (
                                            <span key={i} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Share */}
                            <div className="mt-8 pt-8 border-t border-slate-200">
                                <h4 className="font-semibold text-slate-900 mb-3">Share this article</h4>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => shareOnSocial('facebook')}
                                        className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                                    >
                                        <Facebook className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => shareOnSocial('twitter')}
                                        className="p-3 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-colors"
                                    >
                                        <Twitter className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => shareOnSocial('linkedin')}
                                        className="p-3 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition-colors"
                                    >
                                        <Linkedin className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={copyLink}
                                        className="p-3 bg-slate-200 text-slate-700 rounded-xl hover:bg-slate-300 transition-colors"
                                    >
                                        <Copy className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24">
                                <div className="bg-slate-50 rounded-2xl p-6 mb-6">
                                    <h4 className="font-bold text-slate-900 mb-4">Related Posts</h4>
                                    <div className="space-y-4">
                                        {relatedPosts.map((relatedPost) => (
                                            <Link
                                                key={relatedPost.id}
                                                to={createPageUrl("BlogPost") + `?slug=${relatedPost.slug}`}
                                                className="group block"
                                            >
                                                <div className="flex gap-3">
                                                    <img
                                                        src={relatedPost.featured_image}
                                                        alt={relatedPost.title}
                                                        className="w-20 h-16 object-cover rounded-lg flex-shrink-0"
                                                    />
                                                    <div>
                                                        <h5 className="font-medium text-slate-900 text-sm group-hover:text-indigo-600 transition-colors line-clamp-2">
                                                            {relatedPost.title}
                                                        </h5>
                                                        <span className="text-xs text-slate-500">{relatedPost.read_time} min read</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
                                    <h4 className="font-bold mb-2">Need a Website?</h4>
                                    <p className="text-white/80 text-sm mb-4">Let us build your dream website starting at just ₹4,999.</p>
                                    <Link to={createPageUrl("Contact")}>
                                        <GradientButton variant="secondary" size="sm" className="w-full">
                                            Get Free Quote
                                        </GradientButton>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    );
}