import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { localClient } from '@/api/localClient';
import {
    Globe, ShoppingCart, Smartphone, Search, PenTool,
    Server, ArrowRight, Check, Code2, Palette, Gauge,
    Shield, HeartHandshake, Clock, Rocket, Sparkles, Eye
} from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import GlassCard from '../components/ui/GlassCard';
import GradientButton from '../components/ui/GradientButton';
import PageHero from '../components/ui/PageHero';

const iconMap = {
    Globe, ShoppingCart, Smartphone, Search, PenTool, Server, Code2, Palette, Gauge, Shield, HeartHandshake, Clock
};

const defaultServices = [
    {
        id: 1,
        title: "Custom Website Development",
        description: "Tailored websites built from scratch to match your unique business needs and brand identity. We create pixel-perfect designs that convert visitors into customers.",
        icon: "Globe",
        price_starting: 9999,
        features: ["Custom Design", "Responsive Layout", "SEO Optimized", "Fast Loading", "Cross-browser Compatible"]
    },
    {
        id: 2,
        title: "E-Commerce Solutions",
        description: "Complete online stores with secure payment integration, inventory management, order tracking, and everything you need to sell online successfully.",
        icon: "ShoppingCart",
        price_starting: 14999,
        features: ["Payment Gateway", "Product Management", "Order Tracking", "Inventory System", "Customer Dashboard"]
    },
    {
        id: 3,
        title: "Mobile-First Design",
        description: "Responsive designs that look stunning and perform perfectly on all devices. Your website will provide an exceptional experience on mobile, tablet, and desktop.",
        icon: "Smartphone",
        price_starting: 4999,
        features: ["Touch Optimized", "Fast Mobile Load", "Adaptive Images", "Mobile Navigation", "PWA Ready"]
    },
    {
        id: 4,
        title: "SEO Optimization",
        description: "Boost your visibility with search engine optimization that drives organic traffic. We implement proven strategies to help you rank higher on Google.",
        icon: "Search",
        price_starting: 2999,
        features: ["Keyword Research", "On-Page SEO", "Technical SEO", "Content Strategy", "Performance Reports"]
    },
    {
        id: 5,
        title: "UI/UX Design",
        description: "Beautiful, intuitive interfaces designed to convert visitors into customers. We focus on user experience to maximize engagement and conversions.",
        icon: "PenTool",
        price_starting: 7999,
        features: ["User Research", "Wireframing", "Prototyping", "Visual Design", "Usability Testing"]
    },
    {
        id: 6,
        title: "Web Application Development",
        description: "Powerful web apps with custom functionality to automate and scale your business. From CRM to custom dashboards, we build what you need.",
        icon: "Server",
        price_starting: 24999,
        features: ["Custom Functionality", "Database Design", "API Integration", "Admin Panels", "Scalable Architecture"]
    }
];

const processSteps = [
    { step: 1, title: "Discovery", description: "We understand your business, goals, and target audience" },
    { step: 2, title: "Planning", description: "Create wireframes and design strategy for your project" },
    { step: 3, title: "Design", description: "Craft beautiful, user-friendly interfaces" },
    { step: 4, title: "Development", description: "Build your website with clean, efficient code" },
    { step: 5, title: "Testing", description: "Rigorous testing across devices and browsers" },
    { step: 6, title: "Launch", description: "Deploy your website and provide ongoing support" }
];

const whyChooseUs = [
    { icon: Shield, title: "Quality Assured", description: "Every project goes through rigorous testing" },
    { icon: HeartHandshake, title: "Client First", description: "Your satisfaction is our top priority" },
    { icon: Clock, title: "On-Time Delivery", description: "We respect deadlines and deliver on time" },
    { icon: Gauge, title: "Performance Focused", description: "Fast, optimized websites that rank well" }
];

export default function Services() {
    const { data: services } = useQuery({
        queryKey: ['services'],
        queryFn: () => localClient.get('/services'),
        initialData: []
    });

    const displayServices = services && services.length > 0
        ? services.filter(s => s.is_active !== false)
        : defaultServices;

    const generateSlug = (title) => title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || '';

    return (
        <div>
            <PageHero
                title="Our Premium Services"
                subtitle="Starting at ₹4,999"
                badge="Premium Web Development Agency"
                badgeIcon={Rocket}
                primaryBtnText="Get Free Quote"
                primaryBtnLink={createPageUrl("Contact")}
                secondaryBtnText="View Our Work"
                secondaryBtnLink={createPageUrl("Portfolio")}
                showStats={true}
                floatingIcons={[
                    { icon: Code2, className: "top-20 left-[10%] text-blue-400", delay: 0.2 },
                    { icon: Globe, className: "top-40 right-[15%] text-purple-400", delay: 0.4 },
                    { icon: Smartphone, className: "bottom-20 left-[20%] text-indigo-400", delay: 0.6 },
                    { icon: Sparkles, className: "top-32 right-[5%] text-amber-400", delay: 0.8 }
                ]}
            />

            {/* Services Grid */}
            < section className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300" >
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {displayServices.map((service, index) => {
                            const IconComponent = iconMap[service.icon] || Globe;

                            return (
                                <motion.div
                                    key={service.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <GlassCard className="h-full p-8 bg-white dark:bg-slate-900 hover:bg-white dark:hover:bg-slate-800 transition-colors border border-slate-100 dark:border-slate-800" glowColor="rgba(99, 102, 241, 0.15)">
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-6">
                                            <IconComponent className="w-8 h-8 text-white" />
                                        </div>

                                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{service.title}</h3>
                                        <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">{service.description}</p>

                                        {service.features && (
                                            <ul className="space-y-2 mb-6">
                                                {service.features.slice(0, 5).map((feature, i) => (
                                                    <li key={i} className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                                                        <span className="text-sm">{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                                            <div>
                                                <span className="text-sm text-slate-500 dark:text-slate-500">Starting from</span>
                                                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">₹{service.price_starting?.toLocaleString('en-IN')}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <Link to={`/ServiceDetail?slug=${service.slug || generateSlug(service.title)}`}>
                                                    <GradientButton variant="outline" size="sm">
                                                        <Eye className="w-4 h-4" />
                                                        View More
                                                    </GradientButton>
                                                </Link>
                                                <Link to={createPageUrl("Contact") + `?service=${service.title}`}>
                                                    <GradientButton variant="primary" size="sm">
                                                        Get Quote
                                                    </GradientButton>
                                                </Link>
                                            </div>
                                        </div>
                                    </GlassCard>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section >

            {/* Process Section */}
            < section className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300" >
                <div className="container mx-auto px-4">
                    <SectionHeading
                        badge="Our Process"
                        title="How We Work"
                        subtitle="A streamlined process that ensures quality delivery every time."
                        className=""
                    />

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {processSteps.map((step, index) => (
                            <motion.div
                                key={step.step}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative p-6 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 group hover:shadow-lg transition-shadow"
                            >
                                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                    {step.step}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-4 mb-2">{step.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section >

            {/* Why Choose Us */}
            < section className="py-24 bg-gradient-to-br from-indigo-600 to-purple-700" >
                <div className="container mx-auto px-4">
                    <SectionHeading
                        badge="Why TechFreak"
                        title="Why Choose Us"
                        subtitle="We're committed to delivering excellence in every project."
                        light
                        className=""
                    />

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {whyChooseUs.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
                            >
                                <div className="w-14 h-14 mx-auto mb-4 bg-white/20 rounded-xl flex items-center justify-center">
                                    <item.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-white/70 text-sm">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section >

            {/* CTA */}
            < section className="py-20 bg-white dark:bg-slate-950 transition-colors duration-300" >
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                            Ready to Start Your Project?
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-xl mx-auto">
                            Get a free consultation and quote. No commitment required.
                        </p>
                        <Link to={createPageUrl("Contact")}>
                            <GradientButton variant="primary" size="lg">
                                Get Free Quote
                                <ArrowRight className="w-5 h-5" />
                            </GradientButton>
                        </Link>
                    </motion.div>
                </div>
            </section >
        </div >
    );
}