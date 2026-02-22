import React from 'react';
import { motion, useScroll, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { localClient } from '@/api/localClient';
import {
    Calendar, Clock,
    Facebook, Twitter, Linkedin, Copy, Sparkles,
    Newspaper, BookOpen, PenTool, ArrowLeft, Send, Share2, Star
} from 'lucide-react';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import GradientButton from '../components/ui/GradientButton';
import PageHero from '../components/ui/PageHero';
import NoiseTexture from '../components/ui/NoiseTexture';
import Magnetic from '../components/ui/Magnetic';
import { toast } from 'sonner';

const defaultPost = {
    title: "The 2024 Digital Blueprint: Architecting High-Performance Assets",
    slug: "website-design-trends-2024",
    excerpt: "Discover the latest digital engineering trends that are transforming Indian brands into global leaders through conversion-first design.",
    content: `
# The New Digital Directive

Industrial landscapes are shifting. In 2024, the "stunning website" is no longer enough. We are entering the era of the **Digital Engine**—ecosystems that prioritize performance, engineering precision, and modular scale.

## 1. Engineered Personalization

Automation is the baseline. We are now deploying AI architectures that adapt in real-time, serving unique experiences to every user who enters the ecosystem.

## 2. Micro-Interaction Logic

Subtle, high-fidelity responses to user actions are what separate elite platforms from the noise. It is about providing immediate, visual feedback for every human interaction.

## 3. Persistent Dark Systems

Dark mode is no longer an option; it is a design standard. Providing a high-contrast, obsidian interface reduces eye fatigue and elevates the premium aesthetic of the brand.

## 4. Obsidian Glassmorphism

The frosted glass aesthetic has matured into obsidian-grade depth, creating multi-layered hierarchies that guide the user's eye with surgical precision.

## 5. Algorithmic Speed

Every millisecond counts. We engineer for core-web-vital dominance, ensuring our assets load with near-zero friction.

## Conclusion

The directive is clear: engineer for scale, design for impact. These are the principles that steer every line of code at TechFreak.
  `,
    featured_image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=800&fit=crop",
    category: "engineering",
    author_name: "Vikram Singh",
    read_time: 8,
    created_date: "2024-01-15",
    tags: ["Engineering", "Aesthetics", "Conversion", "2024"]
};

const relatedPosts = [
    {
        id: 2,
        title: "Speed as a Sales Tool: The ROI of Performance",
        slug: "small-business-needs-website",
        featured_image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
        category: "strategy",
        read_time: 6
    },
    {
        id: 5,
        title: "UX Cognitive Load: Designing for Precision",
        slug: "ux-mistakes-killing-conversions",
        featured_image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=400&h=250&fit=crop",
        category: "aesthetics",
        read_time: 7
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

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success('Strategy link captured.');
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
        <main className="relative bg-slate-950 selection:bg-indigo-500/30 overflow-hidden">
            <SEO
                pageName="Blog"
                title={`${post.title} | techfreak.in Intel`}
                description={post.excerpt}
                image={post.featured_image}
            />
            <StructuredData data={require('../components/StructuredData').getBlogPostData(post)} />

            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 z-[100] origin-left"
                style={{ scaleX }}
            />
            <NoiseTexture />

            <PageHero
                title={post.title}
                subtitle="Exclusive Intelligence Report"
                badge={post.category?.replace('-', ' ')}
                badgeIcon={BookOpen}
                backgroundImage={post.featured_image}
                primaryBtnText="Intel Feed"
                primaryBtnLink={createPageUrl("Blog")}
                secondaryBtnText="Mastery Vault"
                secondaryBtnLink={createPageUrl("Services")}
                floatingIcons={[
                    { icon: PenTool, className: "top-20 left-[10%] text-blue-500", delay: 0.2 },
                    { icon: Sparkles, className: "top-40 right-[15%] text-amber-400", delay: 0.4 },
                    { icon: Newspaper, className: "bottom-20 left-[20%] text-indigo-500", delay: 0.6 }
                ]}
            />

            <div className="container mx-auto px-4 relative z-20 -mt-20 mb-32">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-wrap items-center justify-between gap-8 p-10 rounded-[3rem] bg-slate-900 border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)]"
                >
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 flex items-center justify-center border border-indigo-500/30">
                            <PenTool className="w-8 h-8 text-indigo-400" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Authorized Intelligence by</p>
                            <h3 className="text-xl font-black text-white">{post.author_name}</h3>
                        </div>
                    </div>

                    <div className="flex items-center gap-12">
                        <div className="flex flex-col items-center">
                            <Calendar className="w-5 h-5 text-indigo-500 mb-2" />
                            <span className="text-[10px] font-black text-white uppercase tracking-widest">{format(new Date(post.created_at || post.created_date), 'MMM d, yyyy')}</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <Clock className="w-5 h-5 text-indigo-500 mb-2" />
                            <span className="text-[10px] font-black text-white uppercase tracking-widest">{post.read_time} Min Read</span>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Magnetic strength={0.3}>
                            <button onClick={copyLink} className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all">
                                <Copy className="w-5 h-5 text-white" />
                            </button>
                        </Magnetic>
                        <Magnetic strength={0.2}>
                            <button onClick={() => shareOnSocial('linkedin')} className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20">
                                <Share2 className="w-5 h-5 text-white" />
                            </button>
                        </Magnetic>
                    </div>
                </motion.div>
            </div>

            {/* Main Article Section */}
            <section className="pb-32 relative">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-12 gap-16">
                        {/* Article Content - Cinematic Deep Glass */}
                        <div className="lg:col-span-8">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="bg-slate-900 border border-white/5 p-12 md:p-20 rounded-[4rem] shadow-2xl relative"
                            >
                                <div className="absolute top-20 right-10 w-40 h-40 bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />

                                <article className="prose prose-2xl prose-invert max-w-none prose-p:text-slate-400 prose-p:leading-relaxed prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-white prose-a:text-indigo-400 prose-strong:text-indigo-400 prose-blockquote:border-indigo-500 prose-blockquote:bg-white/5 prose-blockquote:p-8 prose-blockquote:rounded-3xl prose-li:text-slate-400">
                                    <ReactMarkdown
                                        components={{
                                            h1: ({ children }) => <h1 className="text-5xl md:text-7xl mb-12 uppercase leading-none">{children}</h1>,
                                            h2: ({ children }) => <h2 className="text-3xl md:text-5xl mb-8 mt-16">{children}</h2>,
                                            p: ({ children }) => <p className="mb-8 font-medium">{children}</p>,
                                            blockquote: ({ children }) => (
                                                <blockquote className="my-12 relative overflow-hidden">
                                                    <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />
                                                    {children}
                                                </blockquote>
                                            )
                                        }}
                                    >
                                        {post.content}
                                    </ReactMarkdown>
                                </article>

                                {/* Tags Perspective */}
                                {post.tags && post.tags.length > 0 && (
                                    <div className="mt-20 pt-16 border-t border-white/5">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-8">Intelligence Tags</h4>
                                        <div className="flex flex-wrap gap-4">
                                            {post.tags.map((tag, i) => (
                                                <span key={i} className="px-6 py-2.5 bg-white/5 border border-white/5 text-indigo-400 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white/10 transition-colors cursor-default">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </div>

                        {/* Sticky Sidebar - Elite Insights */}
                        <div className="lg:col-span-4">
                            <aside className="sticky top-32 space-y-10">
                                <div className="p-10 bg-slate-900 border border-white/5 rounded-[3rem] shadow-xl">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500 mb-8">Related Intelligence</h4>
                                    <div className="space-y-8">
                                        {relatedPosts.map((relatedPost) => (
                                            <Link
                                                key={relatedPost.id}
                                                to={createPageUrl("BlogPost") + `?slug=${relatedPost.slug}`}
                                                className="group flex gap-5 items-center"
                                            >
                                                <div className="relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 border border-white/10">
                                                    <img
                                                        src={relatedPost.featured_image}
                                                        alt={relatedPost.title}
                                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                                    />
                                                </div>
                                                <div>
                                                    <h5 className="font-black text-white group-hover:text-indigo-400 transition-colors leading-tight mb-2 line-clamp-2">
                                                        {relatedPost.title}
                                                    </h5>
                                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{relatedPost.read_time} Min Brief</span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="p-12 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[3rem] text-white relative overflow-hidden group"
                                >
                                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
                                    <Star className="w-12 h-12 text-white/20 absolute -top-2 -right-2 rotate-12" />

                                    <h4 className="text-3xl font-black mb-4 tracking-tighter leading-none">Engineer Your Vision.</h4>
                                    <p className="text-white/80 font-bold mb-10 text-sm leading-relaxed">Scale your business with our elite digital engineering modules starting at ₹4,999.</p>
                                    <Magnetic strength={0.3}>
                                        <Link to={createPageUrl("Contact")}>
                                            <GradientButton variant="secondary" className="w-full h-16 rounded-2xl font-black text-indigo-700 hover:text-white transition-colors bg-white hover:bg-white/10 border-0">
                                                Initiate Inquiry
                                            </GradientButton>
                                        </Link>
                                    </Magnetic>
                                </motion.div>
                            </aside>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom Navigation - Deep Perspective */}
            <section className="py-32 bg-slate-950 border-t border-white/5">
                <div className="container mx-auto px-4 text-center">
                    <Magnetic strength={0.2}>
                        <Link to={createPageUrl("Blog")} className="inline-flex items-center gap-4 text-slate-500 font-black uppercase tracking-[0.4em] hover:text-white transition-colors group">
                            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-2 transition-transform" />
                            Return to Feed
                        </Link>
                    </Magnetic>
                </div>
            </section>
        </main>
    );
}