import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { localClient } from '@/api/localClient';
import { Calendar, Clock, Search } from 'lucide-react';
import { format } from 'date-fns';
import GradientButton from '../components/ui/GradientButton';
import PageHero from '../components/ui/PageHero';
import { Sparkles, Newspaper, BookOpen, PenTool } from 'lucide-react';

const categories = [
    { id: 'all', label: 'All Posts' },
    { id: 'web-development', label: 'Web Development' },
    { id: 'design', label: 'Design' },
    { id: 'seo', label: 'SEO' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'technology', label: 'Technology' },
    { id: 'tips', label: 'Tips & Tricks' }
];

const defaultPosts = [
    {
        id: 1,
        title: "10 Website Design Trends for 2024 That Will Boost Conversions",
        slug: "website-design-trends-2024",
        excerpt: "Discover the latest web design trends that are helping businesses increase their conversion rates and stand out online.",
        featured_image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=500&fit=crop",
        category: "design",
        author_name: "Priya Mehta",
        read_time: 8,
        created_date: "2024-01-15"
    },
    {
        id: 2,
        title: "Why Every Small Business Needs a Professional Website in 2024",
        slug: "small-business-needs-website",
        excerpt: "Learn why having a professional website is no longer optional and how it can transform your business growth.",
        featured_image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
        category: "marketing",
        author_name: "Vikram Singh",
        read_time: 6,
        created_date: "2024-01-10"
    },
    {
        id: 3,
        title: "Complete Guide to SEO for Indian Businesses",
        slug: "seo-guide-indian-businesses",
        excerpt: "A comprehensive SEO guide specifically tailored for Indian businesses looking to rank higher on Google.",
        featured_image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&h=500&fit=crop",
        category: "seo",
        author_name: "Rahul Sharma",
        read_time: 12,
        created_date: "2024-01-05"
    },
    {
        id: 4,
        title: "React vs Next.js: Which Should You Choose for Your Project?",
        slug: "react-vs-nextjs",
        excerpt: "An in-depth comparison of React and Next.js to help you make the right choice for your web project.",
        featured_image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=500&fit=crop",
        category: "web-development",
        author_name: "Rahul Sharma",
        read_time: 10,
        created_date: "2024-01-01"
    },
    {
        id: 5,
        title: "5 UX Mistakes That Are Killing Your Website's Conversion Rate",
        slug: "ux-mistakes-killing-conversions",
        excerpt: "Identify common UX mistakes that might be driving visitors away and learn how to fix them.",
        featured_image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&h=500&fit=crop",
        category: "design",
        author_name: "Priya Mehta",
        read_time: 7,
        created_date: "2023-12-28"
    },
    {
        id: 6,
        title: "How to Choose the Right Tech Stack for Your Startup",
        slug: "tech-stack-startup",
        excerpt: "A practical guide to selecting the best technologies for your startup's web application.",
        featured_image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=500&fit=crop",
        category: "technology",
        author_name: "Vikram Singh",
        read_time: 9,
        created_date: "2023-12-20"
    }
];

export default function Blog() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const { data: posts } = useQuery({
        queryKey: ['blog-posts'],
        queryFn: () => localClient.get('/posts'),
        initialData: []
    });

    const displayPosts = posts.length > 0 ? posts : defaultPosts;

    const filteredPosts = displayPosts.filter(post => {
        const categoryMatch = activeCategory === 'all' || post.category === activeCategory;
        const searchMatch = !searchQuery ||
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
        return categoryMatch && searchMatch;
    });

    const featuredPost = displayPosts.find(p => p.is_featured) || displayPosts[0];

    return (
        <div>
            <PageHero
                title="Tech Insights"
                subtitle="Expert Guidance"
                badge="Knowledge Hub"
                badgeIcon={BookOpen}
                primaryBtnText="Our Services"
                primaryBtnLink={createPageUrl("Services")}
                secondaryBtnText="Portfolio"
                secondaryBtnLink={createPageUrl("Portfolio")}
                showStats={true}
                floatingIcons={[
                    { icon: Newspaper, className: "top-20 left-[10%] text-blue-400", delay: 0.2 },
                    { icon: PenTool, className: "top-40 right-[15%] text-purple-400", delay: 0.4 },
                    { icon: Sparkles, className: "bottom-20 left-[20%] text-amber-400", delay: 0.6 },
                    { icon: BookOpen, className: "top-32 right-[5%] text-indigo-400", delay: 0.8 }
                ]}
            />

            {/* Blog Content */}
            < section className="py-16 bg-slate-50 dark:bg-slate-950 transition-colors duration-300" >
                <div className="container mx-auto px-4">
                    {/* Search and Filter */}
                    <div className="flex flex-col lg:flex-row gap-6 mb-12">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat.id
                                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none'
                                        : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700'
                                        }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Featured Post */}
                    {featuredPost && activeCategory === 'all' && !searchQuery && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-12"
                        >
                            <Link
                                to={createPageUrl("BlogPost") + `?slug=${featuredPost.slug || featuredPost.id}`}
                                className="group block bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-slate-100 dark:border-slate-800"
                            >
                                <div className="grid lg:grid-cols-2">
                                    <div className="relative h-64 lg:h-auto overflow-hidden">
                                        <img
                                            src={featuredPost.featured_image}
                                            alt={featuredPost.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute top-4 left-4 px-3 py-1 bg-amber-500 text-white text-sm font-medium rounded-full">
                                            Featured
                                        </div>
                                    </div>
                                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                                        <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium capitalize mb-4 w-fit">
                                            {featuredPost.category?.replace('-', ' ')}
                                        </span>
                                        <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                            {featuredPost.title}
                                        </h2>
                                        <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-3">{featuredPost.excerpt}</p>
                                        <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-500">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                {format(new Date(featuredPost.created_at || featuredPost.created_date), 'MMM d, yyyy')}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                {featuredPost.read_time} min read
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    )}

                    {/* Posts Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.filter(p => p.id !== featuredPost?.id || activeCategory !== 'all' || searchQuery).map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link
                                    to={createPageUrl("BlogPost") + `?slug=${post.slug || post.id}`}
                                    className="group block bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all h-full border border-slate-100 dark:border-slate-800"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={post.featured_image}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <span className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded-full text-xs font-medium capitalize mb-3">
                                            {post.category?.replace('-', ' ')}
                                        </span>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                                        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-500">
                                            <span>{post.author_name}</span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {post.read_time} min
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {filteredPosts.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-slate-600">No posts found matching your criteria.</p>
                        </div>
                    )}
                </div>
            </section >

            {/* Newsletter CTA */}
            < section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-700" >
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Stay Updated
                        </h2>
                        <p className="text-white/80 mb-8 max-w-xl mx-auto">
                            Subscribe to our newsletter for the latest tips, trends, and insights delivered to your inbox.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-5 py-3 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-white/50"
                            />
                            <GradientButton variant="secondary">
                                Subscribe
                            </GradientButton>
                        </div>
                    </motion.div>
                </div>
            </section >
        </div >
    );
}