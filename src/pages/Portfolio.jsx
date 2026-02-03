import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { ExternalLink, ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import GradientButton from '../components/ui/GradientButton';

const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'e-commerce', label: 'E-Commerce' },
    { id: 'corporate', label: 'Corporate' },
    { id: 'startup', label: 'Startup' },
    { id: 'educational', label: 'Educational' },
    { id: 'healthcare', label: 'Healthcare' },
    { id: 'portfolio', label: 'Portfolio' }
];

const defaultProjects = [
    {
        id: 1,
        title: "ShopEase E-Commerce",
        description: "Complete e-commerce solution with payment gateway, inventory management, and admin dashboard.",
        category: "e-commerce",
        client_name: "ShopEase Pvt Ltd",
        thumbnail_url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
        images: ["https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop"],
        tech_stack: ["React", "Node.js", "MongoDB", "Stripe"],
        project_url: "#"
    },
    {
        id: 2,
        title: "TechCorp Corporate Website",
        description: "Modern corporate website with animated sections, team profiles, and contact integration.",
        category: "corporate",
        client_name: "TechCorp Solutions",
        thumbnail_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        images: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"],
        tech_stack: ["Next.js", "Tailwind CSS", "Framer Motion"],
        project_url: "#"
    },
    {
        id: 3,
        title: "EduLearn Platform",
        description: "Online learning platform with course management, video streaming, and progress tracking.",
        category: "educational",
        client_name: "EduLearn Academy",
        thumbnail_url: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop",
        images: ["https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop"],
        tech_stack: ["React", "Firebase", "Vimeo API"],
        project_url: "#"
    },
    {
        id: 4,
        title: "StartupX Landing Page",
        description: "High-converting landing page with stunning animations and lead capture forms.",
        category: "startup",
        client_name: "StartupX",
        thumbnail_url: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop",
        images: ["https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop"],
        tech_stack: ["React", "Framer Motion", "Tailwind"],
        project_url: "#"
    },
    {
        id: 5,
        title: "Fashion Store",
        description: "Elegant e-commerce store for fashion brand with lookbook and size guide features.",
        category: "e-commerce",
        client_name: "Style Hub",
        thumbnail_url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
        images: ["https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop"],
        tech_stack: ["Shopify", "Liquid", "JavaScript"],
        project_url: "#"
    },
    {
        id: 6,
        title: "HealthCare Portal",
        description: "Patient management system with appointment booking and medical records.",
        category: "healthcare",
        client_name: "MediCare Clinic",
        thumbnail_url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
        images: ["https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop"],
        tech_stack: ["React", "Node.js", "PostgreSQL"],
        project_url: "#"
    },
    {
        id: 7,
        title: "Finance Dashboard",
        description: "Interactive dashboard with real-time data visualization and reporting.",
        category: "corporate",
        client_name: "FinTrack Inc",
        thumbnail_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        images: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"],
        tech_stack: ["React", "D3.js", "Express"],
        project_url: "#"
    },
    {
        id: 8,
        title: "Creative Portfolio",
        description: "Stunning portfolio website for creative agency with 3D animations.",
        category: "portfolio",
        client_name: "Creative Minds",
        thumbnail_url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
        images: ["https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop"],
        tech_stack: ["React", "Three.js", "GSAP"],
        project_url: "#"
    }
];

export default function Portfolio() {
    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedProject, setSelectedProject] = useState(null);

    const { data: projects } = useQuery({
        queryKey: ['portfolio'],
        queryFn: () => base44.entities.Portfolio.list(),
        initialData: []
    });

    const displayProjects = projects.length > 0 ? projects.filter(p => p.is_active !== false) : defaultProjects;

    const filteredProjects = activeFilter === 'all'
        ? displayProjects
        : displayProjects.filter(p => p.category === activeFilter);

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.span
                        className="inline-block px-4 py-2 bg-white/10 border border-white/20 text-white/90 rounded-full text-sm font-medium mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Our Work
                    </motion.span>
                    <motion.h1
                        className="text-4xl md:text-6xl font-bold text-white mb-6"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        Portfolio That
                        <br />
                        <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Speaks For Itself</span>
                    </motion.h1>
                    <motion.p
                        className="text-lg text-white/70 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Explore our recent projects and see the quality we deliver to businesses across India.
                    </motion.p>
                </div>
            </section>

            {/* Portfolio Grid */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4">
                    {/* Filter tabs */}
                    <div className="flex flex-wrap justify-center gap-2 mb-12">
                        {categories.map((cat) => (
                            <motion.button
                                key={cat.id}
                                onClick={() => setActiveFilter(cat.id)}
                                className={`px-5 py-2.5 rounded-full font-medium transition-all ${activeFilter === cat.id
                                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
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
                                    className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
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
                                        <span className="text-sm text-indigo-600 font-medium capitalize">{project.category?.replace('-', ' ')}</span>
                                        <h3 className="text-lg font-bold text-slate-900 mt-1 group-hover:text-indigo-600 transition-colors">
                                            {project.title}
                                        </h3>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* Project Modal */}
            <AnimatePresence>
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
                            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
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
                                    className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-6 md:p-8">
                                <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium capitalize mb-4">
                                    {selectedProject.category?.replace('-', ' ')}
                                </span>

                                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                                    {selectedProject.title}
                                </h2>

                                {selectedProject.client_name && (
                                    <p className="text-slate-500 mb-4">Client: {selectedProject.client_name}</p>
                                )}

                                <p className="text-slate-600 mb-6 leading-relaxed">
                                    {selectedProject.description}
                                </p>

                                {selectedProject.tech_stack && (
                                    <div className="mb-6">
                                        <h4 className="font-semibold text-slate-900 mb-2">Technologies Used</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProject.tech_stack.map((tech, i) => (
                                                <span key={i} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm">
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
                )}
            </AnimatePresence>

            {/* CTA */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            Want Something Similar?
                        </h2>
                        <p className="text-slate-600 mb-8 max-w-xl mx-auto">
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
            </section>
        </div>
    );
}