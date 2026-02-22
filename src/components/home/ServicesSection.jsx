import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { localClient } from '@/api/localClient';
import {
    Globe, ShoppingCart, Smartphone, Search, PenTool,
    Server, ArrowRight, Eye, Sparkles, Send
} from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import SectionHeading from '../ui/SectionHeading';
import GradientButton from '../ui/GradientButton';
import Magnetic from '../ui/Magnetic';

const iconMap = {
    Globe, ShoppingCart, Smartphone, Search, PenTool, Server
};

const defaultServices = [
    {
        id: 1,
        title: "Custom Engineering",
        description: "Bespoke digital architectures engineered for maximum impact and modular scale.",
        icon: "Globe",
        price_starting: 9999
    },
    {
        id: 2,
        title: "E-Commerce Vaults",
        description: "High-conversion commerce engines with secure payment logic and real-time inventory.",
        icon: "ShoppingCart",
        price_starting: 14999
    },
    {
        id: 3,
        title: "Mobile Supremacy",
        description: "Stunning, fluid experiences optimized for the mobile-first generation.",
        icon: "Smartphone",
        price_starting: 4999
    }
];

function InteractiveServiceCard({ service, index }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
    const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);
    const springX = useSpring(rotateX, { stiffness: 150, damping: 20 });
    const springY = useSpring(rotateY, { stiffness: 150, damping: 20 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const IconComponent = iconMap[service.icon] || Globe;
    const generateSlug = (title) => title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || '';

    return (
        <motion.div
            layout
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
            <GlassCard
                className="h-full p-10 bg-slate-900/60 border-white/5 rounded-[3rem] transition-all duration-500 group-hover:bg-indigo-600/5 group-hover:border-indigo-500/30 group-hover:shadow-2xl"
                glowColor="rgba(99, 102, 241, 0.2)"
            >
                <div style={{ transform: "translateZ(50px)" }}>
                    <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center mb-8 shadow-lg shadow-indigo-600/20 group-hover:scale-110 transition-transform">
                        <IconComponent className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-3xl font-black text-white mb-4 tracking-tighter leading-none group-hover:text-indigo-400 transition-colors">
                        {service.title}
                    </h3>

                    <p className="text-slate-400 mb-8 leading-relaxed font-medium">
                        {service.description}
                    </p>

                    <div className="flex items-center justify-between pt-8 border-t border-white/5">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Base Investment</span>
                        <span className="text-2xl font-black text-white group-hover:text-indigo-400 transition-colors">
                            ₹{service.price_starting?.toLocaleString('en-IN')}
                        </span>
                    </div>

                    <Magnetic strength={0.2}>
                        <Link
                            to={`/ServiceDetail?slug=${service.slug || generateSlug(service.title)}`}
                            className="mt-10 inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 hover:text-white transition-all group/link"
                        >
                            <Eye className="w-4 h-4" />
                            Launch Module
                            <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-2" />
                        </Link>
                    </Magnetic>
                </div>
            </GlassCard>
        </motion.div>
    );
}

export default function ServicesSection() {
    const { data: services } = useQuery({
        queryKey: ['services'],
        queryFn: () => localClient.get('/services'),
        initialData: []
    });

    const displayServices = services && services.length > 0 ? services.filter(s => s.is_active !== false) : defaultServices;

    return (
        <section className="py-32 relative bg-slate-950 overflow-hidden">
            {/* Perspective Elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-500/5 to-transparent pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <SectionHeading
                    badge="The Capability Vault"
                    title="Modular Engineering"
                    subtitle="Elite digital components engineered for disruptive impact and strategic scale."
                    className="mb-24"
                />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {displayServices.slice(0, 3).map((service, index) => (
                        <InteractiveServiceCard key={service.id} service={service} index={index} />
                    ))}
                </div>

                <motion.div
                    className="text-center mt-24"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <Magnetic strength={0.3}>
                        <Link to={createPageUrl("Services")}>
                            <GradientButton variant="primary" className="h-20 px-12 rounded-[2rem] font-black text-lg group">
                                Access Full Repository
                                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
                            </GradientButton>
                        </Link>
                    </Magnetic>
                </motion.div>
            </div>
        </section>
    );
}