import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import {
    Menu, X, Home, Briefcase, FolderOpen,
    FileText, Users, Mail, Phone, ArrowRight,
    Globe, ShoppingCart, Smartphone, Search, PenTool,
    Server, Code2, Palette, Gauge, ChevronDown, ChevronRight as ChevronRightIcon
} from 'lucide-react';
import { createPageUrl } from '@/utils';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { localClient } from '@/api/localClient';
import ThemeToggle from './ThemeToggle';
import GradientButton from './GradientButton';
import { useSiteSettings } from '@/hooks/useSiteSettings';

import { navLinks } from '@/constants';

const iconMap = {
    Globe, ShoppingCart, Smartphone, Search, PenTool, Server, Code2, Palette, Gauge
};

function generateSlug(title) {
    return title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || '';
}

export default function Navbar({ currentPageName }) {
    const { settings } = useSiteSettings();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [hoveredLink, setHoveredLink] = useState(null);
    const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
    const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
    const location = useLocation();

    const [isVisible, setIsVisible] = useState(true);
    const { scrollY } = useScroll();

    // Fetch services for dropdown
    const { data: services } = useQuery({
        queryKey: ['services'],
        queryFn: () => localClient.get('/services'),
        initialData: []
    });

    const activeServices = services?.filter(s => s.is_active !== false) || [];

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
        setIsMobileServicesOpen(false);
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

    // Close services dropdown when mouse leaves
    let dropdownTimeout = null;
    const handleServicesMouseEnter = () => {
        clearTimeout(dropdownTimeout);
        setIsServicesDropdownOpen(true);
        setHoveredLink('Services');
    };
    const handleServicesMouseLeave = () => {
        dropdownTimeout = setTimeout(() => {
            setIsServicesDropdownOpen(false);
        }, 200);
    };

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
                            <span className="text-2xl font-bold tracking-tight">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">Tech</span><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500">Freak</span>
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
                                    onMouseEnter={link.page === 'Services' ? handleServicesMouseEnter : () => setHoveredLink(link.page)}
                                    onMouseLeave={link.page === 'Services' ? handleServicesMouseLeave : () => setHoveredLink(null)}
                                >
                                    <Link
                                        to={createPageUrl(link.page)}
                                        className={cn(
                                            'relative px-5 py-2 rounded-xl text-sm font-semibold transition-colors duration-300 block flex items-center gap-1',
                                            currentPageName === link.page || (link.page === 'Services' && currentPageName === 'ServiceDetail')
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
                                        {link.page === 'Services' && (
                                            <ChevronDown className={cn(
                                                "w-3.5 h-3.5 transition-transform duration-200",
                                                isServicesDropdownOpen && "rotate-180"
                                            )} />
                                        )}
                                        {(currentPageName === link.page || (link.page === 'Services' && currentPageName === 'ServiceDetail')) && (
                                            <motion.div
                                                layoutId="nav-active"
                                                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-indigo-500 rounded-full"
                                                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                                            />
                                        )}
                                    </Link>

                                    {/* Services Dropdown */}
                                    {link.page === 'Services' && (
                                        <AnimatePresence>
                                            {isServicesDropdownOpen && activeServices.length > 0 && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                                    className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-100 dark:border-slate-800 overflow-hidden"
                                                    onMouseEnter={handleServicesMouseEnter}
                                                    onMouseLeave={handleServicesMouseLeave}
                                                >
                                                    <div className="p-2">
                                                        {activeServices.map((service) => {
                                                            const IconComp = iconMap[service.icon] || Globe;
                                                            const serviceSlug = service.slug || generateSlug(service.title);
                                                            return (
                                                                <Link
                                                                    key={service.id}
                                                                    to={`/ServiceDetail?slug=${serviceSlug}`}
                                                                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                                                                >
                                                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                                                        <IconComp className="w-5 h-5 text-white" />
                                                                    </div>
                                                                    <div className="flex-1 min-w-0">
                                                                        <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{service.title}</p>
                                                                        {service.price_starting && (
                                                                            <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                                                                                From ₹{service.price_starting?.toLocaleString('en-IN')}
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                                                                </Link>
                                                            );
                                                        })}
                                                    </div>
                                                    <div className="p-2 border-t border-slate-100 dark:border-slate-800">
                                                        <Link
                                                            to={createPageUrl('Services')}
                                                            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-500/10 dark:to-purple-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-semibold hover:from-indigo-100 hover:to-purple-100 dark:hover:from-indigo-500/20 dark:hover:to-purple-500/20 transition-colors"
                                                        >
                                                            View All Services
                                                            <ArrowRight className="w-4 h-4" />
                                                        </Link>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    )}
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
                                    {settings.phone}
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
                                    {link.page === 'Services' ? (
                                        <>
                                            <button
                                                onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                                                className={cn(
                                                    "w-full flex items-center justify-between p-4 rounded-2xl text-lg font-bold transition-all",
                                                    currentPageName === 'Services' || currentPageName === 'ServiceDetail'
                                                        ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                                                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"
                                                )}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={cn(
                                                        "p-2 rounded-xl transition-colors",
                                                        currentPageName === 'Services' || currentPageName === 'ServiceDetail'
                                                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                                                            : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                                                    )}>
                                                        <link.icon className="w-5 h-5" />
                                                    </div>
                                                    {link.name}
                                                </div>
                                                <ChevronDown className={cn(
                                                    "w-5 h-5 transition-transform duration-200",
                                                    isMobileServicesOpen && "rotate-180"
                                                )} />
                                            </button>

                                            {/* Mobile Services Sub-items */}
                                            <AnimatePresence>
                                                {isMobileServicesOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="pl-6 pr-2 py-2 space-y-1">
                                                            {/* All Services link */}
                                                            <Link
                                                                to={createPageUrl('Services')}
                                                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors"
                                                            >
                                                                <Briefcase className="w-4 h-4" />
                                                                All Services
                                                            </Link>
                                                            {activeServices.map((service) => {
                                                                const IconComp = iconMap[service.icon] || Globe;
                                                                const serviceSlug = service.slug || generateSlug(service.title);
                                                                return (
                                                                    <Link
                                                                        key={service.id}
                                                                        to={`/ServiceDetail?slug=${serviceSlug}`}
                                                                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                                                                    >
                                                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                                                                            <IconComp className="w-4 h-4 text-white" />
                                                                        </div>
                                                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{service.title}</span>
                                                                        <ChevronRightIcon className="w-4 h-4 text-slate-400 ml-auto" />
                                                                    </Link>
                                                                );
                                                            })}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </>
                                    ) : (
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
                                    )}
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
                                    <a href={`tel:${settings.phone?.replace(/[^0-9+]/g, '')}`} className="text-lg font-bold text-slate-900 dark:text-white">{settings.phone}</a>
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
