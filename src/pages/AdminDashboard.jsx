import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { localClient } from '@/api/localClient';
import { useAdminAuth } from '@/lib/AdminAuthContext';
import {
    LayoutDashboard, Briefcase, FolderOpen, FileText, Users, Star, CreditCard, Settings, Mail,
    TrendingUp, ArrowRight
} from 'lucide-react';
import { format } from 'date-fns';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import AdminLayout from '../components/admin/AdminLayout';

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
    const { adminLogout } = useAdminAuth();
    const navigate = useNavigate();

    const { data: leadsResponse } = useQuery({
        queryKey: ['admin-leads-recent'],
        queryFn: () => localClient.get('/leads'),
        refetchInterval: 10000,
    });

    const { data: servicesResponse } = useQuery({
        queryKey: ['admin-services-list'],
        queryFn: () => localClient.get('/services'),
        refetchInterval: 30000,
    });

    const { data: portfolioResponse } = useQuery({
        queryKey: ['admin-portfolio-list'],
        queryFn: () => localClient.get('/portfolio'),
        refetchInterval: 30000,
    });

    const { data: postsResponse } = useQuery({
        queryKey: ['admin-posts-list'],
        queryFn: () => localClient.get('/posts'),
        refetchInterval: 30000,
    });

    const { data: teamResponse } = useQuery({
        queryKey: ['admin-team-list'],
        queryFn: () => localClient.get('/team'),
        refetchInterval: 30000,
    });

    const { data: testimonialsResponse } = useQuery({
        queryKey: ['admin-testimonials-list'],
        queryFn: () => localClient.get('/testimonials?active=all'),
        refetchInterval: 30000,
    });

    const { data: pricingResponse } = useQuery({
        queryKey: ['admin-pricing-list'],
        queryFn: () => localClient.get('/pricing'),
        refetchInterval: 30000,
    });

    const leads = leadsResponse || [];
    const services = servicesResponse || [];
    const portfolio = portfolioResponse || [];
    const posts = postsResponse || [];
    const team = teamResponse || [];
    const testimonials = testimonialsResponse || [];
    const pricing = pricingResponse || [];

    const newLeads = leads.filter(l => !l.is_read).length;

    const stats = [
        { label: 'Total Services', value: services.length, icon: Briefcase, color: 'bg-blue-500' },
        { label: 'Portfolio Items', value: portfolio.length, icon: FolderOpen, color: 'bg-purple-500' },
        { label: 'Blog Posts', value: posts.length, icon: FileText, color: 'bg-green-500' },
        { label: 'New Leads', value: newLeads, icon: Mail, color: 'bg-orange-500' },
        { label: 'Team Members', value: team.length, icon: Users, color: 'bg-indigo-500' },
        { label: 'Testimonials', value: testimonials.length, icon: Star, color: 'bg-yellow-500' },
        { label: 'Pricing Plans', value: pricing.length, icon: CreditCard, color: 'bg-pink-500' },
    ];

    const handleLogout = () => {
        adminLogout();
        navigate(createPageUrl('AdminLogin'));
    };

    return (
        <AdminLayout currentPage="AdminDashboard" title="Dashboard">
            <div className="mb-8">
                <p className="text-slate-600 dark:text-slate-400">Welcome back! Here's your overview.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4 mb-8">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center shadow-lg shadow-${stat.color.split('-')[1]}-500/20`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                            <TrendingUp className="w-5 h-5 text-green-500" />
                        </div>
                        <p className="text-3xl font-bold text-slate-900 dark:text-white">
                            <AnimatedCounter end={stat.value} />
                        </p>
                        <p className="text-slate-600 dark:text-slate-400">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Recent Leads */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recent Leads</h2>
                    <Link to={createPageUrl('AdminLeads')} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1 text-sm font-medium">
                        View All <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 dark:bg-slate-800/50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Service</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {leads.slice(0, 5).map((lead) => (
                                <tr key={lead.id} className={`${!lead.is_read ? 'bg-indigo-50/50 dark:bg-indigo-500/5' : ''} hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors`}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300">
                                                {lead.name?.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="font-medium text-slate-900 dark:text-white">{lead.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-slate-600 dark:text-slate-400">{lead.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-slate-600 dark:text-slate-400">{lead.service_interested || '-'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${lead.status === 'new' ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400' :
                                            lead.status === 'contacted' ? 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400' :
                                                lead.status === 'won' ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400' :
                                                    'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                                            }`}>
                                            {lead.status || 'new'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-slate-600 dark:text-slate-400">
                                        {lead.created_at && format(new Date(lead.created_at), 'MMM d, yyyy')}
                                    </td>
                                </tr>
                            ))}
                            {leads.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
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
                <Link to={createPageUrl('AdminServices')} className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm hover:shadow-md border border-slate-200 dark:border-slate-800 transition-all group">
                    <Briefcase className="w-10 h-10 text-blue-500 mb-4" />
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Manage Services</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Add or edit your service offerings</p>
                </Link>
                <Link to={createPageUrl('AdminPortfolio')} className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm hover:shadow-md border border-slate-200 dark:border-slate-800 transition-all group">
                    <FolderOpen className="w-10 h-10 text-purple-500 mb-4" />
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Add Portfolio</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Showcase your latest projects</p>
                </Link>
                <Link to={createPageUrl('AdminBlog')} className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm hover:shadow-md border border-slate-200 dark:border-slate-800 transition-all group">
                    <FileText className="w-10 h-10 text-green-500 mb-4" />
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Write Blog Post</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Share your expertise</p>
                </Link>
            </div>
        </AdminLayout>
    );
}