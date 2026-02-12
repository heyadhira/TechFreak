import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import {
    Menu, X, Home, Briefcase, FolderOpen,
    FileText, Users, Mail, Phone, ArrowRight
} from 'lucide-react';
import { createPageUrl } from '@/utils';
import { cn } from '@/lib/utils';
import ThemeToggle from './ThemeToggle';
import GradientButton from './GradientButton';

import { navLinks } from '@/constants';

export default function Navbar({ currentPageName }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [hoveredLink, setHoveredLink] = useState(null);
    const location = useLocation();

    const [isVisible, setIsVisible] = useState(true);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious();
        if (latest > previous && latest > 150) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
    });

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    const isHomePage = currentPageName === 'Home';

    return (
        <>
            <motion.header
                className={cn(
                    'fixed top-0 left-0 right-0 z-[100] transition-all duration-500',
                    isScrolled || (!isHomePage && !isMobileMenuOpen)
                        ? 'py-3 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm'
                        : isMobileMenuOpen
                            ? 'py-4 bg-transparent'
                            : 'py-5 bg-transparent'
                )}
                initial={{ y: -100 }}
                animate={{ y: isVisible ? 0 : -100 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link to={createPageUrl('Home')} className="flex items-center gap-3 group relative z-50">
                            <motion.img
                                src="/img/logo.png"
                                alt="TechFreak"
                                className="w-10 h-10 rounded-xl object-cover shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow"
                                initial={{ rotate: -20, scale: 0.8, opacity: 0 }}
                                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                                whileHover={{ rotate: 10, scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            />
                            <span className={cn(
                                "text-2xl font-bold tracking-tight transition-colors duration-300",
                                isScrolled || !isHomePage ? "text-slate-900 dark:text-white" : "text-white"
                            )}>
                                Tech<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">Freak</span>
                            </span>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden lg:flex items-center bg-slate-100/50 dark:bg-slate-800/20 p-1 rounded-2xl border border-slate-200/50 dark:border-slate-700/30">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.page}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                                    className="relative"
                                >
                                    <Link
                                        to={createPageUrl(link.page)}
                                        onMouseEnter={() => setHoveredLink(link.page)}
                                        onMouseLeave={() => setHoveredLink(null)}
                                        className={cn(
                                            'relative px-5 py-2 rounded-xl text-sm font-semibold transition-colors duration-300 block',
                                            currentPageName === link.page
                                                ? 'text-indigo-600 dark:text-indigo-400'
                                                : isScrolled || !isHomePage
                                                    ? 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                                    : 'text-white/80 hover:text-white'
                                        )}
                                    >
                                        {hoveredLink === link.page && (
                                            <motion.div
                                                layoutId="nav-hover"
                                                className="absolute inset-0 bg-white dark:bg-slate-800 shadow-sm rounded-xl z-[-1]"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                                            />
                                        )}
                                        {link.name}
                                        {currentPageName === link.page && (
                                            <motion.div
                                                layoutId="nav-active"
                                                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-indigo-500 rounded-full"
                                                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                                            />
                                        )}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        {/* Actions */}
                        <div className="hidden lg:flex items-center gap-6">
                            <div className="flex items-center gap-1.5 group cursor-pointer">
                                <div className={cn(
                                    "p-1.5 rounded-lg transition-colors group-hover:bg-indigo-500/10",
                                    isScrolled || !isHomePage ? "text-slate-400" : "text-white/40"
                                )}>
                                    <Phone className="w-4.5 h-4.5" />
                                </div>
                                <span className={cn(
                                    "text-sm font-medium transition-colors",
                                    isScrolled || !isHomePage ? "text-slate-600 group-hover:text-indigo-600 dark:text-slate-400 dark:group-hover:text-indigo-400" : "text-white/80 group-hover:text-white"
                                )}>
                                    +91 98765 43210
                                </span>
                            </div>
                            <ThemeToggle variant="icon" />
                            <Link to={createPageUrl('Contact')}>
                                <GradientButton variant="primary" size="sm" className="rounded-xl px-6">
                                    Get Quote
                                    <ArrowRight className="w-4 h-4 ml-1" />
                                </GradientButton>
                            </Link>
                        </div>

                        {/* Mobile Toggle */}
                        <div className="flex items-center gap-4 lg:hidden relative z-50">
                            <ThemeToggle variant="icon" className={cn(
                                isScrolled || !isHomePage ? "text-slate-900" : "text-white"
                            )} />
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className={cn(
                                    "p-2 rounded-xl transition-all duration-300",
                                    isScrolled || !isHomePage
                                        ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
                                        : "bg-white/10 text-white backdrop-blur-md"
                                )}
                            >
                                <AnimatePresence mode="wait">
                                    {isMobileMenuOpen ? (
                                        <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                                            <X className="w-6 h-6" />
                                        </motion.div>
                                    ) : (
                                        <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                                            <Menu className="w-6 h-6" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </button>
                        </div>
                    </div>
                </div>

            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[90] lg:hidden bg-white dark:bg-slate-950 flex flex-col pt-28 px-6 pb-10 overflow-y-auto"
                    >
                        {/* Background Decoration */}
                        <div className="absolute top-20 right-[-10%] w-64 h-64 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute bottom-20 left-[-10%] w-64 h-64 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

                        <nav className="flex-1 flex flex-col gap-2 relative z-10">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.page}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + i * 0.05 }}
                                >
                                    <Link
                                        to={createPageUrl(link.page)}
                                        className={cn(
                                            "flex items-center justify-between p-4 rounded-2xl text-lg font-bold transition-all",
                                            currentPageName === link.page
                                                ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"
                                        )}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={cn(
                                                "p-2 rounded-xl transition-colors",
                                                currentPageName === link.page
                                                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                                                    : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                                            )}>
                                                <link.icon className="w-5 h-5" />
                                            </div>
                                            {link.name}
                                        </div>
                                        <ArrowRight className={cn(
                                            "w-5 h-5 transition-transform",
                                            currentPageName === link.page ? "translate-x-0" : "-translate-x-2 opacity-0"
                                        )} />
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        <motion.div
                            className="mt-10 space-y-6 pt-10 border-t border-slate-100 dark:border-slate-800 relative z-10"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <div className="flex items-center justify-between px-2">
                                <div className="space-y-1">
                                    <p className="text-sm text-slate-500">Need help?</p>
                                    <a href="tel:+919876543210" className="text-lg font-bold text-slate-900 dark:text-white">+91 98765 43210</a>
                                </div>
                                <div className="p-4 bg-slate-100 dark:bg-slate-900 rounded-2xl">
                                    <Phone className="w-6 h-6 text-indigo-500" />
                                </div>
                            </div>
                            <Link to={createPageUrl('Contact')}>
                                <GradientButton variant="primary" size="lg" className="w-full py-6 rounded-2xl text-xl shadow-xl shadow-indigo-500/20">
                                    Get Free Quote
                                </GradientButton>
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
