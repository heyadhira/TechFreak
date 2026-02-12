import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { localClient } from '@/api/localClient';
import GradientButton from '../components/ui/GradientButton';
import PageHero from '../components/ui/PageHero';
import { Palette, ExternalLink, ArrowRight, X, Layout, Briefcase, MousePointer2 } from 'lucide-react';

const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'e-commerce', label: 'E-Commerce' },
    { id: 'corporate', label: 'Corporate' },
    { id: 'startup', label: 'Startup' },
    { id: 'educational', label: 'Educational' },
    { id: 'healthcare', label: 'Healthcare' },
    { id: 'portfolio', label: 'Portfolio' }
];



export default function Portfolio() {
    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedProject, setSelectedProject] = useState(null);

    const { data: projects } = useQuery({
        queryKey: ['portfolio'],
        queryFn: () => localClient.get('/portfolio'),
        initialData: []
    });

    const displayProjects = projects;

    const filteredProjects = activeFilter === 'all'
        ? displayProjects
        : displayProjects.filter(p => p.category === activeFilter);

    return (
        <div>
            <PageHero
                title="Our Success Stories"
                subtitle="Starting at ₹4,999"
                badge="Premium Portfolio"
                badgeIcon={Briefcase}
                primaryBtnText="Start Your Project"
                primaryBtnLink={createPageUrl("Contact")}
                secondaryBtnText="Explore Services"
                secondaryBtnLink={createPageUrl("Services")}
                showStats={true}
                floatingIcons={[
                    { icon: Palette, className: "top-20 left-[10%] text-pink-400", delay: 0.2 },
                    { icon: Layout, className: "top-40 right-[15%] text-blue-400", delay: 0.4 },
                    { icon: MousePointer2, className: "bottom-20 left-[20%] text-purple-400", delay: 0.6 },
                    { icon: ExternalLink, className: "top-32 right-[5%] text-indigo-400", delay: 0.8 }
                ]}
            />

            {/* Portfolio Grid */}
            < section className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300" >
                <div className="container mx-auto px-4">
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
                    <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    onClick={() => setSelectedProject(project)}
                                    className="group relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-slate-100 dark:border-slate-800"
                                >
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <img
                                            src={project.thumbnail_url}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        <div className="absolute inset-0 flex flex-col justify-end p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                            <div className="flex flex-wrap gap-2">
                                                {project.tech_stack?.slice(0, 3).map((tech, i) => (
                                                    <span key={i} className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-md text-white text-xs">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

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
                </div>
            </section >

            {/* Project Modal */}
            < AnimatePresence >
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-800"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative">
                                <img
                                    src={selectedProject.thumbnail_url}
                                    alt={selectedProject.title}
                                    className="w-full h-64 md:h-80 object-cover"
                                />
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-slate-800/90 rounded-full hover:bg-white dark:hover:bg-slate-700 transition-colors"
                                >
                                    <X className="w-5 h-5 dark:text-white" />
                                </button>
                            </div>

                            <div className="p-6 md:p-8">
                                <span className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded-full text-sm font-medium capitalize mb-4">
                                    {selectedProject.category?.replace('-', ' ')}
                                </span>

                                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                                    {selectedProject.title}
                                </h2>

                                {selectedProject.client_name && (
                                    <p className="text-slate-500 dark:text-slate-400 mb-4">Client: {selectedProject.client_name}</p>
                                )}

                                <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                                    {selectedProject.description}
                                </p>

                                {selectedProject.tech_stack && (
                                    <div className="mb-6">
                                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Technologies Used</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProject.tech_stack.map((tech, i) => (
                                                <span key={i} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="flex gap-4">
                                    {selectedProject.project_url && selectedProject.project_url !== '#' && (
                                        <a href={selectedProject.project_url} target="_blank" rel="noopener noreferrer">
                                            <GradientButton variant="primary">
                                                <ExternalLink className="w-4 h-4" />
                                                View Live Site
                                            </GradientButton>
                                        </a>
                                    )}
                                    <Link to={createPageUrl("Contact") + `?project=${selectedProject.title}`}>
                                        <GradientButton variant="outline">
                                            Get Similar Project
                                        </GradientButton>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )
                }
            </AnimatePresence >

            {/* CTA */}
            < section className="py-20 bg-white dark:bg-slate-950 transition-colors duration-300" >
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                            Want Something Similar?
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-xl mx-auto">
                            Let's discuss your project and create something amazing together.
                        </p>
                        <Link to={createPageUrl("Contact")}>
                            <GradientButton variant="primary" size="lg">
                                Start Your Project
                                <ArrowRight className="w-5 h-5" />
                            </GradientButton>
                        </Link>
                    </motion.div>
                </div>
            </section >
        </div >
    );
}