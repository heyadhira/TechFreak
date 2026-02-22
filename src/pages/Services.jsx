import React from 'react';
import { motion, useScroll, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { localClient } from '@/api/localClient';
import {
    Globe, ShoppingCart, Smartphone, Search, PenTool,
    Server, ArrowRight, Check, Code2, Palette, Gauge,
    Shield, HeartHandshake, Clock, Rocket, Sparkles, Eye,
    Lightbulb, ClipboardList, Layout, Terminal, Bug, Send, Star
} from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import GlassCard from '../components/ui/GlassCard';
import GradientButton from '../components/ui/GradientButton';
import PageHero from '../components/ui/PageHero';
import NoiseTexture from '../components/ui/NoiseTexture';
import Magnetic from '../components/ui/Magnetic';

const iconMap = {
    Globe, ShoppingCart, Smartphone, Search, PenTool, Server, Code2, Palette, Gauge, Shield, HeartHandshake, Clock
};

const defaultServices = [
    {
        id: 1,
        title: "Digital Engineering",
        description: "Bespoke high-performance web ecosystems built for scale and speed. We engineer for the next generation of business.",
        icon: "Globe",
        price_starting: 9999,
        features: ["Bespoke Architecture", "Next-Gen Performance", "SEO Blueprint", "Rapid Deployment", "Enterprise Security"]
    },
    {
        id: 2,
        title: "Revenue Engines",
        description: "Fully-automated e-commerce solutions that maximize sales and optimize user journey through data-driven design.",
        icon: "ShoppingCart",
        price_starting: 14999,
        features: ["Frictionless Checkout", "Global Payments", "Inventory AI", "User Insights", "conversion Mastery"]
    },
    {
        id: 3,
        title: "Mobile Mastery",
        description: "Adaptive digital experiences that thrive on every screen. Mobile-first engineering that never compromises on quality.",
        icon: "Smartphone",
        price_starting: 4999,
        features: ["Adaptive Layouts", "PWA Excellence", "Gesture Logic", "Speed Optimized", "Universal Access"]
    }
];

const processSteps = [
    { step: 1, title: "Deep Discovery", description: "Analyzing market gaps and business DNA to architect a winning digital foundation.", icon: Search },
    { step: 2, title: "Precision Planning", description: "Strategic blue-printing and wire-framing to ensure every interaction serves a purpose.", icon: ClipboardList },
    { step: 3, title: "Creative Synthesis", description: "Fusing high-end visual design with intuitive UX principles to build digital magic.", icon: Palette },
    { step: 4, title: "Elite Development", description: "Writing clean, scalable, and high-performance code using state-of-the-art tech stacks.", icon: Code2 },
    { step: 5, title: "Stress Testing", description: "Rigorous quality protocols and cross-device validation for a flawless user experience.", icon: Bug },
    { step: 6, title: "Strategic Launch", description: "Coordinated deployment and scaling strategies to ensure immediate market impact.", icon: Rocket }
];

function InteractiveServiceCard({ service, index, iconMap }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
    const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);
    const springX = useSpring(rotateX, { stiffness: 150, damping: 20 });
    const springY = useSpring(rotateY, { stiffness: 150, damping: 20 });
    const IconComponent = iconMap[service.icon] || Globe;

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const generateSlug = (title) => title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || '';

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
            <div className="h-full bg-slate-900/60 backdrop-blur-3xl border border-white/5 p-10 rounded-[3rem] transition-all duration-500 group-hover:bg-indigo-600/5 group-hover:border-indigo-500/30 overflow-hidden shadow-2xl">
                <Magnetic strength={0.3}>
                    <div className="w-20 h-20 rounded-2xl bg-indigo-600 flex items-center justify-center mb-8 shadow-lg shadow-indigo-600/20 group-hover:scale-110 transition-transform duration-500">
                        <IconComponent className="w-10 h-10 text-white" />
                    </div>
                </Magnetic>

                <h3 className="text-3xl font-black text-white mb-4 tracking-tight" style={{ transform: "translateZ(40px)" }}>{service.title}</h3>
                <p className="text-slate-400 mb-8 leading-relaxed font-medium" style={{ transform: "translateZ(20px)" }}>{service.description}</p>

                {service.features && (
                    <ul className="space-y-3 mb-10" style={{ transform: "translateZ(10px)" }}>
                        {service.features.slice(0, 5).map((feature, i) => (
                            <li key={i} className="flex items-center gap-3 text-slate-500 font-medium">
                                <div className="w-5 h-5 rounded-full bg-indigo-500/10 flex items-center justify-center">
                                    <Check className="w-3 h-3 text-indigo-500" />
                                </div>
                                <span className="text-sm">{feature}</span>
                            </li>
                        ))}
                    </ul>
                )}

                <div className="flex items-center justify-between pt-8 border-t border-white/5 mt-auto" style={{ transform: "translateZ(30px)" }}>
                    <div>
                        <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Starts at</span>
                        <p className="text-3xl font-black text-white">₹{service.price_starting?.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="flex gap-3">
                        <Magnetic strength={0.2}>
                            <Link to={`/ServiceDetail?slug=${service.slug || generateSlug(service.title)}`} className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors">
                                <Eye className="w-5 h-5 text-white" />
                            </Link>
                        </Magnetic>
                        <Magnetic strength={0.2}>
                            <Link to={createPageUrl("Contact") + `?service=${service.title}`} className="px-6 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-sm font-black text-white hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/20">
                                Book
                            </Link>
                        </Magnetic>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function Services() {
    const { data: services } = useQuery({
        queryKey: ['services'],
        queryFn: () => localClient.get('/services'),
        initialData: []
    });

    const displayServices = services && services.length > 0
        ? services.filter(s => s.is_active !== false)
        : defaultServices;

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    return (
        <main className="relative bg-slate-950 selection:bg-indigo-500/30">
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 z-[100] origin-left"
                style={{ scaleX }}
            />
            <NoiseTexture />

            <PageHero
                title="Our Engineering Vault"
                subtitle="High-Performance Solutions"
                badge="Elite Services"
                badgeIcon={Rocket}
                primaryBtnText="Initiate Audit"
                primaryBtnLink={createPageUrl("Contact")}
                secondaryBtnText="Portfolio"
                secondaryBtnLink={createPageUrl("Portfolio")}
                showStats={true}
                floatingIcons={[
                    { icon: Code2, className: "top-20 left-[10%] text-blue-500", delay: 0.2 },
                    { icon: Globe, className: "top-40 right-[15%] text-purple-400", delay: 0.4 },
                    { icon: Smartphone, className: "bottom-20 left-[20%] text-indigo-400", delay: 0.6 },
                    { icon: Sparkles, className: "top-32 right-[5%] text-amber-400", delay: 0.8 }
                ]}
            />

            {/* Services Grid */}
            <section className="py-32 relative">
                <div className="container mx-auto px-4">
                    <SectionHeading
                        badge="The Catalog"
                        title="Premium Modules"
                        subtitle="Scalable, secure, and visually stunning digital products."
                        className="mb-20"
                    />
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {displayServices.map((service, index) => (
                            <InteractiveServiceCard key={service.id} service={service} index={index} iconMap={iconMap} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section - Cinematic Flow */}
            <section className="py-32 relative bg-white/5 backdrop-blur-3xl overflow-hidden">
                <div className="container mx-auto px-4">
                    <SectionHeading
                        badge="Execution Cycle"
                        title="How We Blueprint"
                        subtitle="A transparent, data-driven journey from vision to deployment."
                        className="mb-24"
                    />

                    <div className="relative max-w-6xl mx-auto">
                        <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-indigo-500/50 to-transparent transform -translate-x-1/2" />

                        <div className="space-y-24">
                            {processSteps.map((step, index) => {
                                const isEven = index % 2 === 0;
                                return (
                                    <motion.div
                                        key={step.step}
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 0.8 }}
                                        className={`relative flex flex-col md:flex-row items-start md:items-center gap-12 md:gap-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                                    >
                                        <div className={`flex-1 w-full pl-20 md:pl-0 ${isEven ? 'md:pr-20 md:text-right' : 'md:pl-20 md:text-left'}`}>
                                            <div className="relative group p-10 bg-slate-900/60 border border-white/5 rounded-[3rem] hover:bg-slate-900/80 transition-all duration-500 shadow-2xl">
                                                <div className={`flex items-center gap-5 mb-6 ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                                                    <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/20">
                                                        <step.icon className="w-8 h-8" />
                                                    </div>
                                                    <span className="text-xs font-black tracking-widest text-slate-500 uppercase">Phase 0{step.step}</span>
                                                </div>
                                                <h3 className="text-3xl font-black text-white mb-4 tracking-tight">{step.title}</h3>
                                                <p className="text-slate-400 leading-relaxed font-medium">{step.description}</p>
                                            </div>
                                        </div>

                                        <div className="absolute left-[30px] md:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-10 w-16 h-16">
                                            <div className="w-4 h-4 rounded-full bg-slate-950 border-4 border-indigo-600 shadow-[0_0_20px_rgba(79,70,229,0.5)] group-hover:scale-150 transition-transform" />
                                        </div>
                                        <div className="hidden md:block flex-1" />
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us - Perspective Grid */}
            <section className="py-32 bg-indigo-600 relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <SectionHeading
                        badge="The TechFreak Edge"
                        title="Why Visionaries Choose Us"
                        subtitle="Uncompromising quality, peak performance, and absolute transparency."
                        light
                    />

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-24">
                        {[
                            { icon: Shield, title: "Hardened Security", description: "Bulletproof infrastructure for your data." },
                            { icon: HeartHandshake, title: "Absolute Loyalty", description: "Your success is our primary success metric." },
                            { icon: Clock, title: "Rapid Precision", description: "Meeting deadlines with surgical accuracy." },
                            { icon: Gauge, title: "Peak Efficiency", description: "Core-Web-Vital optimized performance." }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center p-10 bg-white/10 backdrop-blur-xl rounded-[3rem] border border-white/20 hover:bg-white/15 transition-all group"
                            >
                                <Magnetic strength={0.4}>
                                    <div className="w-20 h-20 mx-auto mb-8 bg-white/20 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                                        <item.icon className="w-10 h-10 text-white" />
                                    </div>
                                </Magnetic>
                                <h3 className="text-2xl font-black text-white mb-4 tracking-tight">{item.title}</h3>
                                <p className="text-white/70 font-medium leading-relaxed">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
                {/* Decorative Pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            </section>

            {/* CTA - Final Interaction */}
            <section className="py-32 relative bg-slate-950">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-5xl mx-auto"
                    >
                        <h2 className="text-5xl md:text-8xl font-black text-white mb-10 tracking-tighter leading-none uppercase">
                            Start Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Transformation.</span>
                        </h2>
                        <p className="text-2xl text-slate-400 mb-16 max-w-2xl mx-auto font-medium">
                            Join the elite circle of businesses scaling with TechFreak.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                            <Magnetic strength={0.3}>
                                <GradientButton variant="primary" size="lg" className="h-20 px-16 rounded-[2rem] text-xl font-black shadow-2xl shadow-indigo-600/20 group" onClick={() => window.location.href = createPageUrl("Contact")}>
                                    Get Started
                                    <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
                                </GradientButton>
                            </Magnetic>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}