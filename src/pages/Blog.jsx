import React, { useState } from 'react';
import { motion, useScroll, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { localClient } from '@/api/localClient';
import { Calendar, Clock, Search, Sparkles, Newspaper, BookOpen, PenTool, ArrowRight, Send, Star } from 'lucide-react';
import { format } from 'date-fns';
import GradientButton from '../components/ui/GradientButton';
import PageHero from '../components/ui/PageHero';
import NoiseTexture from '../components/ui/NoiseTexture';
import Magnetic from '../components/ui/Magnetic';

const categories = [
    { id: 'all', label: 'All Intel' },
    { id: 'web-development', label: 'Engineering' },
    { id: 'design', label: 'Aesthetics' },
    { id: 'seo', label: 'Visibility' },
    { id: 'marketing', label: 'Strategy' }
];

const defaultPosts = [
    {
        id: 1,
        title: "The 2024 Design Blueprint: Conversion-First Aesthetics",
        slug: "website-design-trends-2024",
        excerpt: "Analyzing the shift from decorative web design to performance-driven interactive ecosystems.",
        featured_image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=500&fit=crop",
        category: "design",
        author_name: "Priya Mehta",
        read_time: 8,
        created_date: "2024-01-15"
    },
    {
        id: 2,
        title: "Architecting Speed: Why Performance is Your Best Marketing Tool",
        slug: "small-business-needs-website",
        excerpt: "How a 1-second delay can erode millions in enterprise value and the engineering tactics to fix it.",
        featured_image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
        category: "marketing",
        author_name: "Vikram Singh",
        read_time: 6,
        created_date: "2024-01-10"
    },
    {
        id: 3,
        title: "The SEO Algorithm Decoded: Strategy for Visionary Brands",
        slug: "seo-guide-indian-businesses",
        excerpt: "Moving beyond keywords into semantic authority and technical dominance in organic search.",
        featured_image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&h=500&fit=crop",
        category: "seo",
        author_name: "Rahul Sharma",
        read_time: 12,
        created_date: "2024-01-05"
    }
];

function InteractiveBlogCard({ post, index }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
    const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);
    const springX = useSpring(rotateX, { stiffness: 150, damping: 20 });
    const springY = useSpring(rotateY, { stiffness: 150, damping: 20 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            style={{
                rotateX: springX,
                rotateY: springY,
                transformStyle: "preserve-3d",
                perspective: 1000
            }}
            className="group"
        >
            <Link
                to={createPageUrl("BlogPost") + `?slug=${post.slug || post.id}`}
                className="block h-full bg-slate-900/60 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] overflow-hidden transition-all duration-500 group-hover:bg-indigo-600/5 group-hover:border-indigo-500/30 group-hover:shadow-2xl"
            >
                <div className="relative h-64 overflow-hidden" style={{ transform: "translateZ(30px)" }}>
                    <img
                        src={post.featured_image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                </div>
                <div className="p-8" style={{ transform: "translateZ(20px)" }}>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-4 py-1.5 bg-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-indigo-600/20">
                            {post.category?.replace('-', ' ')}
                        </span>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-1.5">
                            <Clock className="w-3 h-3" />
                            {post.read_time} Min
                        </span>
                    </div>
                    <h3 className="text-2xl font-black text-white group-hover:text-indigo-400 transition-colors tracking-tight mb-4">
                        {post.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2">{post.excerpt}</p>
                    <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{post.author_name}</span>
                        <ArrowRight className="w-5 h-5 text-indigo-500 group-hover:translate-x-2 transition-transform" />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

export default function Blog() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const { data: posts } = useQuery({
        queryKey: ['blog-posts'],
        queryFn: () => localClient.get('/posts'),
        initialData: []
    });

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

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
        <main className="relative bg-slate-950 selection:bg-indigo-500/30">
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 z-[100] origin-left"
                style={{ scaleX }}
            />
            <NoiseTexture />

            <PageHero
                title="The Intelligence Brief"
                subtitle="Engineering & Design Insights"
                badge="Knowledge Hub"
                badgeIcon={BookOpen}
                primaryBtnText="Initiate Partnership"
                primaryBtnLink={createPageUrl("Contact")}
                secondaryBtnText="Mastery Catalog"
                secondaryBtnLink={createPageUrl("Services")}
                showStats={true}
                floatingIcons={[
                    { icon: Newspaper, className: "top-20 left-[10%] text-blue-500", delay: 0.2 },
                    { icon: PenTool, className: "top-40 right-[15%] text-purple-400", delay: 0.4 },
                    { icon: Sparkles, className: "bottom-20 left-[20%] text-indigo-400", delay: 0.6 },
                    { icon: BookOpen, className: "top-32 right-[5%] text-indigo-500", delay: 0.8 }
                ]}
            />

            {/* Blog Content */}
            <section className="py-24 relative">
                <div className="container mx-auto px-4">
                    {/* Search and Filter */}
                    <div className="flex flex-col lg:flex-row items-center gap-8 mb-20 bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/5">
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Search the Briefs..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-16 pr-6 h-16 rounded-2xl bg-slate-950/50 border border-white/5 text-white font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-slate-600"
                            />
                        </div>

                        <div className="flex flex-wrap justify-center gap-3">
                            {categories.map((cat) => (
                                <Magnetic key={cat.id} strength={0.2}>
                                    <button
                                        onClick={() => setActiveCategory(cat.id)}
                                        className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeCategory === cat.id
                                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                                            : 'bg-white/5 text-slate-500 hover:text-white border border-white/5 hover:bg-white/10'
                                            }`}
                                    >
                                        {cat.label}
                                    </button>
                                </Magnetic>
                            ))}
                        </div>
                    </div>

                    {/* Featured Post - Cinematic Hero */}
                    {featuredPost && activeCategory === 'all' && !searchQuery && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-24"
                        >
                            <Link
                                to={createPageUrl("BlogPost") + `?slug=${featuredPost.slug || featuredPost.id}`}
                                className="group block relative overflow-hidden rounded-[4rem] bg-slate-900/60 border border-white/5 shadow-2xl"
                            >
                                <div className="grid lg:grid-cols-12 min-h-[500px]">
                                    <div className="lg:col-span-7 relative overflow-hidden h-[300px] lg:h-auto">
                                        <img
                                            src={featuredPost.featured_image}
                                            alt={featuredPost.title}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale group-hover:grayscale-0"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 to-transparent hidden lg:block" />
                                        <div className="absolute top-10 left-10 px-6 py-2 bg-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-indigo-600/30">
                                            Featured Insight
                                        </div>
                                    </div>
                                    <div className="lg:col-span-5 p-12 lg:p-20 flex flex-col justify-center relative z-10">
                                        <span className="text-indigo-400 font-bold mb-4 uppercase tracking-[0.3em] text-[10px]">
                                            {featuredPost.category?.replace('-', ' ')}
                                        </span>
                                        <h2 className="text-4xl lg:text-5xl font-black text-white mb-8 group-hover:text-indigo-400 transition-colors tracking-tight leading-none">
                                            {featuredPost.title}
                                        </h2>
                                        <p className="text-xl text-slate-400 mb-10 line-clamp-3 font-medium leading-relaxed">{featuredPost.excerpt}</p>
                                        <div className="flex items-center gap-8 text-[10px] font-black text-slate-500 uppercase tracking-widest border-t border-white/5 pt-10">
                                            <span className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-indigo-500" />
                                                {format(new Date(featuredPost.created_at || featuredPost.created_date), 'MMM d, yyyy')}
                                            </span>
                                            <span className="flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-indigo-500" />
                                                {featuredPost.read_time} Min Read
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    )}

                    {/* Posts Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filteredPosts.filter(p => p.id !== featuredPost?.id || activeCategory !== 'all' || searchQuery).map((post, index) => (
                            <InteractiveBlogCard key={post.id} post={post} index={index} />
                        ))}
                    </div>

                    {filteredPosts.length === 0 && (
                        <div className="text-center py-24 bg-white/5 rounded-[3rem] border border-white/5">
                            <Star className="w-12 h-12 text-slate-700 mx-auto mb-6" />
                            <p className="text-xl text-slate-500 font-black uppercase tracking-widest leading-relaxed">No data retrieved for <br /> this search parameter.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter CTA - Cinematic Gradient */}
            <section className="py-32 relative overflow-hidden bg-slate-950">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-5xl mx-auto p-20 rounded-[4rem] bg-indigo-600/5 border border-white/5 relative group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-transparent to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                        <h2 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none uppercase">
                            Secure The <br />
                            <span className="text-indigo-500">Intelligence.</span>
                        </h2>
                        <p className="text-2xl text-slate-400 mb-16 max-w-xl mx-auto font-medium">
                            Join over 10k digital visionaries receiving our weekly technical blueprints.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                            <input
                                type="email"
                                placeholder="Corporate Email Address"
                                className="flex-1 h-16 px-8 rounded-2xl bg-white/5 border border-white/10 text-white font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
                            />
                            <Magnetic strength={0.3}>
                                <GradientButton variant="primary" className="h-16 px-10 rounded-2xl font-black shadow-2xl shadow-indigo-600/20">
                                    Subscribe
                                    <Send className="w-5 h-5 ml-2" />
                                </GradientButton>
                            </Magnetic>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}