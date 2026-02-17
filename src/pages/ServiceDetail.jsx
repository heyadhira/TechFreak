import React from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { localClient } from '@/api/localClient';
import {
    Globe, ShoppingCart, Smartphone, Search, PenTool,
    Server, ArrowRight, Check, Code2, Palette, Gauge,
    Shield, HeartHandshake, Clock, Rocket, Sparkles,
    ArrowLeft, Star, Zap, Users, MessageCircle
} from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import GlassCard from '../components/ui/GlassCard';
import GradientButton from '../components/ui/GradientButton';
import SEO from '../components/SEO';
import StructuredData, { getServiceData, getBreadcrumbData } from '../components/StructuredData';

const iconMap = {
    Globe, ShoppingCart, Smartphone, Search, PenTool, Server,
    Code2, Palette, Gauge, Shield, HeartHandshake, Clock,
    Rocket, Sparkles, Star, Zap, Users
};

function generateSlug(title) {
    return title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || '';
}

export default function ServiceDetail() {
    const [searchParams] = useSearchParams();
    const slug = searchParams.get('slug');

    // Fetch all services
    const { data: allServices } = useQuery({
        queryKey: ['services'],
        queryFn: () => localClient.get('/services'),
        initialData: []
    });

    // Find the current service by slug
    const service = allServices?.find(s => {
        const serviceSlug = s.slug || generateSlug(s.title);
        return serviceSlug === slug;
    });

    // Related services (other active services)
    const relatedServices = allServices
        ?.filter(s => s.is_active !== false && s.id !== service?.id)
        ?.slice(0, 3) || [];

    const isLoading = !allServices || allServices.length === 0;

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
                <div className="w-8 h-8 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!service) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Service Not Found</h1>
                    <p className="text-slate-600 dark:text-slate-400 mb-8">The service you're looking for doesn't exist.</p>
                    <Link to={createPageUrl('Services')}>
                        <GradientButton variant="primary">
                            <ArrowLeft className="w-5 h-5" />
                            View All Services
                        </GradientButton>
                    </Link>
                </motion.div>
            </div>
        );
    }

    const IconComponent = iconMap[service.icon] || Globe;
    const features = service.features || [];

    return (
        <div>
            {/* Dynamic SEO for this specific service */}
            <SEO
                pageName="ServiceDetail"
                title={`${service.title} - Professional Service | TechFreak`}
                description={service.description}
                keywords={`${service.title}, web development, TechFreak, ${(service.features || []).slice(0, 3).join(', ')}`}
            />
            <StructuredData data={getServiceData(service)} />
            <StructuredData data={getBreadcrumbData([
                { name: 'Home', url: 'https://techfreak.in/' },
                { name: 'Services', url: 'https://techfreak.in/Services' },
                { name: service.title, url: `https://techfreak.in/ServiceDetail?slug=${slug}` }
            ])} />

            {/* Hero Section */}
            <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950">
                {/* Background effects */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-[10%] w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-[15%] w-96 h-96 bg-purple-600/15 rounded-full blur-3xl" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-indigo-500/10 to-transparent rounded-full" />
                    {/* Grid pattern */}
                    <div className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
                            backgroundSize: '50px 50px'
                        }}
                    />
                </div>

                <div className="container mx-auto px-4 relative z-10 py-20">
                    {/* Breadcrumb */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-sm text-white/60 mb-8"
                    >
                        <Link to={createPageUrl('Home')} className="hover:text-white transition-colors">Home</Link>
                        <span>/</span>
                        <Link to={createPageUrl('Services')} className="hover:text-white transition-colors">Services</Link>
                        <span>/</span>
                        <span className="text-indigo-400">{service.title}</span>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white/90 text-sm font-medium mb-6 backdrop-blur-sm">
                                <IconComponent className="w-4 h-4 text-indigo-400" />
                                Premium Service
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                                {service.title}
                            </h1>

                            <p className="text-lg text-white/70 mb-8 leading-relaxed max-w-xl">
                                {service.description}
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Link to={createPageUrl("Contact") + `?service=${service.title}`}>
                                    <GradientButton variant="primary" size="lg" className="shadow-xl shadow-indigo-500/20">
                                        Get Free Quote
                                        <ArrowRight className="w-5 h-5" />
                                    </GradientButton>
                                </Link>
                                <Link to={createPageUrl("Contact")}>
                                    <GradientButton variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                                        <MessageCircle className="w-5 h-5" />
                                        Contact Us
                                    </GradientButton>
                                </Link>
                            </div>

                            {service.price_starting && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="mt-8 inline-flex items-center gap-3 px-5 py-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm"
                                >
                                    <span className="text-white/60 text-sm">Starting from</span>
                                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                                        ₹{service.price_starting?.toLocaleString('en-IN')}
                                    </span>
                                </motion.div>
                            )}
                        </motion.div>

                        {/* Right side - Icon showcase */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="hidden lg:flex items-center justify-center"
                        >
                            {service.image_url ? (
                                <div className="relative w-full max-w-md">
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 to-purple-600/30 rounded-3xl blur-xl" />
                                    <img
                                        src={service.image_url}
                                        alt={service.title}
                                        className="relative rounded-3xl shadow-2xl w-full object-cover aspect-[4/3]"
                                    />
                                </div>
                            ) : (
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 rounded-full blur-3xl scale-110" />
                                    <div className="relative w-48 h-48 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-indigo-500/30">
                                        <IconComponent className="w-24 h-24 text-white" />
                                    </div>
                                    {/* Floating decorations */}
                                    <motion.div
                                        animate={{ y: [-10, 10, -10] }}
                                        transition={{ repeat: Infinity, duration: 4 }}
                                        className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg"
                                    >
                                        <Star className="w-8 h-8 text-white" />
                                    </motion.div>
                                    <motion.div
                                        animate={{ y: [10, -10, 10] }}
                                        transition={{ repeat: Infinity, duration: 5 }}
                                        className="absolute -bottom-4 -left-8 w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg"
                                    >
                                        <Check className="w-7 h-7 text-white" />
                                    </motion.div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            {features.length > 0 && (
                <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
                    <div className="container mx-auto px-4">
                        <SectionHeading
                            badge="What's Included"
                            title="Features & Benefits"
                            subtitle={`Everything included in our ${service.title} service.`}
                            className=""
                        />

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.08 }}
                                    className="flex items-start gap-4 p-6 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 rounded-2xl border border-slate-100 dark:border-slate-800 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 group"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                        <Check className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{feature}</h3>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Long Description Section */}
            {service.long_description && (
                <section className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <SectionHeading
                                badge="About This Service"
                                title="Detailed Overview"
                                subtitle=""
                                className=""
                            />
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed"
                            >
                                {service.long_description.split('\n').map((paragraph, i) => (
                                    <p key={i} className="mb-4">{paragraph}</p>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </section>
            )}

            {/* Why Choose This Service */}
            <section className="py-24 bg-gradient-to-br from-indigo-600 to-purple-700">
                <div className="container mx-auto px-4">
                    <SectionHeading
                        badge="Why Choose Us"
                        title={`Why Our ${service.title}?`}
                        subtitle="We deliver excellence with every project."
                        light
                        className=""
                    />

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Shield, title: "Quality Assured", description: "Rigorous testing on every deliverable" },
                            { icon: HeartHandshake, title: "Client First", description: "Your satisfaction is our top priority" },
                            { icon: Clock, title: "On-Time Delivery", description: "We respect deadlines, always" },
                            { icon: Gauge, title: "Performance Focused", description: "Optimized for speed and results" }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/15 transition-colors"
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
            </section>

            {/* Related Services */}
            {relatedServices.length > 0 && (
                <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
                    <div className="container mx-auto px-4">
                        <SectionHeading
                            badge="Explore More"
                            title="Other Services"
                            subtitle="Discover more ways we can help your business grow."
                            className=""
                        />

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                                        <GlassCard className="h-full p-8 bg-white dark:bg-slate-900 hover:bg-white dark:hover:bg-slate-800 transition-colors border border-slate-100 dark:border-slate-800" glowColor="rgba(99, 102, 241, 0.15)">
                                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-6">
                                                <RelIcon className="w-7 h-7 text-white" />
                                            </div>
                                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{relService.title}</h3>
                                            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed line-clamp-3">{relService.description}</p>
                                            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                                                <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                                                    ₹{relService.price_starting?.toLocaleString('en-IN')}
                                                </span>
                                                <Link to={`/ServiceDetail?slug=${relSlug}`}>
                                                    <GradientButton variant="primary" size="sm">
                                                        View More
                                                        <ArrowRight className="w-4 h-4" />
                                                    </GradientButton>
                                                </Link>
                                            </div>
                                        </GlassCard>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-20 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                            Ready to Get Started?
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-xl mx-auto">
                            Get a free consultation and personalised quote for {service.title}. No commitment required.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link to={createPageUrl("Contact") + `?service=${service.title}`}>
                                <GradientButton variant="primary" size="lg">
                                    Get Free Quote
                                    <ArrowRight className="w-5 h-5" />
                                </GradientButton>
                            </Link>
                            <Link to={createPageUrl('Services')}>
                                <GradientButton variant="outline" size="lg">
                                    <ArrowLeft className="w-5 h-5" />
                                    All Services
                                </GradientButton>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
