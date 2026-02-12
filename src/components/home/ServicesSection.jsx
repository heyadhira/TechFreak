import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { localClient } from '@/api/localClient';
import {
    Globe, ShoppingCart, Smartphone, Search, PenTool,
    Server, ArrowRight
} from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import SectionHeading from '../ui/SectionHeading';
import GradientButton from '../ui/GradientButton';

const iconMap = {
    Globe, ShoppingCart, Smartphone, Search, PenTool, Server
};

const defaultServices = [
    {
        id: 1,
        title: "Custom Website Development",
        description: "Tailored websites built from scratch to match your unique business needs and brand identity.",
        icon: "Globe",
        price_starting: 9999
    },
    {
        id: 2,
        title: "E-Commerce Solutions",
        description: "Complete online stores with secure payment integration, inventory management, and more.",
        icon: "ShoppingCart",
        price_starting: 14999
    },
    {
        id: 3,
        title: "Mobile-First Design",
        description: "Responsive designs that look stunning and perform perfectly on all devices.",
        icon: "Smartphone",
        price_starting: 4999
    },
    {
        id: 4,
        title: "SEO Optimization",
        description: "Boost your visibility with search engine optimization that drives organic traffic.",
        icon: "Search",
        price_starting: 2999
    },
    {
        id: 5,
        title: "UI/UX Design",
        description: "Beautiful, intuitive interfaces designed to convert visitors into customers.",
        icon: "PenTool",
        price_starting: 7999
    },
    {
        id: 6,
        title: "Web Application Development",
        description: "Powerful web apps with custom functionality to automate and scale your business.",
        icon: "Server",
        price_starting: 24999
    }
];

export default function ServicesSection() {
    const { data: services } = useQuery({
        queryKey: ['services'],
        queryFn: () => localClient.get('/services'),
        initialData: []
    });

    const displayServices = services && services.length > 0 ? services.filter(s => s.is_active !== false) : defaultServices;

    return (
        <section className="py-24 bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 relative overflow-hidden transition-colors duration-300">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-50/50 to-transparent dark:from-blue-900/20" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-100/30 dark:bg-purple-900/10 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 relative z-10">
                <SectionHeading
                    badge="Our Services"
                    title="What We Build For You"
                    subtitle="From simple landing pages to complex web applications, we deliver excellence at every step."
                    className=""
                />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {displayServices.slice(0, 6).map((service, index) => {
                        const IconComponent = iconMap[service.icon] || Globe;

                        return (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <GlassCard
                                    className="h-full p-6 lg:p-8 bg-white/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-900 transition-colors group border border-slate-100 dark:border-slate-800"
                                    glowColor="rgba(99, 102, 241, 0.15)"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-indigo-200 dark:shadow-none">
                                        <IconComponent className="w-7 h-7 text-white" />
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                        {service.title}
                                    </h3>

                                    <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                                        {service.description}
                                    </p>

                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                                        <span className="text-sm text-slate-500 dark:text-slate-500">Starting from</span>
                                        <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                                            ₹{service.price_starting?.toLocaleString('en-IN')}
                                        </span>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        );
                    })}
                </div>

                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                >
                    <Link to={createPageUrl("Services")}>
                        <GradientButton variant="primary">
                            Explore All Services
                            <ArrowRight className="w-5 h-5" />
                        </GradientButton>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}