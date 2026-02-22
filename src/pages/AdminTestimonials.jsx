import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { localClient } from '@/api/localClient';
import { Plus, Pencil, Trash2, Loader2, Upload, X, Star, MessageSquare, Shield, Zap, Activity, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AdminLayout from '../components/admin/AdminLayout';
import { toast } from 'sonner';
import Magnetic from '../components/ui/Magnetic';
import GlassCard from '../components/ui/GlassCard';

export default function AdminTestimonials() {
    const [isOpen, setIsOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        client_name: '', client_designation: '', company: '', photo_url: '',
        content: '', rating: 5, project_type: '', is_featured: false, is_active: true
    });
    const [uploading, setUploading] = useState(false);

    const queryClient = useQueryClient();

    const { data: testimonials = [], isLoading } = useQuery({
        queryKey: ['admin-testimonials'],
        queryFn: () => localClient.get('/testimonials?active=all'),
    });

    const createMutation = useMutation({
        mutationFn: (data) => localClient.post('/testimonials', data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-testimonials'] });
            setIsOpen(false);
            resetForm();
            toast.success('Verification sealed');
        }
    });

    const updateMutation = useMutation({
        mutationFn: (variables) => localClient.put(`/testimonials/${variables.id}`, variables.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-testimonials'] });
            setIsOpen(false);
            resetForm();
            toast.success('Verification re-certified');
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => localClient.delete(`/testimonials/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-testimonials'] });
            toast.success('Verification purged');
        }
    });

    const resetForm = () => {
        setFormData({
            client_name: '', client_designation: '', company: '', photo_url: '',
            content: '', rating: 5, project_type: '', is_featured: false, is_active: true
        });
        setEditingItem(null);
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setFormData({
            client_name: item.client_name || '',
            client_designation: item.client_designation || '',
            company: item.company || '',
            photo_url: item.photo_url || '',
            content: item.content || '',
            rating: item.rating || 5,
            project_type: item.project_type || '',
            is_featured: item.is_featured || false,
            is_active: item.is_active !== false
        });
        setIsOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingItem) {
            updateMutation.mutate({ id: editingItem.id, data: formData });
        } else {
            createMutation.mutate(formData);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const uploadFormData = new FormData();
        uploadFormData.append('file', file);
        uploadFormData.append('folder', 'testimonials');

        try {
            const response = await localClient.post('/upload', uploadFormData);
            setFormData(prev => ({ ...prev, photo_url: response.url }));
            toast.success('Authenticator identity synced');
        } catch (error) {
            toast.error('Sync failed');
        } finally {
            setUploading(false);
        }
    };

    return (
        <AdminLayout currentPage="AdminTestimonials" title="Verification Logs">
            <div className="mb-12 flex justify-between items-end">
                <div>
                    <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] mb-2 flex items-center gap-2">
                        <Shield className="w-3 h-3 text-indigo-500" />
                        Trust Signifiers / Verification
                    </p>
                    <p className="text-slate-400 max-w-xl text-sm leading-relaxed">
                        Authenticating global project feedback and sealing visionary partner endorsements.
                    </p>
                </div>
                <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
                    <DialogTrigger asChild>
                        <Magnetic strength={0.2}>
                            <Button className="h-14 px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-indigo-600/30">
                                <Plus className="w-4 h-4 mr-2" /> Seal New Verification
                            </Button>
                        </Magnetic>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl bg-slate-900 border-white/5 backdrop-blur-3xl p-10 rounded-[4rem]">
                        <DialogHeader>
                            <DialogTitle className="text-3xl font-black text-white uppercase italic tracking-tighter">
                                {editingItem ? 'Re-Certify Verification' : 'Seal Impact Verification'}
                            </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-6 mt-8 overflow-y-auto max-h-[70vh] pr-4 no-scrollbar">
                            <div className="flex gap-8 items-start bg-white/2 p-8 rounded-[3rem] border border-white/5">
                                {formData.photo_url ? (
                                    <div className="relative group">
                                        <img src={formData.photo_url} alt="Photo" className="w-24 h-24 object-cover rounded-3xl border-2 border-indigo-500/20" />
                                        <button
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, photo_url: '' }))}
                                            className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center border-2 border-slate-900 opacity-0 group-hover:opacity-100 transition-all"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <label className="w-24 h-24 border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 transition-all group shrink-0">
                                        {uploading ? <Loader2 className="w-6 h-6 animate-spin text-indigo-500" /> : <Upload className="w-6 h-6 text-slate-500 group-hover:text-indigo-400" />}
                                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                    </label>
                                )}
                                <div className="flex-1 space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Authenticator Name</label>
                                        <Input
                                            className="h-14 bg-slate-950/50 border-white/5 rounded-2xl px-6 text-white font-bold outline-none focus:bg-slate-950/80 transition-all placeholder:text-slate-600"
                                            value={formData.client_name}
                                            onChange={(e) => setFormData(prev => ({ ...prev, client_name: e.target.value }))}
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Input
                                            className="h-14 bg-slate-950/50 border-white/5 rounded-2xl px-6 text-white text-xs outline-none focus:bg-slate-950/80 transition-all placeholder:text-slate-600"
                                            value={formData.client_designation}
                                            onChange={(e) => setFormData(prev => ({ ...prev, client_designation: e.target.value }))}
                                            placeholder="Authorized Designation"
                                        />
                                        <Input
                                            className="h-14 bg-slate-950/50 border-white/5 rounded-2xl px-6 text-white text-xs outline-none focus:bg-slate-950/80 transition-all placeholder:text-slate-600"
                                            value={formData.company}
                                            onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                                            placeholder="Entity/Company"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Transmitted Impact (Content)</label>
                                <Textarea
                                    className="bg-slate-950/50 border-white/5 rounded-3xl px-8 py-6 text-white text-xl font-medium leading-relaxed min-h-[150px] italic outline-none focus:bg-slate-950/80 transition-all placeholder:text-slate-600 no-scrollbar"
                                    value={formData.content}
                                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                                    placeholder="Brief impact declaration..."
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-4 bg-white/2 p-6 rounded-3xl border border-white/5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Authenticity Index (Rating)</label>
                                    <div className="flex gap-4 h-10 items-center justify-center">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                                                className="group/star"
                                            >
                                                <Star className={`w-8 h-8 transition-all ${star <= formData.rating ? 'text-amber-400 fill-amber-400 scale-110' : 'text-slate-700 group-hover/star:text-amber-400/50'}`} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Project Context</label>
                                    <Input
                                        className="h-full bg-slate-950/50 border-white/5 rounded-3xl px-6 text-white text-xs uppercase font-black tracking-widest outline-none focus:bg-slate-950/80 transition-all placeholder:text-slate-600"
                                        value={formData.project_type}
                                        onChange={(e) => setFormData(prev => ({ ...prev, project_type: e.target.value }))}
                                        placeholder="e.g., ARCHITECTURAL SYNC"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-12 bg-white/2 p-8 rounded-[2.5rem] border border-white/5">
                                <label className="flex items-center gap-4 cursor-pointer">
                                    <Switch
                                        checked={formData.is_featured}
                                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_featured: checked }))}
                                    />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Prime Exhibit</span>
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
                                <Button type="submit" className="h-16 px-16 bg-white text-slate-950 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">
                                    {(createMutation.isPending || updateMutation.isPending) && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                    {editingItem ? 'Verify Record' : 'Seal Impact'}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
                {isLoading ? (
                    <div className="col-span-full text-center py-24"><Loader2 className="w-10 h-10 animate-spin mx-auto text-indigo-500" /></div>
                ) : testimonials.length === 0 ? (
                    <div className="col-span-full text-center py-24 text-slate-500 font-black uppercase tracking-widest text-xs">No project verifications detected in archives.</div>
                ) : (
                    testimonials.map((item) => (
                        <div key={item.id} className="group relative">
                            <GlassCard
                                className="overflow-hidden rounded-[3.5rem] border border-white/5 bg-slate-900/40 backdrop-blur-3xl p-12 transition-all duration-700 hover:bg-amber-400/[0.02] hover:border-amber-400/30 group-hover:-translate-y-2"
                                glowColor="rgba(251, 191, 36, 0.05)"
                            >
                                <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-500 flex gap-3 translate-y-2 group-hover:translate-y-0">
                                    <Magnetic strength={0.2}>
                                        <button onClick={() => handleEdit(item)} className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-indigo-600 transition-all">
                                            <Pencil className="w-5 h-5" />
                                        </button>
                                    </Magnetic>
                                    <Magnetic strength={0.2}>
                                        <button onClick={() => deleteMutation.mutate(item.id)} className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-red-600 transition-all">
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </Magnetic>
                                </div>

                                <div className="flex gap-1.5 mb-8">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-5 h-5 transition-all duration-1000 ${i < item.rating ? 'text-amber-400 fill-amber-400 scale-110' : 'text-slate-800'}`} />
                                    ))}
                                </div>

                                <div className="relative mb-10">
                                    <Quote className="absolute -top-4 -left-6 w-12 h-12 text-white/5 transform -rotate-12" />
                                    <p className="text-2xl text-white font-medium italic leading-relaxed tracking-tight group-hover:text-amber-100 transition-colors">
                                        "{item.content}"
                                    </p>
                                </div>

                                <div className="flex items-center gap-6 pt-10 border-t border-white/5">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-amber-400/20 blur-2xl rounded-full scale-50 group-hover:scale-100 transition-transform duration-1000" />
                                        <img
                                            src={item.photo_url || `https://ui-avatars.com/api/?name=${item.client_name}&background=6366f1&color=fff&size=100`}
                                            alt={item.client_name}
                                            className="w-16 h-16 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all duration-700 border-2 border-white/5 relative z-10"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-lg font-black text-white uppercase italic tracking-tighter transition-colors group-hover:text-amber-400">{item.client_name}</p>
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">
                                            {item.client_designation} <span className="text-amber-500/50 mx-1">/</span> {item.company || 'Private Entity'}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Activity className="w-3 h-3 text-emerald-500" />
                                        <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Integrity: Verified</span>
                                    </div>
                                    <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest px-3 py-1 bg-indigo-600/10 rounded-full border border-indigo-500/20 shadow-2xl shadow-indigo-500/10">
                                        {item.project_type || 'GENERAL IMPACT'}
                                    </span>
                                </div>
                            </GlassCard>
                        </div>
                    ))
                )}
            </div>
        </AdminLayout>
    );
}