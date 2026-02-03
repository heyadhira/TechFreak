import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Menu, X, Home, Briefcase, FolderOpen, FileText,
    Users, Mail, ChevronDown, Phone, MessageCircle
} from 'lucide-react';
import WhatsAppButton from './components/ui/WhatsAppButton';

const navLinks = [
    { name: 'Home', page: 'Home', icon: Home },
    { name: 'Services', page: 'Services', icon: Briefcase },
    { name: 'Portfolio', page: 'Portfolio', icon: FolderOpen },
    { name: 'About', page: 'About', icon: Users },
    { name: 'Blog', page: 'Blog', icon: FileText },
    { name: 'Contact', page: 'Contact', icon: Mail }
];

export default function Layout({ children, currentPageName }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

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

    const isHomePage = currentPageName === 'Home';
    const isAdminPage = currentPageName?.startsWith('Admin');

    if (isAdminPage) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-white">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
        
        :root {
          --color-primary: 99 102 241;
          --color-secondary: 249 115 22;
        }
        
        body {
          font-family: 'Outfit', sans-serif;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

            {/* Header */}
            <motion.header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || !isHomePage
                        ? 'bg-white/95 backdrop-blur-lg shadow-lg shadow-slate-200/50'
                        : 'bg-transparent'
                    }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link to={createPageUrl('Home')} className="flex items-center gap-2 group">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 group-hover:shadow-indigo-300 transition-shadow">
                                <span className="text-white font-bold text-xl">T</span>
                            </div>
                            <span className={`text-2xl font-bold transition-colors ${isScrolled || !isHomePage ? 'text-slate-900' : 'text-white'
                                }`}>
                                Tech<span className="gradient-text">Freak</span>
                            </span>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden lg:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.page}
                                    to={createPageUrl(link.page)}
                                    className={`px-4 py-2 rounded-xl font-medium transition-all ${currentPageName === link.page
                                            ? 'bg-indigo-100 text-indigo-700'
                                            : isScrolled || !isHomePage
                                                ? 'text-slate-700 hover:text-indigo-600 hover:bg-slate-100'
                                                : 'text-white/90 hover:text-white hover:bg-white/10'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>

                        {/* CTA Button */}
                        <div className="hidden lg:flex items-center gap-4">
                            <a
                                href="tel:+919876543210"
                                className={`flex items-center gap-2 font-medium transition-colors ${isScrolled || !isHomePage ? 'text-slate-700 hover:text-indigo-600' : 'text-white/90 hover:text-white'
                                    }`}
                            >
                                <Phone className="w-4 h-4" />
                                +91 98765 43210
                            </a>
                            <Link to={createPageUrl('Contact')}>
                                <button className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl shadow-lg shadow-orange-200 hover:shadow-orange-300 transition-all hover:scale-105">
                                    Get Quote
                                </button>
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={`lg:hidden p-2 rounded-xl transition-colors ${isScrolled || !isHomePage ? 'text-slate-900 hover:bg-slate-100' : 'text-white hover:bg-white/10'
                                }`}
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="lg:hidden bg-white border-t border-slate-100"
                        >
                            <nav className="container mx-auto px-4 py-4 space-y-1">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.page}
                                        to={createPageUrl(link.page)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${currentPageName === link.page
                                                ? 'bg-indigo-100 text-indigo-700'
                                                : 'text-slate-700 hover:bg-slate-100'
                                            }`}
                                    >
                                        <link.icon className="w-5 h-5" />
                                        {link.name}
                                    </Link>
                                ))}
                                <Link
                                    to={createPageUrl('Contact')}
                                    className="block mt-4 px-4 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center font-semibold rounded-xl"
                                >
                                    Get Free Quote
                                </Link>
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.header>

            {/* Main Content */}
            <main>
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-slate-900 text-white pt-16 pb-8">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                        {/* Brand */}
                        <div>
                            <Link to={createPageUrl('Home')} className="flex items-center gap-2 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">T</span>
                                </div>
                                <span className="text-2xl font-bold">
                                    Tech<span className="text-indigo-400">Freak</span>
                                </span>
                            </Link>
                            <p className="text-slate-400 mb-6 leading-relaxed">
                                Premium web development services for Indian businesses. Best quality at the best price.
                            </p>
                            <div className="flex gap-3">
                                {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                                    <a
                                        key={social}
                                        href={`https://${social}.com`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-indigo-600 transition-colors"
                                    >
                                        <span className="sr-only">{social}</span>
                                        <div className="w-5 h-5 bg-current rounded-sm" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
                            <ul className="space-y-3">
                                {navLinks.map((link) => (
                                    <li key={link.page}>
                                        <Link
                                            to={createPageUrl(link.page)}
                                            className="text-slate-400 hover:text-white transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Services */}
                        <div>
                            <h4 className="font-bold text-lg mb-4">Services</h4>
                            <ul className="space-y-3">
                                {['Website Development', 'E-Commerce', 'SEO Services', 'UI/UX Design', 'Web Applications'].map((service) => (
                                    <li key={service}>
                                        <Link
                                            to={createPageUrl('Services')}
                                            className="text-slate-400 hover:text-white transition-colors"
                                        >
                                            {service}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4 className="font-bold text-lg mb-4">Get In Touch</h4>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <Phone className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <a href="tel:+919876543210" className="text-slate-400 hover:text-white transition-colors">
                                            +91 98765 43210
                                        </a>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Mail className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <a href="mailto:hello@techfreak.in" className="text-slate-400 hover:text-white transition-colors">
                                            hello@techfreak.in
                                        </a>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <MessageCircle className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <a
                                            href="https://wa.me/919876543210"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-slate-400 hover:text-white transition-colors"
                                        >
                                            WhatsApp Chat
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-slate-500 text-sm">
                            © {new Date().getFullYear()} TechFreak. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm text-slate-500">
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* WhatsApp Button */}
            <WhatsAppButton phone="919876543210" />
        </div>
    );
}