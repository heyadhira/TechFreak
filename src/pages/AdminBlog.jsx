import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { localClient } from '@/api/localClient';
import { Plus, Pencil, Trash2, Loader2, Upload, X, Newspaper, Terminal, Activity, Globe, Rocket, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AdminLayout from '../components/admin/AdminLayout';
import ReactQuill from 'react-quill';
import { format } from 'date-fns';
import { toast } from 'sonner';
import Magnetic from '../components/ui/Magnetic';
import GlassCard from '../components/ui/GlassCard';

const categoryOptions = ['web-development', 'design', 'seo', 'marketing', 'technology', 'tips'];

export default function AdminBlog() {
    const [isOpen, setIsOpen] = useState(false);
    const [editingPost, setEditingPost] = useState(null);
    const [formData, setFormData] = useState({
        title: '', slug: '', excerpt: '', content: '', featured_image: '',
        category: 'web-development', tags: [], author_name: '', read_time: 5,
        is_published: false, is_featured: false
    });
    const [newTag, setNewTag] = useState('');
    const [uploading, setUploading] = useState(false);

    const queryClient = useQueryClient();

    const { data: postsData, isLoading } = useQuery({
        queryKey: ['admin-posts'],
        queryFn: () => localClient.get('/posts'),
    });

    const posts = postsData || [];

    const createMutation = useMutation({
        mutationFn: (data) => localClient.post('/posts', data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-posts'] });
            setIsOpen(false);
            resetForm();
            toast.success('Transmission beamed to network');
        }
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => localClient.put(`/posts/${id}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-posts'] });
            setIsOpen(false);
            resetForm();
            toast.success('Signal re-modulated');
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => localClient.delete(`/posts/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-posts'] });
            toast.success('Signal purged from archive');
        }
    });

    const resetForm = () => {
        setFormData({
            title: '', slug: '', excerpt: '', content: '', featured_image: '',
            category: 'web-development', tags: [], author_name: '', read_time: 5,
            is_published: false, is_featured: false
        });
        setEditingPost(null);
        setNewTag('');
    };

    const handleEdit = (post) => {
        setEditingPost(post);
        setFormData({
            title: post.title || '',
            slug: post.slug || '',
            excerpt: post.excerpt || '',
            content: post.content || '',
            featured_image: post.featured_image || '',
            category: post.category || 'web-development',
            tags: post.tags || [],
            author_name: post.author_name || '',
            read_time: post.read_time || 5,
            is_published: post.is_published || false,
            is_featured: post.is_featured || false
        });
        setIsOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const slug = formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        const data = { ...formData, slug };

        if (editingPost) {
            updateMutation.mutate({ id: editingPost.id, data });
        } else {
            createMutation.mutate(data);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const uploadFormData = new FormData();
        uploadFormData.append('file', file);
        uploadFormData.append('folder', 'blog');

        try {
            const response = await localClient.post('/upload', uploadFormData);
            setFormData(prev => ({ ...prev, featured_image: response.url }));
            toast.success('Asset synced successfully');
        } catch (error) {
            toast.error('Asset sync failed');
        } finally {
            setUploading(false);
        }
    };

    const addTag = () => {
        if (newTag.trim()) {
            setFormData(prev => ({ ...prev, tags: [...prev.tags, newTag.trim()] }));
            setNewTag('');
        }
    };

    const removeTag = (index) => {
        setFormData(prev => ({ ...prev, tags: prev.tags.filter((_, i) => i !== index) }));
    };

    const inputClasses = "h-14 bg-slate-950/50 border-white/5 rounded-2xl px-6 text-white font-bold outline-none focus:bg-slate-950/80 transition-all placeholder:text-slate-600";
    const labelClasses = "text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4 mb-2 block";

    return (
        <AdminLayout currentPage="AdminBlog" title="Transmission Archive">
            <div className="mb-12 flex justify-between items-end">
                <div>
                    <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] mb-2 flex items-center gap-2">
                        <Newspaper className="w-3 h-3 text-indigo-500" />
                        Neural Feeds / Content Propagation
                    </p>
                    <p className="text-slate-400 max-w-xl text-sm leading-relaxed">
                        Broadcasting strategic insights and engineering updates through the global neural network.
                    </p>
                </div>
                <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
                    <DialogTrigger asChild>
                        <Magnetic strength={0.2}>
                            <Button className="h-14 px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-indigo-600/30">
                                <Plus className="w-4 h-4 mr-2" /> Initialize Signal
                            </Button>
                        </Magnetic>
                    </DialogTrigger>
                    <DialogContent className="max-w-5xl bg-slate-900 border-white/5 backdrop-blur-3xl p-10 rounded-[4rem] max-h-[90vh] overflow-y-auto no-scrollbar">
                        <DialogHeader>
                            <DialogTitle className="text-3xl font-black text-white uppercase italic tracking-tighter">
                                {editingPost ? 'Modulate Archive' : 'Broadcast New Signal'}
                            </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-8 mt-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-1">
                                    <label className={labelClasses}>Signal Header (Title)</label>
                                    <Input
                                        className={`${inputClasses} h-16 text-lg`}
                                        value={formData.title}
                                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className={labelClasses}>Transmission Slug (URL)</label>
                                    <Input
                                        className={inputClasses}
                                        value={formData.slug}
                                        onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                                        placeholder="auto-generated-from-header"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className={labelClasses}>Strategic abstract (Excerpt)</label>
                                <Textarea
                                    className="bg-slate-950/50 border-white/5 rounded-3xl px-8 py-6 text-white text-lg font-medium leading-relaxed min-h-[120px] outline-none focus:bg-slate-950/80 transition-all placeholder:text-slate-600 no-scrollbar"
                                    value={formData.excerpt}
                                    onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                                    placeholder="Brief summary of the transmission..."
                                />
                            </div>

                            <div className="space-y-1">
                                <label className={labelClasses}>Core Signal (Content)</label>
                                <div className="bg-slate-950/50 border border-white/5 rounded-[2.5rem] overflow-hidden">
                                    <ReactQuill
                                        theme="snow"
                                        value={formData.content}
                                        onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
                                        className="h-80 mb-12"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-8 pt-4">
                                <div className="space-y-1">
                                    <label className={labelClasses}>Propagation Tier</label>
                                    <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                                        <SelectTrigger className="h-14 bg-slate-950/50 border-white/5 rounded-2xl px-6 text-white">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-900 border-white/10 text-white rounded-2xl font-bold uppercase tracking-widest text-[10px]">
                                            {categoryOptions.map(cat => (
                                                <SelectItem key={cat} value={cat} className="capitalize">{cat.replace('-', ' ')}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-1">
                                    <label className={labelClasses}>Authorized Signer</label>
                                    <Input
                                        className={inputClasses}
                                        value={formData.author_name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, author_name: e.target.value }))}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className={labelClasses}>Processing Time (Cycles)</label>
                                    <Input
                                        type="number"
                                        className={inputClasses}
                                        value={formData.read_time}
                                        onChange={(e) => setFormData(prev => ({ ...prev, read_time: parseInt(e.target.value) || 5 }))}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className={labelClasses}>Featured Asset (Spectral Array)</label>
                                <div className="flex gap-6 items-center bg-white/2 p-6 rounded-[2.5rem] border border-white/5">
                                    {formData.featured_image ? (
                                        <div className="relative group">
                                            <img src={formData.featured_image} alt="Featured" className="w-40 h-28 object-cover rounded-2xl border-2 border-indigo-500/20 shadow-2xl" />
                                            <button
                                                type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, featured_image: '' }))}
                                                className="absolute -top-2 -right-2 w-8 h-8 bg-red-500/80 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-red-600"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="w-40 h-28 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 transition-all group shrink-0">
                                            {uploading ? <Loader2 className="w-8 h-8 animate-spin text-indigo-500" /> : <Upload className="w-8 h-8 text-slate-500 group-hover:text-indigo-400" />}
                                            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                        </label>
                                    )}
                                    <Input
                                        value={formData.featured_image}
                                        onChange={(e) => setFormData(prev => ({ ...prev, featured_image: e.target.value }))}
                                        placeholder="Or paste spectral link..."
                                        className={`${inputClasses} flex-1 text-xs font-mono`}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className={labelClasses}>Neural Tags</label>
                                <div className="flex gap-4 mb-4">
                                    <Input
                                        className={inputClasses}
                                        value={newTag}
                                        onChange={(e) => setNewTag(e.target.value)}
                                        placeholder="Link neural node..."
                                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                    />
                                    <Button type="button" onClick={addTag} variant="outline" className="h-14 px-8 rounded-2xl border-white/10 hover:bg-white/5 text-[10px] font-black uppercase">Link</Button>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {formData.tags.map((tag, i) => (
                                        <span key={i} className="px-4 py-2 bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 rounded-xl text-[10px] font-black uppercase flex items-center gap-3">
                                            {tag}
                                            <button type="button" onClick={() => removeTag(i)} className="text-indigo-400 hover:text-white">×</button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center gap-12 bg-white/2 p-8 rounded-[2.5rem] border border-white/5">
                                <label className="flex items-center gap-4 cursor-pointer">
                                    <Switch
                                        checked={formData.is_published}
                                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_published: checked }))}
                                    />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Global Broadcast</span>
                                </label>
                                <label className="flex items-center gap-4 cursor-pointer">
                                    <Switch
                                        checked={formData.is_featured}
                                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_featured: checked }))}
                                    />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Prime Spectrum</span>
                                </label>
                            </div>

                            <div className="flex justify-end gap-8 pt-8 pb-4">
                                <Button type="button" variant="ghost" onClick={() => setIsOpen(false)} className="text-slate-500 font-black uppercase tracking-widest text-[10px]">Abort</Button>
                                <Button type="submit" className="h-16 px-16 bg-white text-slate-950 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all shadow-2xl">
                                    {(createMutation.isPending || updateMutation.isPending) && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                    {editingPost ? 'Commit Signal' : 'Initiate Broadcast'}
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
                                <th className="px-10 py-8 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Signal Header</th>
                                <th className="px-10 py-8 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Architecture</th>
                                <th className="px-10 py-8 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Broadcast Status</th>
                                <th className="px-10 py-8 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Signal Age</th>
                                <th className="px-10 py-8 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Tactical Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {isLoading ? (
                                <tr><td colSpan={5} className="px-10 py-24 text-center"><Loader2 className="w-10 h-10 animate-spin mx-auto text-indigo-500" /></td></tr>
                            ) : posts.length === 0 ? (
                                <tr><td colSpan={5} className="px-10 py-24 text-center text-slate-500 font-black uppercase tracking-widest text-xs">No signals detected in spectrum.</td></tr>
                            ) : (
                                posts.map((post) => (
                                    <tr key={post.id} className="hover:bg-white/5 transition-all group">
                                        <td className="px-10 py-8">
                                            <div className="flex items-center gap-6">
                                                {post.featured_image ? (
                                                    <img src={post.featured_image} alt="" className="w-20 h-14 object-cover rounded-xl grayscale group-hover:grayscale-0 transition-all duration-700 border border-white/5" />
                                                ) : (
                                                    <div className="w-20 h-14 bg-white/5 rounded-xl flex items-center justify-center text-[8px] font-black text-slate-700 uppercase">No Spectral Array</div>
                                                )}
                                                <div>
                                                    <p className="text-lg font-black text-white tracking-tighter uppercase italic group-hover:text-indigo-400 transition-colors">{post.title}</p>
                                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Author: {post.author_name || 'Anonymous Operative'}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-3 py-1 bg-white/5 rounded-full border border-white/5">{post.category?.replace('-', ' ')}</span>
                                        </td>
                                        <td className="px-10 py-8">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${post.is_published
                                                ? 'bg-emerald-600/20 border-emerald-500/30 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.1)]'
                                                : 'bg-amber-600/20 border-amber-500/30 text-amber-400'}`}>
                                                {post.is_published ? 'Live Spectrum' : 'Dark Signal'}
                                            </span>
                                        </td>
                                        <td className="px-10 py-8 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
                                            {post.created_at && format(new Date(post.created_at), 'MMM d, yyyy')}
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="flex gap-4">
                                                <Magnetic strength={0.3}>
                                                    <button onClick={() => handleEdit(post)} className="w-12 h-12 rounded-xl bg-white/2 border border-white/5 flex items-center justify-center hover:bg-indigo-600 transition-all text-slate-400 hover:text-white">
                                                        <Pencil className="w-5 h-5" />
                                                    </button>
                                                </Magnetic>
                                                <Magnetic strength={0.3}>
                                                    <button onClick={() => deleteMutation.mutate(post.id)} className="w-12 h-12 rounded-xl bg-white/2 border border-white/5 flex items-center justify-center hover:bg-red-600 transition-all text-slate-400 hover:text-red-500">
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
        </AdminLayout>
    );
}