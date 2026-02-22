import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { localClient } from '@/api/localClient';
import { useAdminAuth } from '@/lib/AdminAuthContext';
import {
    LayoutDashboard, Briefcase, FolderOpen, FileText, Users,
    Star, CreditCard, Settings, Mail, Eye, LogOut, Sparkles, Terminal
} from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';
import NoiseTexture from '../ui/NoiseTexture';
import Magnetic from '../ui/Magnetic';

const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', page: 'AdminDashboard' },
    { icon: Briefcase, label: 'Services', page: 'AdminServices' },
    { icon: FolderOpen, label: 'Portfolio', page: 'AdminPortfolio' },
    { icon: FileText, label: 'Blog', page: 'AdminBlog' },
    { icon: Users, label: 'Team', page: 'AdminTeam' },
    { icon: Star, label: 'Testimonials', page: 'AdminTestimonials' },
    { icon: CreditCard, label: 'Pricing', page: 'AdminPricing' },
    { icon: Mail, label: 'Leads', page: 'AdminLeads' },
    { icon: Settings, label: 'Settings', page: 'AdminSettings' }
];

export default function AdminLayout({ children, currentPage, title }) {
    const { adminLogout } = useAdminAuth();
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
    const location = useLocation();

    const { data: unreadData } = useQuery({
        queryKey: ['admin-leads-unread-count'],
        queryFn: () => localClient.get('/leads/unread-count'),
        initialData: { count: 0 },
        refetchInterval: 10000,
    });

    const newLeadsCount = unreadData?.count || 0;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-300 selection:bg-indigo-500/30 flex overflow-hidden">
            {/* Cinematic Foundation */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 z-[100] origin-left"
                style={{ scaleX }}
            />
            <NoiseTexture opacity={0.03} />

            {/* Glassmorphic Sidebar - Command Bar */}
            <aside className="w-72 bg-slate-900/40 backdrop-blur-3xl border-r border-white/5 fixed h-full z-50 flex flex-col">
                <div className="p-8">
                    <Link to={createPageUrl('Home')} className="group flex items-center gap-3">
                        <div className="relative">
                            <img src="/img/logo.png" alt="TechFreak" className="w-12 h-12 rounded-2xl object-cover shadow-2xl group-hover:scale-105 transition-transform" />
                            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-black tracking-tighter text-white leading-none">TECHFREAK</span>
                            <span className="text-[8px] font-black tracking-[0.4em] text-indigo-400 uppercase mt-1">Command Terminal</span>
                        </div>
                    </Link>
                </div>

                <nav className="flex-1 mt-4 px-4 space-y-2 overflow-y-auto no-scrollbar">
                    {menuItems.map((item) => (
                        <Magnetic key={item.page} strength={0.15}>
                            <Link
                                to={createPageUrl(item.page)}
                                className={`flex items-center gap-4 px-6 py-4 rounded-[1.5rem] font-bold text-sm tracking-tight transition-all relative group ${item.page === currentPage
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                                    : 'text-slate-500 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <item.icon className={`w-5 h-5 ${item.page === currentPage ? 'text-white' : 'text-slate-500 group-hover:text-indigo-400'} transition-colors`} />
                                {item.label}
                                {item.page === 'AdminLeads' && newLeadsCount > 0 && (
                                    <span className="ml-auto flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_10px_rgba(99,102,241,1)]" />
                                )}
                            </Link>
                        </Magnetic>
                    ))}
                </nav>

                <div className="p-6 border-t border-white/5 bg-slate-900/40">
                    <button
                        onClick={adminLogout}
                        className="flex items-center gap-3 w-full px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-red-400 hover:bg-red-500/5 rounded-2xl transition-all"
                    >
                        <LogOut className="w-5 h-5" />
                        Terminate Session
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 ml-72 p-12 min-h-screen relative">
                {/* Background Decorations */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <header className="flex justify-between items-center mb-16">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Terminal className="w-4 h-4 text-indigo-500" />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">System / {title}</span>
                            </div>
                            <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic">{title}</h1>
                        </div>
                        <div className="flex items-center gap-6">
                            <ThemeToggle variant="icon" className="bg-white/5 border border-white/10 hover:bg-white/10 transition-all" />
                            <Magnetic strength={0.2}>
                                <Link to={createPageUrl('Home')} target="_blank">
                                    <button className="flex items-center gap-3 px-8 py-3 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all group">
                                        <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                        Observe Site
                                    </button>
                                </Link>
                            </Magnetic>
                        </div>
                    </header>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {children}
                    </motion.div>
                </div>
            </main>
        </div>
    );
}