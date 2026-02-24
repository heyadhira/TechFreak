import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { localClient } from '@/api/localClient';
import { Plus, Pencil, Trash2, Loader2, Upload, X, Globe, Link as LinkIcon, Briefcase, Cpu, Layers, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AdminLayout from '../components/admin/AdminLayout';
import { toast } from 'sonner';
import Magnetic from '../components/ui/Magnetic';
import GlassCard from '../components/ui/GlassCard';

const categoryOptions = ['e-commerce', 'corporate', 'educational', 'healthcare', 'startup', 'portfolio', 'other'];

export default function AdminPortfolio() {
    const [isOpen, setIsOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [formData, setFormData] = useState({
        title: '', description: '', category: 'corporate', client_name: '',
        project_url: '', thumbnail_url: '', tech_stack: [], completion_date: '',
        is_featured: false, is_active: true
    });
    const [newTech, setNewTech] = useState('');
    const [uploading, setUploading] = useState(false);

    const queryClient = useQueryClient();

    const { data: projects = [], isLoading } = useQuery({
        queryKey: ['admin-portfolio'],
        queryFn: () => localClient.get('/portfolio')
    });

    const createMutation = useMutation({
        mutationFn: (data) => localClient.post('/portfolio', data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-portfolio'] });
            setIsOpen(false);
            resetForm();
            toast.success('Record sealed successfully');
        },
        onError: (err) => {
            toast.error(`Failed to create: ${err.message}`);
        }
    });

    const updateMutation = useMutation({
        mutationFn: (variables) => localClient.put(`/portfolio/${variables.id}`, variables.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-portfolio'] });
            setIsOpen(false);
            resetForm();
            toast.success('Record verified and updated');
        },
        onError: (err) => {
            toast.error(`Failed to update: ${err.message}`);
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => localClient.delete(`/portfolio/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-portfolio'] });
            toast.success('Record purged from archive');
        }
    });

    const resetForm = () => {
        setFormData({
            title: '', description: '', category: 'corporate', client_name: '',
            project_url: '', thumbnail_url: '', tech_stack: [], completion_date: '',
            is_featured: false, is_active: true
        });
        setEditingProject(null);
        setNewTech('');
    };

    const handleEdit = (project) => {
        setEditingProject(project);
        setFormData({
            title: project.title || '',
            description: project.description || '',
            category: project.category || 'corporate',
            client_name: project.client_name || '',
            project_url: project.project_url || '',
            thumbnail_url: project.thumbnail_url || '',
            tech_stack: project.tech_stack || [],
            completion_date: project.completion_date || '',
            is_featured: project.is_featured || false,
            is_active: project.is_active !== false
        });
        setIsOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingProject) {
            updateMutation.mutate({ id: editingProject.id, data: formData });
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
        uploadFormData.append('folder', 'portfolio');

        try {
            const response = await localClient.post('/upload', uploadFormData);
            setFormData(prev => ({ ...prev, thumbnail_url: response.url }));
            toast.success('Asset synchronized');
        } catch (error) {
            toast.error('Asset sync failed');
        } finally {
            setUploading(false);
        }
    };

    const addTech = () => {
        if (newTech.trim()) {
            setFormData(prev => ({ ...prev, tech_stack: [...prev.tech_stack, newTech.trim()] }));
            setNewTech('');
        }
    };

    const removeTech = (index) => {
        setFormData(prev => ({ ...prev, tech_stack: prev.tech_stack.filter((_, i) => i !== index) }));
    };

    return (
        <AdminLayout currentPage="AdminPortfolio" title="Deployment Archive">
            <div className="mb-12 flex justify-between items-end">
                <div>
                    <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] mb-2 flex items-center gap-2">
                        <Briefcase className="w-3 h-3 text-indigo-500" />
                        Impact Records / Portfolio
                    </p>
                    <p className="text-slate-400 max-w-xl text-sm leading-relaxed">
                        Archiving strategic global deployments and engineering impact metrics.
                    </p>
                </div>
                <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
                    <Magnetic strength={0.2}>
                        <DialogTrigger asChild>
                            <Button className="h-14 px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-indigo-600/30">
                                <Plus className="w-4 h-4 mr-2" /> Archive New Record
                            </Button>
                        </DialogTrigger>
                    </Magnetic>
                    <DialogContent className="max-w-3xl bg-slate-900 border-white/5 backdrop-blur-3xl p-10 rounded-[3.5rem]">
                        <DialogHeader>
                            <DialogTitle className="text-4xl font-black text-white uppercase italic tracking-tighter">
                                {editingProject ? 'Verify Record' : 'Seal New Deployment'}
                            </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-6 mt-8 overflow-y-auto max-h-[70vh] pr-4 no-scrollbar">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Deployment Title</label>
                                <Input
                                    className="h-16 bg-slate-950/50 border-white/5 rounded-2xl px-8 text-white text-lg font-bold outline-none focus:bg-slate-950/80 transition-all"
                                    value={formData.title}
                                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Strategic Brief (Description)</label>
                                <Textarea
                                    className="bg-slate-950/50 border-white/5 rounded-3xl px-8 py-6 text-white min-h-[120px] outline-none focus:bg-slate-950/80 transition-all no-scrollbar"
                                    value={formData.description}
                                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Architectural Category</label>
                                    <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                                        <SelectTrigger className="h-16 bg-slate-950/50 border-white/5 rounded-2xl px-8 text-white outline-none focus:bg-slate-950/80 transition-all">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-900 border-white/10 text-white rounded-2xl font-bold uppercase tracking-widest text-[10px]">
                                            {categoryOptions.map(cat => (
                                                <SelectItem key={cat} value={cat}>{cat.replace('-', ' ')}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Client Representative</label>
                                    <Input
                                        className="h-16 bg-slate-950/50 border-white/5 rounded-2xl px-8 text-white outline-none focus:bg-slate-950/80 transition-all"
                                        value={formData.client_name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, client_name: e.target.value }))}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Live Project URL</label>
                                <div className="relative">
                                    <LinkIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <Input
                                        className="h-16 bg-slate-950/50 border-white/5 rounded-2xl pl-14 pr-8 text-white font-mono text-sm outline-none focus:bg-slate-950/80 transition-all"
                                        value={formData.project_url}
                                        onChange={(e) => setFormData(prev => ({ ...prev, project_url: e.target.value }))}
                                        placeholder="https://example.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Completion Date</label>
                                <div className="relative">
                                    <CalendarDays className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <Input
                                        type="date"
                                        className="h-16 bg-slate-950/50 border-white/5 rounded-2xl pl-14 pr-8 text-white outline-none focus:bg-slate-950/80 transition-all [color-scheme:dark]"
                                        value={formData.completion_date}
                                        onChange={(e) => setFormData(prev => ({ ...prev, completion_date: e.target.value }))}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Visual Asset (Thumbnail)</label>
                                <div className="flex gap-6 items-center bg-white/2 p-6 rounded-[2.5rem] border border-white/5">
                                    {formData.thumbnail_url ? (
                                        <div className="relative group">
                                            <img src={formData.thumbnail_url} alt="Thumbnail" className="w-40 h-28 object-cover rounded-2xl border-2 border-indigo-500/20 shadow-2xl" />
                                            <button
                                                type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, thumbnail_url: '' }))}
                                                className="absolute -top-2 -right-2 w-8 h-8 bg-red-500/80 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-all opacity-0 group-hover:opacity-100"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="w-40 h-28 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 transition-all group">
                                            {uploading ? <Loader2 className="w-8 h-8 animate-spin text-indigo-500" /> : <Upload className="w-8 h-8 text-slate-500 group-hover:text-indigo-400" />}
                                            <span className="text-[8px] font-black uppercase tracking-widest text-slate-500 mt-2">Sync Asset</span>
                                            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                        </label>
                                    )}
                                    <div className="flex-1 space-y-2">
                                        <p className="text-[8px] font-black uppercase tracking-widest text-slate-500 ml-2">External Link Syntax</p>
                                        <Input
                                            value={formData.thumbnail_url}
                                            onChange={(e) => setFormData(prev => ({ ...prev, thumbnail_url: e.target.value }))}
                                            placeholder="https://..."
                                            className="h-14 bg-slate-950/50 border-white/5 rounded-2xl px-6 text-white text-xs font-mono outline-none focus:bg-slate-950/80 transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Engineering Stack</label>
                                <div className="flex gap-4 mb-4">
                                    <Input
                                        className="h-16 bg-slate-950/50 border-white/5 rounded-2xl px-8 text-white font-mono outline-none focus:bg-slate-950/80 transition-all"
                                        value={newTech}
                                        onChange={(e) => setNewTech(e.target.value)}
                                        placeholder="Inject technology node..."
                                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                                    />
                                    <Button type="button" onClick={addTech} variant="outline" className="h-16 px-8 rounded-2xl border-white/10 hover:bg-white/5 text-[10px] font-black uppercase tracking-widest">Inject</Button>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {formData.tech_stack.map((tech, i) => (
                                        <span key={i} className="px-5 py-2 bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
                                            {tech}
                                            <button type="button" onClick={() => removeTech(i)} className="text-indigo-400 hover:text-white">×</button>
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
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Exhibit Profile</span>
                                </label>
                                <label className="flex items-center gap-4 cursor-pointer">
                                    <Switch
                                        checked={formData.is_active}
                                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
                                    />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Live Status</span>
                                </label>
                            </div>

                            <div className="flex justify-end gap-8 pt-8">
                                <Button type="button" variant="ghost" onClick={() => setIsOpen(false)} className="text-slate-500 font-black uppercase tracking-widest text-[10px]">Abort</Button>
                                <Button type="submit" className="h-16 px-16 bg-white text-slate-950 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all shadow-2xl">
                                    {(createMutation.isPending || updateMutation.isPending) && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                    {editingProject ? 'Commit Archive' : 'Seal Deployment'}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {isLoading ? (
                    <div className="col-span-full text-center py-24"><Loader2 className="w-10 h-10 animate-spin mx-auto text-indigo-500" /></div>
                ) : projects.length === 0 ? (
                    <div className="col-span-full text-center py-24 text-slate-500 font-black uppercase tracking-widest text-xs">No impact records detected in archive.</div>
                ) : (
                    projects.map((project) => (
                        <div key={project.id} className="group relative">
                            <GlassCard
                                className="overflow-hidden rounded-[3rem] border border-white/5 bg-slate-900/40 backdrop-blur-3xl transition-all duration-700 hover:bg-indigo-600/5 hover:border-indigo-500/30 group-hover:-translate-y-2"
                                glowColor="rgba(99, 102, 241, 0.1)"
                            >
                                <div className="aspect-[4/3] relative overflow-hidden">
                                    {project.thumbnail_url ? (
                                        <img src={project.thumbnail_url} alt={project.title} className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-110 group-hover:scale-100" />
                                    ) : (
                                        <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-600 font-black text-[10px] uppercase tracking-widest italic">Asset Missing</div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />

                                    <div className="absolute top-6 right-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                                        <Magnetic strength={0.2}>
                                            <button onClick={() => handleEdit(project)} className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-indigo-600 transition-all">
                                                <Pencil className="w-5 h-5" />
                                            </button>
                                        </Magnetic>
                                        <Magnetic strength={0.2}>
                                            <button onClick={() => deleteMutation.mutate(project.id)} className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-red-600 transition-all">
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </Magnetic>
                                    </div>

                                    <div className="absolute left-6 bottom-6">
                                        <span className="px-4 py-1.5 bg-indigo-600/20 backdrop-blur-3xl border border-indigo-500/30 text-indigo-400 rounded-full text-[8px] font-black uppercase tracking-widest shadow-2xl">
                                            {project.category?.replace('-', ' ')}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-10">
                                    <div className="flex items-center gap-3 mb-4 opacity-40 group-hover:opacity-100 transition-opacity">
                                        <Globe className="w-4 h-4 text-indigo-500" />
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Reach: Verified</span>
                                    </div>
                                    <h3 className="text-2xl font-black text-white tracking-tighter uppercase italic group-hover:text-indigo-400 transition-colors mb-4">{project.title}</h3>
                                    <p className="text-sm text-slate-500 font-medium line-clamp-2 leading-relaxed mb-8">{project.description}</p>

                                    <div className="flex flex-wrap gap-2">
                                        {project.tech_stack?.slice(0, 3).map((tech, i) => (
                                            <span key={i} className="text-[8px] font-black text-slate-600 uppercase tracking-widest">
                                                #{tech.replace(/\s+/g, '')}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </GlassCard>
                        </div>
                    ))
                )}
            </div>
        </AdminLayout>
    );
}