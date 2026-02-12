import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { localClient } from '@/api/localClient';
import { ExternalLink, ArrowRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import GradientButton from '../ui/GradientButton';

const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'e-commerce', label: 'E-Commerce' },
    { id: 'corporate', label: 'Corporate' },
    { id: 'startup', label: 'Startup' },
    { id: 'educational', label: 'Educational' }
];



export default function PortfolioSection() {
    const [activeFilter, setActiveFilter] = useState('all');

    const { data: projects } = useQuery({
        queryKey: ['portfolio', 'featured'],
        queryFn: () => localClient.get('/portfolio?featured=true'),
        initialData: []
    });

    const displayProjects = projects;

    const filteredProjects = activeFilter === 'all'
        ? displayProjects
        : displayProjects.filter(p => p.category === activeFilter);

    return (
        <section className="py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white dark:from-slate-950 to-transparent" />

            <div className="container mx-auto px-4 relative z-10">
                <SectionHeading
                    badge="Our Portfolio"
                    title="Work That Speaks For Itself"
                    subtitle="Browse through our recent projects and see the quality we deliver."
                    className=""
                />

                {/* Filter tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {categories.map((cat) => (
                        <motion.button
                            key={cat.id}
                            onClick={() => setActiveFilter(cat.id)}
                            className={`px-5 py-2.5 rounded-full font-medium transition-all ${activeFilter === cat.id
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none'
                                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                                }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {cat.label}
                        </motion.button>
                    ))}
                </div>

                {/* Projects grid */}
                <motion.div
                    layout
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.slice(0, 6).map((project, index) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className="group relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 dark:border-slate-800"
                            >
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <img
                                        src={project.thumbnail_url}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    {/* Overlay content */}
                                    <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.tech_stack?.slice(0, 3).map((tech, i) => (
                                                <span key={i} className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-md text-white text-xs">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                        {project.project_url && (
                                            <a
                                                href={project.project_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-white hover:text-indigo-400 transition-colors"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                                View Live
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Card footer */}
                                <div className="p-5">
                                    <span className="text-sm text-indigo-600 dark:text-indigo-400 font-medium capitalize">{project.category?.replace('-', ' ')}</span>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                        {project.title}
                                    </h3>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    <Link to={createPageUrl("Portfolio")}>
                        <GradientButton variant="primary">
                            View All Projects
                            <ArrowRight className="w-5 h-5" />
                        </GradientButton>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}