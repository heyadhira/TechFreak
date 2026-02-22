import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { localClient } from '@/api/localClient';
import { Save, Loader2, Search, Phone, MapPin, Cpu, Radio, Globe, Share2, Rocket, Zap, ShieldCheck, Database, Terminal, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminLayout from '../components/admin/AdminLayout';
import ProjectDownloader from '../components/admin/ProjectDownloader';
import { toast } from 'sonner';
import Magnetic from '../components/ui/Magnetic';
import GlassCard from '../components/ui/GlassCard';

export default function AdminSettings() {
    const [settings, setSettings] = useState({
        site_name: 'TechFreak',
        tagline: 'Premium Web Development Services',
        phone: '+91 98765 43210',
        email: 'hello@techfreak.in',
        address: 'Mumbai, Maharashtra, India',
        whatsapp: '919876543210',
        meta_title: 'TechFreak - Premium Web Development Services',
        meta_description: 'Professional web development services for Indian businesses. Custom websites, e-commerce, SEO optimization starting at ₹4,999.',
        facebook: '',
        twitter: '',
        instagram: '',
        linkedin: '',
        hero_title: 'Build Your Dream Website',
        hero_subtitle: 'Starting at ₹4,999',
        hero_description: 'Transform your business with stunning, high-performance websites.'
    });

    const queryClient = useQueryClient();

    const { data: savedSettingsResponse, isLoading } = useQuery({
        queryKey: ['site-settings'],
        queryFn: () => localClient.get('/settings'),
    });

    const savedSettings = savedSettingsResponse || {};

    useEffect(() => {
        if (savedSettings && typeof savedSettings === 'object' && Object.keys(savedSettings).length > 0) {
            const loadedSettings = {};
            Object.entries(savedSettings).forEach(([key, value]) => {
                try {
                    // Handle potential JSON values (though most are strings)
                    loadedSettings[key] = (typeof value === 'string' && (value.startsWith('{') || value.startsWith('[')))
                        ? JSON.parse(value)
                        : value;
                } catch {
                    loadedSettings[key] = value;
                }
            });
            setSettings(prev => ({ ...prev, ...loadedSettings }));
        }
    }, [JSON.stringify(savedSettings)]);

    const saveMutation = useMutation({
        mutationFn: (data) => localClient.post('/settings', data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['site-settings'] });
            toast.success('Neural core re-calibrated');
        },
        onError: () => {
            toast.error('Neural sync failed. Check system integrity.');
        }
    });

    const handleSave = () => {
        saveMutation.mutate(settings);
    };

    if (isLoading) {
        return (
            <AdminLayout currentPage="AdminSettings" title="Neural Configuration">
                <div className="flex flex-col items-center justify-center py-48 gap-6">
                    <div className="relative">
                        <Loader2 className="w-16 h-16 animate-spin text-indigo-500 opacity-20" />
                        <Loader2 className="w-16 h-16 animate-spin text-indigo-400 absolute top-0 left-0 [animation-duration:1.5s]" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 animate-pulse">Syncing System Parameters...</p>
                </div>
            </AdminLayout>
        );
    }

    // Custom dark input style to ensure visibility and match the theme
    const inputClasses = "h-16 bg-slate-900/50 border-white/5 rounded-3xl px-8 text-white text-lg font-bold tracking-tight focus:bg-slate-900/80 focus:border-indigo-500/30 transition-all outline-none placeholder:text-slate-600";
    const labelClasses = "text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4 mb-3 block";

    return (
        <AdminLayout currentPage="AdminSettings" title="Neural Configuration">
            <div className="grid lg:grid-cols-[1fr_350px] gap-12 items-start mb-24">
                <div className="min-w-0">
                    <Tabs defaultValue="general" className="space-y-12">
                        <TabsList className="bg-slate-900/40 backdrop-blur-3xl border border-white/5 p-1.5 rounded-[2rem] flex flex-wrap lg:inline-flex h-auto gap-1">
                            {[
                                { val: 'general', icon: Cpu, label: 'Identification' },
                                { val: 'contact', icon: Radio, label: 'Frequencies' },
                                { val: 'seo', icon: Globe, label: 'Global SEO' },
                                { val: 'social', icon: Share2, label: 'Neural Links' },
                                { val: 'hero', icon: Rocket, label: 'Launch Pad' },
                            ].map(tab => (
                                <TabsTrigger
                                    key={tab.val}
                                    value={tab.val}
                                    className="flex-1 lg:flex-none px-6 py-4 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] data-[state=active]:bg-indigo-600 data-[state=active]:text-white transition-all duration-500 hover:bg-white/5"
                                >
                                    <tab.icon className="w-3.5 h-3.5 mr-2.5" /> {tab.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        <div className="min-h-[500px]">
                            <TabsContent value="general" className="mt-0 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 outline-none">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-1">
                                        <label className={labelClasses}>System Identity (Site Name)</label>
                                        <Input
                                            className={inputClasses}
                                            value={settings.site_name || ''}
                                            onChange={(e) => setSettings(prev => ({ ...prev, site_name: e.target.value }))}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className={labelClasses}>Primary Tagline</label>
                                        <Input
                                            className={inputClasses}
                                            value={settings.tagline || ''}
                                            onChange={(e) => setSettings(prev => ({ ...prev, tagline: e.target.value }))}
                                        />
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="contact" className="mt-0 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 outline-none">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-1">
                                        <label className={labelClasses}>
                                            Voice Frequency
                                        </label>
                                        <Input
                                            className={inputClasses}
                                            value={settings.phone || ''}
                                            onChange={(e) => setSettings(prev => ({ ...prev, phone: e.target.value }))}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className={labelClasses}>Direct Terminal (Email)</label>
                                        <Input
                                            type="email"
                                            className={inputClasses}
                                            value={settings.email || ''}
                                            onChange={(e) => setSettings(prev => ({ ...prev, email: e.target.value }))}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className={labelClasses}>Command Center (WhatsApp)</label>
                                        <Input
                                            className={inputClasses}
                                            value={settings.whatsapp || ''}
                                            onChange={(e) => setSettings(prev => ({ ...prev, whatsapp: e.target.value }))}
                                            placeholder="919876543210"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className={labelClasses}>Physical Node Address</label>
                                        <Input
                                            className={inputClasses}
                                            value={settings.address || ''}
                                            onChange={(e) => setSettings(prev => ({ ...prev, address: e.target.value }))}
                                        />
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="seo" className="mt-0 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 outline-none">
                                <div className="space-y-10">
                                    <div className="space-y-1">
                                        <label className={labelClasses}>Global Meta Identification</label>
                                        <Input
                                            className={`${inputClasses} h-20 text-2xl font-black italic tracking-tighter`}
                                            value={settings.meta_title || ''}
                                            onChange={(e) => setSettings(prev => ({ ...prev, meta_title: e.target.value }))}
                                        />
                                        <p className="text-[10px] font-black text-indigo-400/60 uppercase tracking-widest ml-4 mt-2">Neural Target: 50-60 Characters</p>
                                    </div>
                                    <div className="space-y-1">
                                        <label className={labelClasses}>Global Network Brief (Meta Description)</label>
                                        <Textarea
                                            className="bg-slate-900/50 border-white/5 rounded-[3rem] px-10 py-8 text-white text-lg font-medium leading-relaxed min-h-[180px] outline-none focus:bg-slate-900/80 focus:border-indigo-500/30 transition-all no-scrollbar"
                                            value={settings.meta_description || ''}
                                            onChange={(e) => setSettings(prev => ({ ...prev, meta_description: e.target.value }))}
                                        />
                                        <p className="text-[10px] font-black text-indigo-400/60 uppercase tracking-widest ml-10 mt-2">Neural Target: 150-160 Characters</p>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="social" className="mt-0 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 outline-none">
                                <div className="grid md:grid-cols-2 gap-8">
                                    {['facebook', 'twitter', 'instagram', 'linkedin'].map((platform) => (
                                        <div key={platform} className="space-y-1">
                                            <label className={labelClasses}>{platform} Protocol URL</label>
                                            <Input
                                                className={`${inputClasses} text-xs font-normal`}
                                                value={settings[platform] || ''}
                                                onChange={(e) => setSettings(prev => ({ ...prev, [platform]: e.target.value }))}
                                                placeholder={`https://${platform}.com/…`}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="hero" className="mt-0 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 outline-none">
                                <div className="space-y-8">
                                    <div className="space-y-1">
                                        <label className={labelClasses}>Titan Headline (Hero Title)</label>
                                        <Input
                                            className={`${inputClasses} h-20 text-3xl font-black italic tracking-tighter`}
                                            value={settings.hero_title || ''}
                                            onChange={(e) => setSettings(prev => ({ ...prev, hero_title: e.target.value }))}
                                        />
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-1">
                                            <label className={labelClasses}>Strategic Subtitle</label>
                                            <Input
                                                className={inputClasses}
                                                value={settings.hero_subtitle || ''}
                                                onChange={(e) => setSettings(prev => ({ ...prev, hero_subtitle: e.target.value }))}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className={labelClasses}>Impact Record (Description)</label>
                                            <Textarea
                                                className="h-40 bg-slate-900/50 border-white/5 rounded-[2.5rem] px-8 py-6 text-white text-sm outline-none focus:bg-slate-900/80 focus:border-indigo-500/30 transition-all no-scrollbar"
                                                value={settings.hero_description || ''}
                                                onChange={(e) => setSettings(prev => ({ ...prev, hero_description: e.target.value }))}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>

                <div className="space-y-12 lg:sticky lg:top-12">
                    <GlassCard className="p-10 rounded-[4rem] text-center border-white/5 bg-slate-900/40 backdrop-blur-3xl group">
                        <div className="w-20 h-20 bg-indigo-600/10 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-indigo-500/20 shadow-2xl shadow-indigo-500/10 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12">
                            <Rocket className="w-10 h-10 text-indigo-400" />
                        </div>
                        <h4 className="text-xl font-black text-white italic tracking-tighter uppercase mb-4">Neural Launch</h4>
                        <p className="text-xs text-slate-500 leading-relaxed font-medium mb-10">Commit all system modifications to the core network engine.</p>

                        <Magnetic strength={0.2}>
                            <Button
                                onClick={handleSave}
                                className="w-full h-18 bg-white text-slate-950 rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all shadow-2xl relative overflow-hidden group/btn"
                                disabled={saveMutation.isPending}
                            >
                                <div className="absolute inset-0 bg-indigo-600/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                                <span className="relative z-10 flex items-center justify-center gap-3">
                                    {saveMutation.isPending ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <ShieldCheck className="w-5 h-5 text-indigo-600" />
                                    )}
                                    {saveMutation.isPending ? 'Syncing...' : 'Commit Changes'}
                                </span>
                            </Button>
                        </Magnetic>
                    </GlassCard>

                    <GlassCard className="p-10 rounded-[4rem] border-white/5 bg-slate-900/40 backdrop-blur-3xl">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-white/5 rounded-2xl">
                                <Database className="w-5 h-5 text-slate-400" />
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Global Backup</h4>
                                <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mt-0.5">Physical Data Archive</p>
                            </div>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed font-medium mb-8">Download a full-resolution snapshot of the entire project architectural files.</p>
                        <ProjectDownloader />
                    </GlassCard>
                </div>
            </div>
        </AdminLayout>
    );
}