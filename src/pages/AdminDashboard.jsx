import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import {
    LayoutDashboard, Briefcase, FolderOpen, FileText, Users,
    MessageSquare, Star, CreditCard, Settings, Mail,
    TrendingUp, Clock, Eye, ArrowRight, LogOut
} from 'lucide-react';
import { format } from 'date-fns';
import AnimatedCounter from '../components/ui/AnimatedCounter';

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

export default function AdminDashboard() {
    const { data: leads } = useQuery({
        queryKey: ['admin-leads'],
        queryFn: () => base44.entities.Lead.list('-created_date', 10),
        initialData: []
    });

    const { data: services } = useQuery({
        queryKey: ['admin-services'],
        queryFn: () => base44.entities.Service.list(),
        initialData: []
    });

    const { data: portfolio } = useQuery({
        queryKey: ['admin-portfolio'],
        queryFn: () => base44.entities.Portfolio.list(),
        initialData: []
    });

    const { data: posts } = useQuery({
        queryKey: ['admin-posts'],
        queryFn: () => base44.entities.BlogPost.list(),
        initialData: []
    });

    const newLeads = leads.filter(l => !l.is_read).length;

    const stats = [
        { label: 'Total Services', value: services.length, icon: Briefcase, color: 'bg-blue-500' },
        { label: 'Portfolio Items', value: portfolio.length, icon: FolderOpen, color: 'bg-purple-500' },
        { label: 'Blog Posts', value: posts.length, icon: FileText, color: 'bg-green-500' },
        { label: 'New Leads', value: newLeads, icon: Mail, color: 'bg-orange-500' }
    ];

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
                            className={`flex items-center gap-3 px-6 py-3 text-white/70 hover:text-white hover:bg-white/10 transition-colors ${item.page === 'AdminDashboard' ? 'bg-white/10 text-white border-r-2 border-indigo-500' : ''
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.label}
                            {item.page === 'AdminLeads' && newLeads > 0 && (
                                <span className="ml-auto px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                                    {newLeads}
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
                            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
                            <p className="text-slate-600">Welcome back! Here's your overview.</p>
                        </div>
                        <Link to={createPageUrl('Home')} target="_blank">
                            <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                                <Eye className="w-4 h-4" />
                                View Site
                            </button>
                        </Link>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl p-6 shadow-sm"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                                        <stat.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <TrendingUp className="w-5 h-5 text-green-500" />
                                </div>
                                <p className="text-3xl font-bold text-slate-900">
                                    <AnimatedCounter end={stat.value} />
                                </p>
                                <p className="text-slate-600">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Recent Leads */}
                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-slate-900">Recent Leads</h2>
                            <Link to={createPageUrl('AdminLeads')} className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1 text-sm font-medium">
                                View All <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Service</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {leads.slice(0, 5).map((lead) => (
                                        <tr key={lead.id} className={!lead.is_read ? 'bg-blue-50/50' : ''}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                                                        {lead.name?.charAt(0).toUpperCase()}
                                                    </div>
                                                    <span className="font-medium text-slate-900">{lead.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-slate-600">{lead.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-slate-600">{lead.service_interested || '-'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${lead.status === 'new' ? 'bg-blue-100 text-blue-700' :
                                                        lead.status === 'contacted' ? 'bg-yellow-100 text-yellow-700' :
                                                            lead.status === 'won' ? 'bg-green-100 text-green-700' :
                                                                'bg-slate-100 text-slate-700'
                                                    }`}>
                                                    {lead.status || 'new'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                                                {lead.created_date && format(new Date(lead.created_date), 'MMM d, yyyy')}
                                            </td>
                                        </tr>
                                    ))}
                                    {leads.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                                No leads yet. They'll appear here when visitors contact you.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid md:grid-cols-3 gap-6 mt-8">
                        <Link to={createPageUrl('AdminServices')} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group">
                            <Briefcase className="w-10 h-10 text-blue-500 mb-4" />
                            <h3 className="font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">Manage Services</h3>
                            <p className="text-sm text-slate-600">Add or edit your service offerings</p>
                        </Link>
                        <Link to={createPageUrl('AdminPortfolio')} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group">
                            <FolderOpen className="w-10 h-10 text-purple-500 mb-4" />
                            <h3 className="font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">Add Portfolio</h3>
                            <p className="text-sm text-slate-600">Showcase your latest projects</p>
                        </Link>
                        <Link to={createPageUrl('AdminBlog')} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group">
                            <FileText className="w-10 h-10 text-green-500 mb-4" />
                            <h3 className="font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">Write Blog Post</h3>
                            <p className="text-sm text-slate-600">Share your expertise</p>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}