import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { createPageUrl } from '@/utils';
import { cn } from '@/lib/utils';
import FloatingIcon from './FloatingIcon';
import GradientButton from './GradientButton';

export default function PageHero({
    title,
    subtitle,
    badge,
    badgeIcon: BadgeIcon,
    floatingIcons = [],
    primaryBtnText,
    primaryBtnLink,
    secondaryBtnText,
    secondaryBtnLink,
    showStats = false,
    backgroundImage = null,
    className = ""
}) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const spotlightX = useSpring(mouseX, springConfig);
    const spotlightY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <section className={cn(
            "relative pt-32 pb-20 md:pt-40 md:pb-32 -mt-24 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 group",
            showStats && "min-h-[85vh] flex items-center",
            className
        )}>
            {/* Spotlight effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px z-30 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(600px circle at ${spotlightX}px ${spotlightY}px, rgba(99, 102, 241, 0.15), transparent 80%)`,
                }}
            />

            {/* Mouse following glow */}
            <motion.div
                className="pointer-events-none absolute inset-0 z-0 bg-blue-500/5 blur-[120px]"
                style={{
                    left: spotlightX,
                    top: spotlightY,
                    width: '400px',
                    height: '400px',
                    transform: 'translate(-50%, -50%)',
                }}
            />
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                {backgroundImage ? (
                    <>
                        <img
                            src={backgroundImage}
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover opacity-30"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-transparent to-slate-950" />
                    </>
                ) : (
                    <>
                        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
                        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
                    </>
                )}

                {/* Grid pattern with animation */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"
                />
            </div>

            {/* Floating icons */}
            {floatingIcons.map((item, index) => (
                <FloatingIcon
                    key={index}
                    icon={item.icon}
                    className={item.className}
                    delay={item.delay || index * 0.2}
                />
            ))}

            <div className="relative z-10 container mx-auto px-4">
                <div className="max-w-5xl mx-auto text-center">
                    {/* Breadcrumbs */}
                    <motion.nav
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-2 mb-8"
                    >
                        <Link
                            to={createPageUrl('Home')}
                            className="text-white/50 hover:text-white transition-colors flex items-center gap-1 text-sm font-medium"
                        >
                            <Home className="w-4 h-4" />
                            Home
                        </Link>
                        <ChevronRight className="w-4 h-4 text-white/20" />
                        <span className="text-indigo-400 text-sm font-bold tracking-wide uppercase">
                            {title}
                        </span>
                    </motion.nav>

                    {/* Badge */}
                    {badge && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-8"
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-semibold backdrop-blur-sm">
                                {BadgeIcon && <BadgeIcon className="w-4 h-4 text-amber-500" />}
                                {badge}
                            </span>
                        </motion.div>
                    )}

                    {/* Main heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
                    >
                        {title}
                        {subtitle && (
                            <>
                                <br />
                                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                    {subtitle}
                                </span>
                            </>
                        )}
                    </motion.h1>

                    {/* Description text - only if showStats is false, to keep it clean */}
                    {!showStats && (
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed"
                        >
                            Elevate your digital presence with our cutting-edge solutions designed for the modern web.
                        </motion.p>
                    )}

                    {/* CTA Buttons */}
                    {(primaryBtnText || secondaryBtnText) && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-wrap justify-center gap-4 mb-16"
                        >
                            {primaryBtnText && (
                                <Link to={primaryBtnLink || "#"}>
                                    <GradientButton variant="secondary" size="lg" className="rounded-xl">
                                        {primaryBtnText}
                                        <ChevronRight className="w-5 h-5" />
                                    </GradientButton>
                                </Link>
                            )}
                            {secondaryBtnText && (
                                <Link to={secondaryBtnLink || "#"}>
                                    <GradientButton variant="ghost" size="lg" className="rounded-xl">
                                        {secondaryBtnText}
                                    </GradientButton>
                                </Link>
                            )}
                        </motion.div>
                    )}

                    {/* Stats */}
                    {showStats && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-3xl mx-auto border-t border-white/10 pt-16"
                        >
                            {[
                                { value: "150+", label: "Projects Delivered" },
                                { value: "98%", label: "Client Satisfaction" },
                                { value: "2+", label: "Years Experience" },
                                { value: "24/7", label: "Support Available" }
                            ].map((stat, i) => (
                                <div key={i} className="text-center group">
                                    <div className="text-2xl md:text-3xl font-bold text-white mb-1 group-hover:scale-110 transition-transform duration-300">{stat.value}</div>
                                    <div className="text-sm text-white/60">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Bottom transition gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-slate-950 to-transparent pointer-events-none" />
        </section>
    );
}
