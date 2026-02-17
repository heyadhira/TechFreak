import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { localClient } from '@/api/localClient';
import { useAdminAuth } from '@/lib/AdminAuthContext';
import {
    LayoutDashboard, Briefcase, FolderOpen, FileText, Users,
    Star, CreditCard, Settings, Mail, Eye, LogOut
} from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';

const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', page: 'AdminDashboard' },
    { icon: Briefcase, label: 'Services', page: 'AdminServices' },
    { icon: FolderOpen, label: 'Portfolio', page: 'AdminPortfolio' },
    { icon: FileText, label: 'Blog Posts', page: 'AdminBlog' },
    { icon: Users, label: 'Team', page: 'AdminTeam' },
    { icon: Star, label: 'Testimonials', page: 'AdminTestimonials' },
    { icon: CreditCard, label: 'Pricing Plans', page: 'AdminPricing' },
    { icon: Mail, label: 'Leads', page: 'AdminLeads' },
    { icon: Settings, label: 'Settings', page: 'AdminSettings' }
];

export default function AdminLayout({ children, currentPage, title }) {
    const { adminLogout } = useAdminAuth();

    const { data: unreadData } = useQuery({
        queryKey: ['admin-leads-unread-count'],
        queryFn: () => localClient.get('/leads/unread-count'),
        initialData: { count: 0 },
        refetchInterval: 10000,
    });

    const newLeadsCount = unreadData?.count || 0;

    const handleLogout = () => {
        adminLogout();
    };

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex transition-colors duration-300">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 dark:bg-slate-900 text-white fixed h-full border-r border-slate-800 dark:border-slate-800">
                <div className="p-6">
                    <Link to={createPageUrl('Home')} className="flex items-center gap-2">
                        <img src="/img/logo.png" alt="TechFreak" className="w-10 h-10 rounded-xl object-cover shadow-lg shadow-indigo-500/20" />
                        <span className="text-xl font-bold tracking-tight">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">Tech</span><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500">Freak</span>
                        </span>
                    </Link>
                </div>

                <nav className="mt-6">
                    {menuItems.map((item) => (
                        <Link
                            key={item.page}
                            to={createPageUrl(item.page)}
                            className={`flex items-center gap-3 px-6 py-3 text-white/70 hover:text-white hover:bg-white/10 transition-colors ${item.page === currentPage ? 'bg-white/10 text-white border-r-2 border-indigo-500' : ''
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.label}
                            {item.page === 'AdminLeads' && newLeadsCount > 0 && (
                                <span className="ml-auto px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                                    {newLeadsCount}
                                </span>
                            )}
                        </Link>
                    ))}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/5">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-4 py-2 text-white/70 hover:text-white hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-all"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{title}</h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <ThemeToggle variant="icon" className="bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800" />
                            <Link to={createPageUrl('Home')} target="_blank">
                                <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-lg shadow-sm hover:shadow-md border border-slate-200 dark:border-slate-800 transition-all">
                                    <Eye className="w-4 h-4" />
                                    View Site
                                </button>
                            </Link>
                        </div>
                    </div>

                    {children}
                </div>
            </main>
        </div>
    );
}