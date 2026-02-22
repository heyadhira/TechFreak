import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { localClient } from '@/api/localClient';
import { useAdminAuth } from '@/lib/AdminAuthContext';
import {
    LayoutDashboard, Briefcase, FolderOpen, FileText, Users, Star, CreditCard, Settings, Mail,
    TrendingUp, ArrowRight, Activity, Terminal, Shield, Zap
} from 'lucide-react';
import { format } from 'date-fns';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import AdminLayout from '../components/admin/AdminLayout';
import Magnetic from '../components/ui/Magnetic';
import GlassCard from '../components/ui/GlassCard';

function MetricModule({ label, value, icon: Icon, color }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
    const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);
    const springX = useSpring(rotateX, { stiffness: 100, damping: 20 });
    const springY = useSpring(rotateY, { stiffness: 100, damping: 20 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            style={{
                rotateX: springX,
                rotateY: springY,
                transformStyle: "preserve-3d",
                perspective: 1000
            }}
            className="group"
        >
            <GlassCard
                className="h-full p-8 bg-slate-900/40 border border-white/5 rounded-[2.5rem] transition-all duration-500 group-hover:bg-indigo-600/5 group-hover:border-indigo-500/30"
                glowColor="rgba(99, 102, 241, 0.1)"
            >
                <div style={{ transform: "translateZ(30px)" }}>
                    <div className="flex items-center justify-between mb-8">
                        <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center shadow-2xl`}>
                            <Icon className="w-7 h-7 text-white" />
                        </div>
                        <Activity className="w-5 h-5 text-indigo-500 animate-pulse" />
                    </div>
                    <p className="text-4xl font-black text-white tracking-tighter mb-2">
                        <AnimatedCounter end={value} duration={2} />
                    </p>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-indigo-400 transition-colors">
                        {label}
                    </p>
                </div>
            </GlassCard>
        </motion.div>
    );
}

export default function AdminDashboard() {
    const { data: leads = [] } = useQuery({ queryKey: ['admin-leads-recent'], queryFn: () => localClient.get('/leads'), refetchInterval: 10000 });
    const { data: services = [] } = useQuery({ queryKey: ['admin-services-list'], queryFn: () => localClient.get('/services') });
    const { data: portfolio = [] } = useQuery({ queryKey: ['admin-portfolio-list'], queryFn: () => localClient.get('/portfolio') });
    const { data: posts = [] } = useQuery({ queryKey: ['admin-posts-list'], queryFn: () => localClient.get('/posts') });
    const { data: team = [] } = useQuery({ queryKey: ['admin-team-list'], queryFn: () => localClient.get('/team') });
    const { data: testimonials = [] } = useQuery({ queryKey: ['admin-testimonials-list'], queryFn: () => localClient.get('/testimonials?active=all') });

    const newLeads = leads.filter(l => !l.is_read).length;

    const stats = [
        { label: 'Active Modules', value: services.length, icon: Briefcase, color: 'bg-blue-600' },
        { label: 'Total Deployments', value: portfolio.length, icon: FolderOpen, color: 'bg-purple-600' },
        { label: 'Intelligence Posts', value: posts.length, icon: FileText, color: 'bg-green-600' },
        { label: 'New Transmissions', value: newLeads, icon: Mail, color: 'bg-orange-600' },
        { label: 'Lead Architects', value: team.length, icon: Users, color: 'bg-indigo-600' },
        { label: 'Verified Signals', value: testimonials.length, icon: Star, color: 'bg-amber-600' }
    ];

    return (
        <AdminLayout currentPage="AdminDashboard" title="Intelligence Hub">
            {/* System Status Banner */}
            <div className="mb-12 flex items-center gap-6 p-6 bg-indigo-600/5 border border-indigo-500/20 rounded-3xl backdrop-blur-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-full bg-indigo-500/10 blur-3xl group-hover:w-full transition-all duration-1000" />
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg relative z-10">
                    <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="relative z-10">
                    <h3 className="text-sm font-black text-white uppercase tracking-widest mb-1">System Operational / High Fidelity</h3>
                    <p className="text-xs text-slate-400 font-medium">All digital architectures are humming at peak performance.</p>
                </div>
                <div className="ml-auto hidden md:flex items-center gap-8 relative z-10 px-8">
                    <div className="flex flex-col items-center">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Latency</span>
                        <span className="text-xs font-black text-green-400">42ms</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Load</span>
                        <span className="text-xs font-black text-indigo-400">0.08</span>
                    </div>
                </div>
            </div>

            {/* Metric Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-16">
                {stats.map((stat, index) => (
                    <MetricModule key={index} {...stat} />
                ))}
            </div>

            {/* Transmission Grid (Leads) */}
            <div className="bg-slate-900/40 backdrop-blur-3xl rounded-[3rem] border border-white/5 overflow-hidden mb-16 shadow-2xl">
                <div className="p-10 border-b border-white/5 flex justify-between items-center bg-white/5">
                    <div className="flex items-center gap-4">
                        <Zap className="w-6 h-6 text-indigo-400" />
                        <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic">Recent Transmissions</h2>
                    </div>
                    <Magnetic strength={0.2}>
                        <Link to={createPageUrl('AdminLeads')} className="px-6 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2">
                            Access Full Archive <ArrowRight className="w-4 h-4" />
                        </Link>
                    </Magnetic>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-white/2">
                                <th className="px-10 py-6 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Source</th>
                                <th className="px-10 py-6 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Contact</th>
                                <th className="px-10 py-6 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Requested Module</th>
                                <th className="px-10 py-6 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Status</th>
                                <th className="px-10 py-6 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {leads.slice(0, 5).map((lead) => (
                                <tr key={lead.id} className={`${!lead.is_read ? 'bg-indigo-600/10' : ''} hover:bg-white/5 transition-colors group cursor-default`}>
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-lg group-hover:scale-110 transition-transform">
                                                {lead.name?.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="font-black text-white tracking-tight">{lead.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8 text-sm text-slate-400 font-medium group-hover:text-white transition-colors">{lead.email}</td>
                                    <td className="px-10 py-8">
                                        <span className="px-4 py-1.5 bg-white/5 border border-white/5 rounded-full text-[10px] text-indigo-400 font-black uppercase tracking-widest">
                                            {lead.service_interested || 'General Query'}
                                        </span>
                                    </td>
                                    <td className="px-10 py-8">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${lead.status === 'new' ? 'bg-indigo-600/20 border-indigo-500/30 text-indigo-400' :
                                                lead.status === 'contacted' ? 'bg-amber-600/20 border-amber-500/30 text-amber-400' :
                                                    lead.status === 'won' ? 'bg-green-600/20 border-green-500/30 text-green-400' :
                                                        'bg-slate-500/20 border-slate-500/30 text-slate-400'
                                            }`}>
                                            {lead.status || 'Received'}
                                        </span>
                                    </td>
                                    <td className="px-10 py-8 text-[10px] font-black text-slate-600 uppercase tracking-widest">
                                        {lead.created_at && format(new Date(lead.created_at), 'MMM d, yyyy')}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Tactical Operations (Quick Actions) */}
            <div className="grid md:grid-cols-3 gap-8">
                {[
                    { link: 'AdminServices', icon: Briefcase, color: 'text-blue-500', title: 'Modular Config', desc: 'Sync engineering units' },
                    { link: 'AdminPortfolio', icon: FolderOpen, color: 'text-purple-500', title: 'Deployment Archive', desc: 'Seal new impact records' },
                    { link: 'AdminBlog', icon: FileText, color: 'text-green-500', title: 'Intelligence Feed', desc: 'Broadcast strategic briefs' }
                ].map((action, i) => (
                    <Link key={i} to={createPageUrl(action.link)}>
                        <Magnetic strength={0.1}>
                            <div className="bg-slate-900/40 backdrop-blur-3xl rounded-[2.5rem] p-10 border border-white/5 hover:bg-indigo-600/5 hover:border-indigo-500/30 transition-all group flex items-start gap-6">
                                <div className={`w-16 h-16 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-indigo-600 group-hover:border-indigo-500 transition-all duration-500`}>
                                    <action.icon className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-white group-hover:text-indigo-400 transition-colors uppercase tracking-widest mb-1 italic">
                                        {action.title}
                                    </h3>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">{action.desc}</p>
                                </div>
                            </div>
                        </Magnetic>
                    </Link>
                ))}
            </div>
        </AdminLayout>
    );
}