import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { localClient } from '@/api/localClient';
import { ExternalLink, ArrowRight, Eye, Briefcase, Zap } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import GradientButton from '../ui/GradientButton';
import Magnetic from '../ui/Magnetic';

const categories = [
    { id: 'all', label: 'All Deployments' },
    { id: 'e-commerce', label: 'Commerce' },
    { id: 'corporate', label: 'Enterprise' },
    { id: 'startup', label: 'Disruptive' }
];

function InteractiveProjectCard({ project, index }) {
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
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
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
            <div className="relative bg-slate-900/60 backdrop-blur-3xl border border-white/5 rounded-[3rem] overflow-hidden transition-all duration-500 group-hover:bg-indigo-600/5 group-hover:border-indigo-500/30 group-hover:shadow-2xl">
                <div className="relative aspect-[4/3] overflow-hidden" style={{ transform: "translateZ(40px)" }}>
                    <img
                        src={project.thumbnail_url}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700" />

                    <div className="absolute top-8 left-8 flex flex-wrap gap-3">
                        {project.tech_stack?.slice(0, 2).map((tech, i) => (
                            <span key={i} className="px-4 py-1.5 bg-white/10 backdrop-blur-xl border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-white">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="p-10" style={{ transform: "translateZ(20px)" }}>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                        <span className="text-[10px] text-indigo-400 font-black uppercase tracking-[0.3em]">{project.category?.replace('-', ' ')}</span>
                    </div>
                    <h3 className="text-3xl font-black text-white group-hover:text-indigo-400 transition-colors tracking-tighter mb-6 leading-none">
                        {project.title}
                    </h3>

                    <Magnetic strength={0.2}>
                        <Link to={createPageUrl("Portfolio")} className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-colors group/link">
                            Inspect Blueprint
                            <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-2" />
                        </Link>
                    </Magnetic>
                </div>
            </div>
        </motion.div>
    );
}

export default function PortfolioSection() {
    const [activeFilter, setActiveFilter] = useState('all');

    const { data: projects } = useQuery({
        queryKey: ['portfolio', 'featured'],
        queryFn: () => localClient.get('/portfolio?featured=true'),
        initialData: []
    });

    const filteredProjects = activeFilter === 'all'
        ? projects
        : projects.filter(p => p.category?.toLowerCase() === activeFilter.toLowerCase());

    return (
        <section className="py-32 relative bg-slate-950 overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <SectionHeading
                    badge="The Deployment Record"
                    title="Proven Impact"
                    subtitle="A curated record of high-performance digital transformations deployed globally."
                    className="mb-24"
                />

                {/* Filter tabs - Cinematic */}
                <div className="flex flex-wrap justify-center gap-4 mb-20 bg-white/5 backdrop-blur-3xl p-4 rounded-[2.5rem] w-max mx-auto border border-white/5">
                    {categories.map((cat) => (
                        <Magnetic key={cat.id} strength={0.2}>
                            <button
                                onClick={() => setActiveFilter(cat.id)}
                                className={`relative px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeFilter === cat.id
                                    ? 'text-white'
                                    : 'text-slate-500 hover:text-white'
                                    }`}
                            >
                                {activeFilter === cat.id && (
                                    <motion.div
                                        layoutId="home-filter-pill"
                                        className="absolute inset-0 bg-indigo-600 rounded-2xl shadow-lg -z-10 shadow-indigo-600/20"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                {cat.label}
                            </button>
                        </Magnetic>
                    ))}
                </div>

                {/* Projects grid */}
                <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.slice(0, 3).map((project, index) => (
                            <InteractiveProjectCard key={project.id} project={project} index={index} />
                        ))}
                    </AnimatePresence>
                </motion.div>

                <motion.div
                    className="text-center mt-24"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <Magnetic strength={0.3}>
                        <Link to={createPageUrl("Portfolio")}>
                            <GradientButton variant="primary" className="h-20 px-16 rounded-[2rem] font-black text-lg group">
                                View Full Archive
                                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
                            </GradientButton>
                        </Link>
                    </Magnetic>
                </motion.div>
            </div>
        </section>
    );
}