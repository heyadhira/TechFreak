import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { localClient } from '@/api/localClient';
import GradientButton from '../components/ui/GradientButton';
import PageHero from '../components/ui/PageHero';
import NoiseTexture from '../components/ui/NoiseTexture';
import Magnetic from '../components/ui/Magnetic';
import { Palette, ExternalLink, ArrowRight, X, Layout, Briefcase, MousePointer2, Sparkles, Send } from 'lucide-react';

const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'e-commerce', label: 'E-Commerce' },
    { id: 'corporate', label: 'Corporate' },
    { id: 'startup', label: 'Startup' },
    { id: 'portfolio', label: 'Portfolio' }
];

function InteractiveProjectCard({ project, index, onSelect }) {
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

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            style={{
                rotateX: springX,
                rotateY: springY,
                transformStyle: "preserve-3d",
                perspective: 1000
            }}
            className="group cursor-pointer"
            onClick={() => onSelect(project)}
        >
            <div className="relative bg-slate-900/60 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] overflow-hidden transition-all duration-500 group-hover:bg-indigo-600/5 group-hover:border-indigo-500/30 group-hover:shadow-2xl">
                <div className="relative aspect-[4/3] overflow-hidden" style={{ transform: "translateZ(40px)" }}>
                    <img
                        src={project.thumbnail_url}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                        {project.tech_stack?.slice(0, 2).map((tech, i) => (
                            <span key={i} className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-lg text-white text-[10px] font-black uppercase tracking-widest">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="p-8" style={{ transform: "translateZ(20px)" }}>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                        <span className="text-[10px] text-indigo-400 font-black uppercase tracking-[0.2em]">{project.category?.replace('-', ' ')}</span>
                    </div>
                    <h3 className="text-2xl font-black text-white group-hover:text-indigo-400 transition-colors tracking-tight">
                        {project.title}
                    </h3>
                </div>
            </div>
        </motion.div>
    );
}

export default function Portfolio() {
    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedProject, setSelectedProject] = useState(null);

    const { data: projects } = useQuery({
        queryKey: ['portfolio'],
        queryFn: () => localClient.get('/portfolio'),
        initialData: []
    });

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    const filteredProjects = activeFilter === 'all'
        ? projects
        : projects.filter(p => p.category === activeFilter);

    return (
        <main className="relative bg-slate-950 selection:bg-indigo-500/30">
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 z-[100] origin-left"
                style={{ scaleX }}
            />
            <NoiseTexture />

            <PageHero
                title="The Deployment Vault"
                subtitle="Elite Digital Transformations"
                badge="Premium Showcase"
                badgeIcon={Briefcase}
                primaryBtnText="Initiate Inquiry"
                primaryBtnLink={createPageUrl("Contact")}
                secondaryBtnText="Mastery Catalog"
                secondaryBtnLink={createPageUrl("Services")}
                showStats={true}
                floatingIcons={[
                    { icon: Palette, className: "top-20 left-[10%] text-pink-500", delay: 0.2 },
                    { icon: Layout, className: "top-40 right-[15%] text-blue-400", delay: 0.4 },
                    { icon: MousePointer2, className: "bottom-20 left-[20%] text-indigo-400", delay: 0.6 },
                    { icon: ExternalLink, className: "top-32 right-[5%] text-purple-500", delay: 0.8 }
                ]}
            />

            {/* Portfolio Grid */}
            <section className="py-32 relative">
                <div className="container mx-auto px-4">
                    {/* Filter tabs */}
                    <div className="flex flex-wrap justify-center gap-4 mb-20">
                        {categories.map((cat) => (
                            <Magnetic key={cat.id} strength={0.2}>
                                <button
                                    onClick={() => setActiveFilter(cat.id)}
                                    className={`relative px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeFilter === cat.id
                                        ? 'text-white'
                                        : 'text-slate-500 hover:text-white'
                                        }`}
                                >
                                    {activeFilter === cat.id && (
                                        <motion.div
                                            layoutId="filter-pill"
                                            className="absolute inset-0 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-600/30 -z-10"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    {cat.label}
                                </button>
                            </Magnetic>
                        ))}
                    </div>

                    {/* Projects grid */}
                    <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project, index) => (
                                <InteractiveProjectCard
                                    key={project.id}
                                    project={project}
                                    index={index}
                                    onSelect={setSelectedProject}
                                />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* Project Modal - Cinematic */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-xl"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 50 }}
                            className="bg-slate-900 border border-white/10 rounded-[4rem] max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] relative scrollbar-hide"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative group">
                                <img
                                    src={selectedProject.thumbnail_url}
                                    alt={selectedProject.title}
                                    className="w-full h-80 md:h-[500px] object-cover rounded-t-[4rem] grayscale group-hover:grayscale-0 transition-all duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                                <Magnetic strength={0.4}>
                                    <button
                                        onClick={() => setSelectedProject(null)}
                                        className="absolute top-10 right-10 w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center hover:bg-white/20 transition-all group"
                                    >
                                        <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform" />
                                    </button>
                                </Magnetic>
                            </div>

                            <div className="p-12 md:p-20 -mt-24 relative">
                                <div className="flex flex-wrap gap-3 mb-8">
                                    <span className="px-5 py-2 bg-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-indigo-600/20">
                                        {selectedProject.category?.replace('-', ' ')}
                                    </span>
                                    {selectedProject.tech_stack?.map((tech, i) => (
                                        <span key={i} className="px-5 py-2 bg-white/5 border border-white/5 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-none">
                                    {selectedProject.title}
                                </h2>

                                {selectedProject.client_name && (
                                    <p className="text-indigo-400 font-bold mb-8 uppercase tracking-[0.3em] text-xs">Architected for: {selectedProject.client_name}</p>
                                )}

                                <p className="text-xl text-slate-400 mb-12 leading-relaxed font-medium">
                                    {selectedProject.description}
                                </p>

                                <div className="flex flex-col sm:flex-row gap-6 border-t border-white/5 pt-12">
                                    {selectedProject.project_url && selectedProject.project_url !== '#' && (
                                        <Magnetic strength={0.3}>
                                            <a href={selectedProject.project_url} target="_blank" rel="noopener noreferrer">
                                                <GradientButton variant="primary" className="h-16 px-12 rounded-2xl font-black text-lg group">
                                                    Launch Site
                                                    <ExternalLink className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                </GradientButton>
                                            </a>
                                        </Magnetic>
                                    )}
                                    <Magnetic strength={0.2}>
                                        <Link to={createPageUrl("Contact") + `?project=${selectedProject.title}`}>
                                            <GradientButton variant="outline" className="h-16 px-12 rounded-2xl bg-white/5 border-white/10 hover:bg-white/10 text-white font-black text-lg">
                                                Initiate Similar Strategy
                                            </GradientButton>
                                        </Link>
                                    </Magnetic>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* CTA - Final Call */}
            <section className="py-32 relative bg-slate-950 overflow-hidden">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-5xl md:text-8xl font-black text-white mb-10 tracking-tighter leading-none uppercase">
                            Your Success <br />
                            <span className="text-indigo-500">starts here.</span>
                        </h2>
                        <p className="text-2xl text-slate-400 mb-16 max-w-xl mx-auto font-medium">
                            Ready to transform your vision into a digital engine?
                        </p>
                        <Magnetic strength={0.3}>
                            <GradientButton variant="primary" size="lg" className="h-20 px-16 rounded-[2rem] text-xl font-black shadow-2xl shadow-indigo-600/20 group" onClick={() => window.location.href = createPageUrl("Contact")}>
                                Initiate Project
                                <Send className="w-6 h-6 ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </GradientButton>
                        </Magnetic>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}