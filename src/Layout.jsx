import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import {
    Phone, MessageCircle, Mail,
    Facebook, Twitter, Instagram, Linkedin
} from 'lucide-react';
import WhatsAppButton from './components/ui/WhatsAppButton';
import Navbar from './components/ui/Navbar';
import { navLinks } from './constants';
import { cn } from './lib/utils';

export default function Layout({ children, currentPageName }) {
    const isAdminPage = currentPageName?.startsWith('Admin');
    const isHomePage = currentPageName === 'Home';

    if (isAdminPage) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
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

            <Navbar currentPageName={currentPageName} />

            {/* Main Content */}
            <main className={cn(!isHomePage && "pt-24")}>
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-slate-900 text-white pt-16 pb-8">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                        {/* Brand */}
                        <div>
                            <Link to={createPageUrl('Home')} className="flex items-center gap-2 mb-4">
                                <img src="/img/logo.png" alt="TechFreak" className="w-10 h-10 rounded-xl object-cover" />
                                <span className="text-2xl font-bold">
                                    Tech<span className="text-indigo-400">Freak</span>
                                </span>
                            </Link>
                            <p className="text-slate-400 mb-6 leading-relaxed">
                                Premium web development services for Indian businesses. Best quality at the best price.
                            </p>
                            <div className="flex gap-3">
                                {[
                                    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
                                    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
                                    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
                                    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' }
                                ].map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-indigo-600 hover:scale-110 transition-all duration-300"
                                        aria-label={social.label}
                                    >
                                        <social.icon className="w-5 h-5 text-slate-300 hover:text-white" />
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
            <WhatsAppButton phoneNumber="919876543210" />
        </div>
    );
}