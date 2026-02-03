import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import {
    LayoutDashboard, Briefcase, FolderOpen, FileText, Users,
    Star, CreditCard, Settings, Mail, Eye, LogOut
} from 'lucide-react';

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
    const { data: leads } = useQuery({
        queryKey: ['admin-leads-count'],
        queryFn: () => base44.entities.Lead.filter({ is_read: false }),
        initialData: []
    });

    const newLeadsCount = leads.length;

    const handleLogout = () => {
        base44.auth.logout();
    };

    return (
        <div className="min-h-screen bg-slate-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white fixed h-full">
                <div className="p-6">
                    <Link to={createPageUrl('Home')} className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-xl">T</span>
                        </div>
                        <span className="text-xl font-bold">TechFreak</span>
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

                <div className="absolute bottom-0 left-0 right-0 p-4">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-4 py-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
                        </div>
                        <Link to={createPageUrl('Home')} target="_blank">
                            <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                                <Eye className="w-4 h-4" />
                                View Site
                            </button>
                        </Link>
                    </div>

                    {children}
                </div>
            </main>
        </div>
    );
}