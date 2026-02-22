import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { localClient } from '@/api/localClient';
import { Plus, Pencil, Trash2, Loader2, IndianRupee, Tag, ShieldCheck, Zap, Activity, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AdminLayout from '../components/admin/AdminLayout';
import { toast } from 'sonner';
import Magnetic from '../components/ui/Magnetic';
import GlassCard from '../components/ui/GlassCard';

export default function AdminPricing() {
    const [isOpen, setIsOpen] = useState(false);
    const [editingPlan, setEditingPlan] = useState(null);
    const [formData, setFormData] = useState({
        name: '', description: '', price: 0, original_price: 0,
        features: [], is_popular: false, billing_period: 'monthly',
        category: '', order: 0
    });
    const [featureInput, setFeatureInput] = useState('');

    const queryClient = useQueryClient();

    const { data: plans = [], isLoading } = useQuery({
        queryKey: ['admin-pricing'],
        queryFn: () => localClient.get('/pricing?active=all'),
    });

    const createMutation = useMutation({
        mutationFn: (data) => localClient.post('/pricing', data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-pricing'] });
            setIsOpen(false);
            resetForm();
            toast.success('Valuation protocol deployed');
        }
    });

    const updateMutation = useMutation({
        mutationFn: (variables) => localClient.put(`/pricing/${variables.id}`, variables.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-pricing'] });
            setIsOpen(false);
            resetForm();
            toast.success('Parameters re-calibrated');
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => localClient.delete(`/pricing/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-pricing'] });
            toast.success('Protocol purged');
        }
    });

    const resetForm = () => {
        setFormData({
            name: '', description: '', price: 0, original_price: 0,
            features: [], is_popular: false, billing_period: 'monthly',
            category: '', order: 0
        });
        setEditingPlan(null);
        setFeatureInput('');
    };

    const handleEdit = (plan) => {
        setEditingPlan(plan);
        setFormData({
            name: plan.name || '',
            description: plan.description || '',
            price: plan.price || 0,
            original_price: plan.original_price || 0,
            features: plan.features || [],
            is_popular: plan.is_popular || false,
            billing_period: plan.billing_period || 'monthly',
            category: plan.category || '',
            order: plan.order || 0
        });
        setIsOpen(true);
    };

    const addFeature = () => {
        if (featureInput.trim() && !formData.features.includes(featureInput.trim())) {
            setFormData(prev => ({ ...prev, features: [...prev.features, featureInput.trim()] }));
            setFeatureInput('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingPlan) {
            updateMutation.mutate({ id: editingPlan.id, data: formData });
        } else {
            createMutation.mutate(formData);
        }
    };

    return (
        <AdminLayout currentPage="AdminPricing" title="Valuation Protocols">
            <div className="mb-12 flex justify-between items-end">
                <div>
                    <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] mb-2 flex items-center gap-2">
                        <Tag className="w-3 h-3 text-indigo-500" />
                        Yield Engineering / Revenue Architecture
                    </p>
                    <p className="text-slate-400 max-w-xl text-sm leading-relaxed">
                        Configuring tier-based access protocols and optimizing authorized yield parameters.
                    </p>
                </div>
                <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
                    <DialogTrigger asChild>
                        <Magnetic strength={0.2}>
                            <Button className="h-14 px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-indigo-600/30">
                                <Plus className="w-4 h-4 mr-2" /> Initialize Protocol
                            </Button>
                        </Magnetic>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl bg-slate-900 border-white/5 backdrop-blur-3xl p-10 rounded-[4rem]">
                        <DialogHeader>
                            <DialogTitle className="text-3xl font-black text-white uppercase italic tracking-tighter">
                                {editingPlan ? 'Optimize Protocol' : 'Deploy New Protocol'}
                            </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-8 mt-8 overflow-y-auto max-h-[70vh] pr-4 no-scrollbar">
                            <div className="grid md:grid-cols-2 gap-10">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Protocol Identity (Name)</label>
                                        <Input
                                            className="h-14 bg-slate-950/50 border-white/5 rounded-2xl px-6 text-white font-bold outline-none focus:bg-slate-950/80 transition-all"
                                            value={formData.name}
                                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Strategic Intent (Description)</label>
                                        <Textarea
                                            className="bg-slate-950/50 border-white/5 rounded-2xl px-6 py-4 text-white min-h-[100px] outline-none focus:bg-slate-950/80 transition-all no-scrollbar"
                                            value={formData.description}
                                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Authorized Yield (Price)</label>
                                            <Input
                                                type="number"
                                                className="h-14 bg-slate-950/50 border-white/5 rounded-2xl px-6 text-white outline-none focus:bg-slate-950/80 transition-all"
                                                value={formData.price}
                                                onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Standard Valuation</label>
                                            <Input
                                                type="number"
                                                className="h-14 bg-slate-950/50 border-white/5 rounded-2xl px-6 text-white outline-none focus:bg-slate-950/80 transition-all"
                                                value={formData.original_price}
                                                onChange={(e) => setFormData(prev => ({ ...prev, original_price: parseFloat(e.target.value) || 0 }))}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Augmentation Units (Features)</label>
                                        <div className="flex gap-4">
                                            <Input
                                                className="h-12 bg-slate-950/50 border-white/5 rounded-xl px-6 text-white outline-none focus:bg-slate-950/80 transition-all"
                                                value={featureInput}
                                                onChange={(e) => setFeatureInput(e.target.value)}
                                                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                                                placeholder="Inject capability..."
                                            />
                                            <Button type="button" onClick={addFeature} className="bg-indigo-600 rounded-xl px-8 h-12 uppercase font-black text-[10px]">Inject</Button>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mt-4 max-h-[200px] overflow-y-auto no-scrollbar">
                                            {formData.features.map((feature, i) => (
                                                <span key={i} className="px-4 py-2 bg-white/5 border border-white/5 rounded-full text-[10px] font-black uppercase text-indigo-400 flex items-center gap-2">
                                                    {feature} <button type="button" onClick={() => setFormData(prev => ({ ...prev, features: prev.features.filter((_, idx) => idx !== i) }))}>×</button>
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Protocol Tier</label>
                                            <Input
                                                className="h-14 bg-slate-950/50 border-white/5 rounded-2xl px-6 text-white uppercase font-black text-xs tracking-widest outline-none focus:bg-slate-950/80 transition-all"
                                                value={formData.category}
                                                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                                                placeholder="e.g., ENTERPRISE"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Sync Frequency</label>
                                            <Input
                                                className="h-14 bg-slate-950/50 border-white/5 rounded-2xl px-6 text-white text-xs outline-none focus:bg-slate-950/80 transition-all"
                                                value={formData.billing_period}
                                                onChange={(e) => setFormData(prev => ({ ...prev, billing_period: e.target.value }))}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-12 bg-white/2 p-8 rounded-[2.5rem] border border-white/5">
                                <label className="flex items-center gap-4 cursor-pointer">
                                    <Switch
                                        checked={formData.is_popular}
                                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_popular: checked }))}
                                    />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Prime Protocol Elevation</span>
                                </label>
                                <div className="flex-1 flex items-center justify-end gap-4">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Stack Priority</span>
                                    <Input
                                        type="number"
                                        className="h-10 w-20 bg-slate-950/50 border-white/5 rounded-xl px-4 text-white text-xs outline-none focus:bg-slate-950/80 transition-all"
                                        value={formData.order}
                                        onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-8 pt-8">
                                <Button type="button" variant="ghost" onClick={() => setIsOpen(false)} className="text-slate-500 font-black uppercase tracking-widest text-[10px]">Abort</Button>
                                <Button type="submit" className="h-16 px-16 bg-white text-slate-950 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all shadow-2xl shadow-white/5">
                                    {(createMutation.isPending || updateMutation.isPending) && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                    {editingPlan ? 'Confirm Parameters' : 'Deploy Protocol'}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {isLoading ? (
                    <div className="col-span-full text-center py-24"><Loader2 className="w-10 h-10 animate-spin mx-auto text-indigo-500" /></div>
                ) : plans.length === 0 ? (
                    <div className="col-span-full text-center py-24 text-slate-500 font-black uppercase tracking-widest text-xs">No valuation protocols detected.</div>
                ) : (
                    plans.map((plan) => (
                        <div key={plan.id} className="group relative">
                            <GlassCard
                                className={`overflow-hidden rounded-[3.5rem] border p-10 transition-all duration-700 ${plan.is_popular ? 'bg-indigo-600/10 border-indigo-500/40 shadow-2xl shadow-indigo-500/10' : 'bg-slate-900/40 border-white/5'} hover:border-indigo-500/30 group-hover:-translate-y-2`}
                                glowColor={plan.is_popular ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.02)'}
                            >
                                {plan.is_popular && (
                                    <div className="absolute top-0 right-12 px-6 py-2 bg-indigo-500 text-[10px] font-black uppercase tracking-[0.2em] italic text-white rounded-b-2xl shadow-2xl z-20">
                                        Prime Selection
                                    </div>
                                )}

                                <div className="absolute top-10 right-10 opacity-0 group-hover:opacity-100 transition-all duration-500 flex gap-2 translate-x-4 group-hover:translate-x-0">
                                    <button onClick={() => handleEdit(plan)} className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-indigo-600 transition-all">
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => deleteMutation.mutate(plan.id)} className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-red-600 transition-all">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="flex items-center gap-4 mb-8">
                                    <div className={`p-4 rounded-2xl ${plan.is_popular ? 'bg-indigo-500/20 text-indigo-400' : 'bg-white/5 text-slate-400'}`}>
                                        <ShieldCheck className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-white italic tracking-tighter uppercase">{plan.name}</h3>
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{plan.category}</p>
                                    </div>
                                </div>

                                <div className="mb-10">
                                    <div className="flex items-baseline gap-2 mb-2">
                                        <span className="text-4xl font-black text-white tracking-tighter italic">₹{plan.price?.toLocaleString('en-IN')}</span>
                                        {plan.original_price > 0 && (
                                            <span className="text-lg text-slate-600 line-through font-medium tracking-tight italic">₹{plan.original_price?.toLocaleString('en-IN')}</span>
                                        )}
                                    </div>
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Protocol Sync / {plan.billing_period}</p>
                                </div>

                                <div className="space-y-4 mb-10 min-h-[160px]">
                                    {plan.features?.slice(0, 4).map((feature, idx) => (
                                        <div key={idx} className="flex items-center gap-4">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/40 shadow-2xl shadow-indigo-500" />
                                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">{feature}</span>
                                        </div>
                                    ))}
                                    {plan.features?.length > 4 && (
                                        <div className="text-[10px] font-black text-white/20 uppercase tracking-widest pl-4">
                                            +{plan.features.length - 4} System Nodes Enabled
                                        </div>
                                    )}
                                </div>

                                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Activity className="w-3 h-3 text-emerald-500" />
                                        <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Protocol: Active</span>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-indigo-500/30 group-hover:text-indigo-500 transition-all group-hover:translate-x-2" />
                                </div>
                            </GlassCard>
                        </div>
                    ))
                )}
            </div>
        </AdminLayout>
    );
}