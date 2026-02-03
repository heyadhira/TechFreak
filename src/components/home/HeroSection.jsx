import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowRight, Code2, Globe, Zap, Sparkles, Rocket } from 'lucide-react';
import GradientButton from '../ui/GradientButton';
import FloatingIcon from '../ui/FloatingIcon';

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl" />

                {/* Grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
            </div>

            {/* Floating icons */}
            <FloatingIcon icon={Code2} className="top-32 left-[10%] text-blue-400" delay={0.2} />
            <FloatingIcon icon={Globe} className="top-48 right-[15%] text-purple-400" delay={0.4} />
            <FloatingIcon icon={Zap} className="bottom-32 left-[20%] text-amber-400" delay={0.6} />
            <FloatingIcon icon={Sparkles} className="top-60 left-[70%] text-pink-400" delay={0.8} />
            <FloatingIcon icon={Rocket} className="bottom-48 right-[10%] text-green-400" delay={1} />

            <div className="relative z-10 container mx-auto px-4 py-20">
                <div className="max-w-5xl mx-auto text-center">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-6"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10 text-white/90 text-sm font-medium backdrop-blur-sm">
                            <Sparkles className="w-4 h-4 text-amber-400" />
                            Premium Web Development Agency
                        </span>
                    </motion.div>

                    {/* Main heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
                    >
                        Build Your Dream Website
                        <br />
                        <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                            Starting at ₹4,999
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed"
                    >
                        Transform your business with stunning, high-performance websites.
                        Best quality at the best price — trusted by 500+ Indian businesses.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-wrap justify-center gap-4 mb-12"
                    >
                        <Link to={createPageUrl("Contact")}>
                            <GradientButton variant="secondary" size="lg">
                                Get Free Quote
                                <ArrowRight className="w-5 h-5" />
                            </GradientButton>
                        </Link>
                        <Link to={createPageUrl("Portfolio")}>
                            <GradientButton variant="ghost" size="lg">
                                View Our Work
                            </GradientButton>
                        </Link>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-3xl mx-auto"
                    >
                        {[
                            { value: "500+", label: "Projects Delivered" },
                            { value: "98%", label: "Client Satisfaction" },
                            { value: "5+", label: "Years Experience" },
                            { value: "24/7", label: "Support Available" }
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                                <div className="text-sm text-white/60">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Bottom gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
        </section>
    );
}