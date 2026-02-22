import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { localClient } from '@/api/localClient';
import { Plus, Pencil, Trash2, Loader2, Globe, ShoppingCart, Smartphone, Search, PenTool, Server, Code2, Palette, Gauge, ArrowRight, Layers, Sparkles, Activity, Terminal, Rocket, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AdminLayout from '../components/admin/AdminLayout';
import { toast } from 'sonner';
import Magnetic from '../components/ui/Magnetic';
import GlassCard from '../components/ui/GlassCard';

const iconOptions = [
    { name: 'Globe', icon: Globe },
    { name: 'ShoppingCart', icon: ShoppingCart },
    { name: 'Smartphone', icon: Smartphone },
    { name: 'Search', icon: Search },
    { name: 'PenTool', icon: PenTool },
    { name: 'Server', icon: Server },
    { name: 'Code2', icon: Code2 },
    { name: 'Palette', icon: Palette },
    { name: 'Gauge', icon: Gauge }
];

export default function AdminServices() {
    const [isOpen, setIsOpen] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [formData, setFormData] = useState({
        title: '', slug: '', description: '', long_description: '', icon: 'Globe', price_starting: 0,
        features: [], image_url: '', is_featured: false, is_active: true, order: 0
    });
    const [newFeature, setNewFeature] = useState('');

    const queryClient = useQueryClient();

    const { data: services = [], isLoading } = useQuery({
        queryKey: ['admin-services'],
        queryFn: () => localClient.get('/services')
    });

    const createMutation = useMutation({
        mutationFn: (data) => localClient.post('/services', data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-services'] });
            setIsOpen(false);
            resetForm();
            toast.success('Service unit initialized');
        }
    });

    const updateMutation = useMutation({
        mutationFn: (variables) => localClient.put(`/services/${variables.id}`, variables.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-services'] });
            setIsOpen(false);
            resetForm();
            toast.success('Module re-calibrated');
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => localClient.delete(`/services/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-services'] });
            toast.success('Module decommissioned');
        }
    });

    const resetForm = () => {
        setFormData({
            title: '', slug: '', description: '', long_description: '', icon: 'Globe', price_starting: 0,
            features: [], image_url: '', is_featured: false, is_active: true, order: 0
        });
        setEditingService(null);
        setNewFeature('');
    };

    const handleEdit = (service) => {
        setEditingService(service);
        setFormData({
            title: service.title || '',
            slug: service.slug || '',
            description: service.description || '',
            long_description: service.long_description || '',
            icon: service.icon || 'Globe',
            price_starting: service.price_starting || 0,
            features: service.features || [],
            image_url: service.image_url || '',
            is_featured: service.is_featured || false,
            is_active: service.is_active !== false,
            order: service.order || 0
        });
        setIsOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const submitData = {
            ...formData,
            slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        };
        if (editingService) {
            updateMutation.mutate({ id: editingService.id, data: submitData });
        } else {
            createMutation.mutate(submitData);
        }
    };

    const addFeature = () => {
        if (newFeature.trim()) {
            setFormData(prev => ({ ...prev, features: [...prev.features, newFeature.trim()] }));
            setNewFeature('');
        }
    };

    const removeFeature = (index) => {
        setFormData(prev => ({ ...prev, features: prev.features.filter((_, i) => i !== index) }));
    };

    const inputClasses = "h-14 bg-slate-950/50 border-white/5 rounded-2xl px-6 text-white font-bold outline-none focus:bg-slate-950/80 transition-all placeholder:text-slate-600";
    const labelClasses = "text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4 mb-2 block";

    return (
        <AdminLayout currentPage="AdminServices" title="Unit Configuration">
            <div className="mb-12 flex justify-between items-end">
                <div>
                    <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] mb-2 flex items-center gap-2">
                        <Layers className="w-3 h-3 text-indigo-500" />
                        Engineering Modules / Services
                    </p>
                    <p className="text-slate-400 max-w-xl text-sm leading-relaxed">
                        Authorize and configure the architectural modules available for public deployment.
                    </p>
                </div>
                <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
                    <DialogTrigger asChild>
                        <Magnetic strength={0.2}>
                            <Button className="h-14 px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-indigo-600/30">
                                <Plus className="w-4 h-4 mr-2" /> Initialize Module
                            </Button>
                        </Magnetic>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl bg-slate-900 border-white/5 backdrop-blur-3xl p-10 rounded-[4rem] max-h-[90vh] overflow-y-auto no-scrollbar">
                        <DialogHeader>
                            <DialogTitle className="text-3xl font-black text-white uppercase italic tracking-tighter">
                                {editingService ? 'Re-Configure Unit' : 'Initialize Engineering Unit'}
                            </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-6 mt-8">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className={labelClasses}>Module Title</label>
                                    <Input
                                        className={inputClasses}
                                        value={formData.title}
                                        onChange={(e) => {
                                            const title = e.target.value;
                                            const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                                            setFormData(prev => ({ ...prev, title, slug: editingService ? prev.slug : slug }));
                                        }}
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className={labelClasses}>Deployment Slug</label>
                                    <Input
                                        className={inputClasses}
                                        value={formData.slug}
                                        onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className={labelClasses}>Brief Abstract (Description)</label>
                                <Textarea
                                    className="bg-slate-950/50 border-white/5 rounded-3xl px-8 py-6 text-white text-lg font-medium leading-relaxed min-h-[120px] outline-none focus:bg-slate-950/80 transition-all placeholder:text-slate-600 no-scrollbar"
                                    value={formData.description}
                                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className={labelClasses}>Interface Icon</label>
                                    <Select value={formData.icon} onValueChange={(value) => setFormData(prev => ({ ...prev, icon: value }))}>
                                        <SelectTrigger className="h-14 bg-slate-950/50 border-white/5 rounded-2xl px-6 text-white">
                                            <div className="flex items-center gap-3">
                                                {React.createElement(iconOptions.find(i => i.name === formData.icon)?.icon || Globe, { className: "w-4 h-4 text-indigo-500" })}
                                                <SelectValue />
                                            </div>
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-900 border-white/10 text-white rounded-2xl font-bold uppercase tracking-widest text-[10px]">
                                            {iconOptions.map(opt => (
                                                <SelectItem key={opt.name} value={opt.name} className="flex items-center gap-3">
                                                    <div className="flex items-center gap-3">
                                                        {React.createElement(opt.icon, { className: "w-3 h-3 text-indigo-500" })}
                                                        {opt.name}
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-1">
                                    <label className={labelClasses}>Economic Value (₹ Starting)</label>
                                    <Input
                                        className={inputClasses}
                                        type="number"
                                        value={formData.price_starting}
                                        onChange={(e) => setFormData(prev => ({ ...prev, price_starting: parseInt(e.target.value) || 0 }))}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className={labelClasses}>Technical Specs (Features)</label>
                                <div className="flex gap-4 mb-4">
                                    <Input
                                        className={inputClasses}
                                        value={newFeature}
                                        onChange={(e) => setNewFeature(e.target.value)}
                                        placeholder="Add spec node..."
                                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                                    />
                                    <Button type="button" onClick={addFeature} variant="outline" className="h-14 px-8 rounded-2xl border-white/10 hover:bg-white/5 text-[10px] font-black uppercase">Inject</Button>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {formData.features.map((feature, i) => (
                                        <span key={i} className="px-4 py-2 bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 rounded-xl text-[10px] font-black uppercase flex items-center gap-3">
                                            {feature}
                                            <button type="button" onClick={() => removeFeature(i)} className="text-indigo-400 hover:text-white">×</button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center gap-12 bg-white/2 p-8 rounded-[2.5rem] border border-white/5">
                                <label className="flex items-center gap-4 cursor-pointer">
                                    <Switch
                                        checked={formData.is_featured}
                                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_featured: checked }))}
                                    />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Prime Listing</span>
                                </label>
                                <label className="flex items-center gap-4 cursor-pointer">
                                    <Switch
                                        checked={formData.is_active}
                                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
                                    />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Live Calibration</span>
                                </label>
                            </div>

                            <div className="flex justify-end gap-8 pt-8 pb-4">
                                <Button type="button" variant="ghost" onClick={() => setIsOpen(false)} className="text-slate-500 font-black uppercase tracking-widest text-[10px]">Abort</Button>
                                <Button type="submit" className="h-16 px-16 bg-white text-slate-950 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all shadow-2xl">
                                    {(createMutation.isPending || updateMutation.isPending) && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                    {editingService ? 'Commit Changes' : 'Authorize Deployment'}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="bg-slate-900/40 backdrop-blur-3xl rounded-[3.5rem] border border-white/5 overflow-hidden shadow-2xl mb-24">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-white/2">
                                <th className="px-10 py-8 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Architectural Unit</th>
                                <th className="px-10 py-8 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Economic Value</th>
                                <th className="px-10 py-8 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Grid Status</th>
                                <th className="px-10 py-8 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Tactical Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {isLoading ? (
                                <tr><td colSpan={4} className="px-10 py-24 text-center"><Loader2 className="w-10 h-10 animate-spin mx-auto text-indigo-500" /></td></tr>
                            ) : services.length === 0 ? (
                                <tr><td colSpan={4} className="px-10 py-24 text-center text-slate-500 font-black uppercase tracking-widest text-xs">No modules detected in sector.</td></tr>
                            ) : (
                                services.map((service) => (
                                    <tr key={service.id} className="hover:bg-white/5 transition-all group">
                                        <td className="px-10 py-8">
                                            <div className="flex items-center gap-6">
                                                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-indigo-600 transition-all duration-500 shadow-2xl">
                                                    {React.createElement(iconOptions.find(i => i.name === service.icon)?.icon || Globe, { className: "w-6 h-6 text-white" })}
                                                </div>
                                                <div>
                                                    <p className="text-lg font-black text-white tracking-tighter uppercase italic group-hover:text-indigo-400 transition-colors">{service.title}</p>
                                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Status: Active Configuration</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <span className="text-xl font-black text-white italic tracking-tighter transition-colors group-hover:text-emerald-400">₹{service.price_starting?.toLocaleString('en-IN')}</span>
                                            <span className="text-[8px] font-black text-slate-600 block uppercase tracking-widest mt-1">Starting Allocation</span>
                                        </td>
                                        <td className="px-10 py-8">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${service.is_active !== false
                                                ? 'bg-indigo-600/20 border-indigo-500/30 text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.1)]'
                                                : 'bg-slate-800 border-white/5 text-slate-500'
                                                }`}>
                                                {service.is_active !== false ? 'Live Broadcast' : 'Grid Offline'}
                                            </span>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="flex gap-4">
                                                <Magnetic strength={0.3}>
                                                    <button
                                                        onClick={() => handleEdit(service)}
                                                        className="w-12 h-12 rounded-xl bg-white/2 border border-white/5 flex items-center justify-center hover:bg-indigo-600 transition-all text-slate-400 hover:text-white"
                                                    >
                                                        <Pencil className="w-5 h-5" />
                                                    </button>
                                                </Magnetic>
                                                <Magnetic strength={0.3}>
                                                    <button
                                                        onClick={() => deleteMutation.mutate(service.id)}
                                                        className="w-12 h-12 rounded-xl bg-white/2 border border-white/5 flex items-center justify-center hover:bg-red-600 transition-all text-slate-400 hover:text-red-500"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </Magnetic>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-24">
                <GlassCard className="p-10 rounded-[3rem] border border-white/5 bg-slate-900/40 relative overflow-hidden group">
                    <Terminal className="absolute -bottom-4 -right-4 w-32 h-32 text-white/5 transform -rotate-12 group-hover:text-indigo-500/10 transition-colors duration-700" />
                    <h3 className="text-xl font-black text-white uppercase italic tracking-tighter mb-4 flex items-center gap-3">
                        <Activity className="w-5 h-5 text-indigo-500" />
                        System Integrity
                    </h3>
                    <p className="text-slate-400 font-medium leading-relaxed">
                        All modules are currently operating at peak efficiency. No structural anomalies detected in the deployment pipeline.
                    </p>
                </GlassCard>
                <GlassCard className="p-10 rounded-[3rem] border border-white/5 bg-slate-900/40 relative overflow-hidden group">
                    <Rocket className="absolute -bottom-4 -right-4 w-32 h-32 text-white/5 transform -rotate-12 group-hover:text-emerald-500/10 transition-colors duration-700" />
                    <h3 className="text-xl font-black text-white uppercase italic tracking-tighter mb-4 flex items-center gap-3">
                        <ShieldCheck className="w-5 h-5 text-emerald-500" />
                        Deployment Security
                    </h3>
                    <p className="text-slate-400 font-medium leading-relaxed">
                        End-to-end encryption active for all unit configurations. Verification protocols sealed for global propagation.
                    </p>
                </GlassCard>
            </div>
        </AdminLayout>
    );
}