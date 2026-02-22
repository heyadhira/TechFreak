import React from 'react';
import { motion, useScroll, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { localClient } from '@/api/localClient';
import {
    Globe, ShoppingCart, Smartphone, Search, PenTool,
    Server, ArrowRight, Check, Code2, Palette, Gauge,
    Shield, HeartHandshake, Clock, Rocket, Sparkles,
    ArrowLeft, Star, Zap, Users, MessageCircle, Send
} from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import GlassCard from '../components/ui/GlassCard';
import GradientButton from '../components/ui/GradientButton';
import SEO from '../components/SEO';
import StructuredData, { getServiceData, getBreadcrumbData } from '../components/StructuredData';
import NoiseTexture from '../components/ui/NoiseTexture';
import Magnetic from '../components/ui/Magnetic';

const iconMap = {
    Globe, ShoppingCart, Smartphone, Search, PenTool, Server,
    Code2, Palette, Gauge, Shield, HeartHandshake, Clock,
    Rocket, Sparkles, Star, Zap, Users
};

function generateSlug(title) {
    return title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || '';
}

function InteractiveIconWrapper({ Icon, imageUrl, title }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-0.5, 0.5], [15, -15]);
    const rotateY = useTransform(x, [-0.5, 0.5], [-15, 15]);
    const springX = useSpring(rotateX, { stiffness: 150, damping: 20 });
    const springY = useSpring(rotateY, { stiffness: 150, damping: 20 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            style={{
                rotateX: springX,
                rotateY: springY,
                transformStyle: "preserve-3d",
                perspective: 1000
            }}
            className="relative flex items-center justify-center group"
        >
            <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-3xl scale-110 opacity-60 group-hover:opacity-100 transition-opacity duration-700" />

            {imageUrl ? (
                <div className="relative w-full max-w-lg" style={{ transform: "translateZ(50px)" }}>
                    <img
                        src={imageUrl}
                        alt={title}
                        className="rounded-[3rem] shadow-2xl border border-white/10 grayscale group-hover:grayscale-0 transition-all duration-1000"
                    />
                </div>
            ) : (
                <div className="relative w-64 h-64 rounded-[3rem] bg-indigo-600 flex items-center justify-center shadow-2xl shadow-indigo-600/30" style={{ transform: "translateZ(80px)" }}>
                    <Icon className="w-32 h-32 text-white" />
                    <motion.div
                        animate={{ y: [-10, 10, -10] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                        className="absolute -top-10 -right-10 w-20 h-20 bg-amber-500 rounded-2xl flex items-center justify-center shadow-xl"
                    >
                        <Star className="w-10 h-10 text-white" />
                    </motion.div>
                </div>
            )}
        </motion.div>
    );
}

export default function ServiceDetail() {
    const [searchParams] = useSearchParams();
    const slug = searchParams.get('slug');

    const { data: allServices } = useQuery({
        queryKey: ['services'],
        queryFn: () => localClient.get('/services'),
        initialData: []
    });

    const service = allServices?.find(s => {
        const serviceSlug = s.slug || generateSlug(s.title);
        return serviceSlug === slug;
    });

    const relatedServices = allServices
        ?.filter(s => s.is_active !== false && s.id !== service?.id)
        ?.slice(0, 3) || [];

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    const isLoading = !allServices || allServices.length === 0;

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950">
                <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin shadow-2xl shadow-indigo-500/20"></div>
            </div>
        );
    }

    if (!service) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px]" />
                </div>
                <h1 className="text-6xl font-black text-white mb-6 uppercase tracking-tighter">Module Not Found</h1>
                <p className="text-xl text-slate-500 mb-12 font-medium">The specified digital architecture is currently offline.</p>
                <Magnetic strength={0.2}>
                    <Link to={createPageUrl('Services')}>
                        <GradientButton variant="primary" className="h-16 px-12 rounded-2xl font-black text-lg">
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Return to Vault
                        </GradientButton>
                    </Link>
                </Magnetic>
            </div>
        );
    }

    const IconComponent = iconMap[service.icon] || Globe;
    const features = service.features || [];

    return (
        <main className="relative bg-slate-950 selection:bg-indigo-500/30 overflow-hidden">
            <SEO
                pageName="ServiceDetail"
                title={`${service.title} | Engineering | TechFreak`}
                description={service.description}
            />
            <StructuredData data={getServiceData(service)} />

            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 z-[100] origin-left"
                style={{ scaleX }}
            />
            <NoiseTexture />

            {/* Hero Section */}
            <section className="relative pt-40 pb-32 min-h-[70vh] flex items-center">
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.3em] text-slate-500 mb-12"
                    >
                        <Link to={createPageUrl('Home')} className="hover:text-white transition-colors">Home</Link>
                        <span>/</span>
                        <Link to={createPageUrl('Services')} className="hover:text-white transition-colors">Services</Link>
                        <span className="text-indigo-500">/</span>
                        <span className="text-white">{service.title}</span>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 border border-white/10 rounded-full text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-8 backdrop-blur-md">
                                <IconComponent className="w-4 h-4" />
                                Elite Engineering Module
                            </div>

                            <h1 className="text-5xl md:text-7xl font-black text-white mb-10 leading-[0.9] tracking-tighter">
                                {service.title}
                            </h1>

                            <p className="text-xl text-slate-400 mb-12 leading-relaxed font-medium max-w-xl">
                                {service.description}
                            </p>

                            <div className="flex flex-wrap gap-6 mb-12">
                                <Magnetic strength={0.3}>
                                    <Link to={createPageUrl("Contact") + `?service=${service.title}`}>
                                        <GradientButton variant="primary" className="h-20 px-12 rounded-[2rem] font-black text-lg shadow-2xl shadow-indigo-600/20 group">
                                            Initiate Quote
                                            <Send className="w-5 h-5 ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </GradientButton>
                                    </Link>
                                </Magnetic>
                                <Magnetic strength={0.2}>
                                    <Link to={createPageUrl("Contact")}>
                                        <GradientButton variant="outline" className="h-20 px-12 rounded-[2rem] bg-white/5 border-white/10 hover:bg-white/10 text-white font-black text-lg">
                                            Consult Architects
                                        </GradientButton>
                                    </Link>
                                </Magnetic>
                            </div>

                            {service.price_starting && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="inline-flex items-center gap-4 px-8 py-4 bg-slate-900/60 border border-white/5 rounded-3xl backdrop-blur-3xl"
                                >
                                    <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Base Investment</span>
                                    <span className="text-3xl font-black text-white">
                                        ₹{service.price_starting?.toLocaleString('en-IN')}
                                    </span>
                                </motion.div>
                            )}
                        </motion.div>

                        <div className="hidden lg:block">
                            <InteractiveIconWrapper
                                Icon={IconComponent}
                                imageUrl={service.image_url}
                                title={service.title}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Glass Grid */}
            {features.length > 0 && (
                <section className="py-32 relative bg-white/5 backdrop-blur-3xl">
                    <div className="container mx-auto px-4">
                        <SectionHeading
                            badge="The Blueprint"
                            title="Modular Capabilities"
                            subtitle={`Every interaction and component included in the ${service.title} architecture.`}
                            className="mb-20"
                        />

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <GlassCard className="h-full p-10 bg-slate-950/60 border-white/5 rounded-[3rem] group" glowColor="rgba(99, 102, 241, 0.2)">
                                        <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center mb-8 shadow-lg shadow-indigo-600/20 group-hover:scale-110 transition-transform duration-500">
                                            <Check className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-black text-white tracking-tight leading-none">{feature}</h3>
                                    </GlassCard>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Deep Content - Interactive Article Style */}
            {service.long_description && (
                <section className="py-32 relative">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto p-12 md:p-24 bg-slate-900 border border-white/5 rounded-[4rem] shadow-2xl relative">
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-600/10 rounded-full blur-3xl" />
                            <SectionHeading
                                badge="In-Depth Analysis"
                                title="Strategic Scope"
                                subtitle=""
                                className="mb-12 !text-left"
                            />
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="prose prose-2xl prose-invert max-w-none text-slate-400 leading-relaxed font-medium"
                            >
                                {service.long_description.split('\n').map((paragraph, i) => (paragraph.trim() && (
                                    <p key={i} className="mb-10 first-letter:text-7xl first-letter:font-black first-letter:text-indigo-500 first-letter:float-left first-letter:mr-4 first-line:uppercase first-line:tracking-widest first-line:text-sm first-line:font-bold">
                                        {paragraph}
                                    </p>
                                )))}
                            </motion.div>
                        </div>
                    </div>
                </section>
            )}

            {/* Elite Value Grid */}
            <section className="py-32 bg-indigo-600 relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <SectionHeading
                        badge="The TechFreak Standard"
                        title="Uncompromising Performance"
                        subtitle="We engineer beyond expectations to ensure your digital dominance."
                        light
                        className="mb-20"
                    />

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: Shield, title: "Infrastructure", description: "Bulletproof server architectures." },
                            { icon: HeartHandshake, title: "Partnership", description: "Long-term strategic loyalty." },
                            { icon: Clock, title: "Precision", description: "Agile delivery without friction." },
                            { icon: Gauge, title: "Velocity", description: "Optimized for core-web-vitals." }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center p-12 bg-white/10 backdrop-blur-2xl rounded-[3rem] border border-white/20 hover:bg-white/15 transition-all group"
                            >
                                <Magnetic strength={0.4}>
                                    <div className="w-20 h-20 mx-auto mb-8 bg-white/20 rounded-2xl flex items-center justify-center shadow-2xl group-hover:rotate-12 transition-transform">
                                        <item.icon className="w-10 h-10 text-white" />
                                    </div>
                                </Magnetic>
                                <h3 className="text-2xl font-black text-white mb-4 tracking-tight uppercase leading-none">{item.title}</h3>
                                <p className="text-white/70 font-medium text-sm leading-relaxed">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Related Modules Grid */}
            {relatedServices.length > 0 && (
                <section className="py-32 relative bg-slate-950">
                    <div className="container mx-auto px-4">
                        <SectionHeading
                            badge="Lateral Engineering"
                            title="Compatible Modules"
                            subtitle="Lateral technologies to further scale your digital ecosystem."
                            className="mb-24"
                        />

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {relatedServices.map((relService, index) => {
                                const RelIcon = iconMap[relService.icon] || Globe;
                                const relSlug = relService.slug || generateSlug(relService.title);

                                return (
                                    <motion.div
                                        key={relService.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <GlassCard className="h-full p-12 bg-slate-900 border-white/5 rounded-[4rem] group" glowColor="rgba(99, 102, 241, 0.2)">
                                            <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center mb-10 shadow-lg shadow-indigo-600/20 group-hover:scale-110 transition-transform">
                                                <RelIcon className="w-8 h-8 text-white" />
                                            </div>
                                            <h3 className="text-3xl font-black text-white mb-6 tracking-tighter leading-none">{relService.title}</h3>
                                            <p className="text-slate-400 mb-10 leading-relaxed font-medium line-clamp-3">{relService.description}</p>
                                            <div className="flex items-center justify-between pt-8 border-t border-white/5">
                                                <span className="text-2xl font-black text-white">
                                                    ₹{relService.price_starting?.toLocaleString('en-IN')}
                                                </span>
                                                <Magnetic strength={0.2}>
                                                    <Link to={`/ServiceDetail?slug=${relSlug}`} className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-colors">
                                                        <ArrowRight className="w-6 h-6 text-white" />
                                                    </Link>
                                                </Magnetic>
                                            </div>
                                        </GlassCard>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* Final CTA - Perspective Shift */}
            <section className="py-32 relative bg-slate-950 text-center">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-5xl mx-auto"
                    >
                        <h2 className="text-6xl md:text-9xl font-black text-white mb-10 tracking-tighter leading-none uppercase">
                            Start Your <br />
                            <span className="text-indigo-500">Legacy.</span>
                        </h2>
                        <p className="text-2xl text-slate-500 mb-16 max-w-xl mx-auto font-bold uppercase tracking-widest">Architecting digital impact since 2024.</p>
                        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                            <Magnetic strength={0.3}>
                                <GradientButton variant="primary" size="lg" className="h-24 px-16 rounded-[2.5rem] text-2xl font-black shadow-2xl shadow-indigo-600/20 group" onClick={() => window.location.href = createPageUrl("Contact") + `?service=${service.title}`}>
                                    Activate Project
                                    <Zap className="w-7 h-7 ml-4 text-white fill-white" />
                                </GradientButton>
                            </Magnetic>
                            <Magnetic strength={0.2}>
                                <Link to={createPageUrl('Services')}>
                                    <GradientButton variant="outline" className="h-24 px-16 rounded-[2.5rem] bg-white/5 border-white/10 text-white font-black text-2xl">
                                        Back to Vault
                                    </GradientButton>
                                </Link>
                            </Magnetic>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
