import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Plus, Pencil, Trash2, Loader2, Upload, X, Eye } from 'lucide-react';
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

    const { data: posts, isLoading } = useQuery({
        queryKey: ['admin-posts'],
        queryFn: () => base44.entities.BlogPost.list('-created_date'),
        initialData: []
    });

    const createMutation = useMutation({
        mutationFn: (data) => base44.entities.BlogPost.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-posts'] });
            setIsOpen(false);
            resetForm();
            toast.success('Post created successfully');
        }
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => base44.entities.BlogPost.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-posts'] });
            setIsOpen(false);
            resetForm();
            toast.success('Post updated successfully');
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => base44.entities.BlogPost.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-posts'] });
            toast.success('Post deleted successfully');
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
        const { file_url } = await base44.integrations.Core.UploadFile({ file });
        setFormData(prev => ({ ...prev, featured_image: file_url }));
        setUploading(false);
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

    return (
        <AdminLayout currentPage="AdminBlog" title="Manage Blog Posts">
            <div className="bg-white rounded-2xl shadow-sm">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <p className="text-slate-600">Create and manage blog content</p>
                    <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
                        <DialogTrigger asChild>
                            <Button className="bg-indigo-600 hover:bg-indigo-700">
                                <Plus className="w-4 h-4 mr-2" /> New Post
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>{editingPost ? 'Edit Post' : 'Create New Post'}</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Title</label>
                                        <Input
                                            value={formData.title}
                                            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Slug (URL)</label>
                                        <Input
                                            value={formData.slug}
                                            onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                                            placeholder="auto-generated-from-title"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Excerpt</label>
                                    <Textarea
                                        value={formData.excerpt}
                                        onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                                        rows={2}
                                        placeholder="Brief summary of the post..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Content</label>
                                    <ReactQuill
                                        theme="snow"
                                        value={formData.content}
                                        onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
                                        className="h-64 mb-12"
                                    />
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Category</label>
                                        <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                {categoryOptions.map(cat => (
                                                    <SelectItem key={cat} value={cat} className="capitalize">{cat.replace('-', ' ')}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Author</label>
                                        <Input
                                            value={formData.author_name}
                                            onChange={(e) => setFormData(prev => ({ ...prev, author_name: e.target.value }))}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Read Time (min)</label>
                                        <Input
                                            type="number"
                                            value={formData.read_time}
                                            onChange={(e) => setFormData(prev => ({ ...prev, read_time: parseInt(e.target.value) || 5 }))}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Featured Image</label>
                                    <div className="flex gap-4 items-center">
                                        {formData.featured_image ? (
                                            <div className="relative">
                                                <img src={formData.featured_image} alt="Featured" className="w-32 h-20 object-cover rounded-lg" />
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData(prev => ({ ...prev, featured_image: '' }))}
                                                    className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </div>
                                        ) : (
                                            <label className="w-32 h-20 border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 transition-colors">
                                                {uploading ? <Loader2 className="w-5 h-5 animate-spin text-slate-400" /> : <Upload className="w-5 h-5 text-slate-400" />}
                                                <span className="text-xs text-slate-500 mt-1">Upload</span>
                                                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                            </label>
                                        )}
                                        <Input
                                            value={formData.featured_image}
                                            onChange={(e) => setFormData(prev => ({ ...prev, featured_image: e.target.value }))}
                                            placeholder="Or paste image URL..."
                                            className="flex-1"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Tags</label>
                                    <div className="flex gap-2 mb-2">
                                        <Input
                                            value={newTag}
                                            onChange={(e) => setNewTag(e.target.value)}
                                            placeholder="Add tag"
                                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                        />
                                        <Button type="button" onClick={addTag} variant="outline">Add</Button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {formData.tags.map((tag, i) => (
                                            <span key={i} className="px-3 py-1 bg-slate-100 rounded-full text-sm flex items-center gap-2">
                                                {tag}
                                                <button type="button" onClick={() => removeTag(i)} className="text-slate-500 hover:text-red-500">×</button>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <label className="flex items-center gap-2">
                                        <Switch
                                            checked={formData.is_published}
                                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_published: checked }))}
                                        />
                                        <span className="text-sm">Published</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <Switch
                                            checked={formData.is_featured}
                                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_featured: checked }))}
                                        />
                                        <span className="text-sm">Featured</span>
                                    </label>
                                </div>
                                <div className="flex justify-end gap-3 pt-4">
                                    <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                                    <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700" disabled={createMutation.isPending || updateMutation.isPending}>
                                        {(createMutation.isPending || updateMutation.isPending) && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                        {editingPost ? 'Update' : 'Create'}
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Author</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {isLoading ? (
                                <tr><td colSpan={6} className="px-6 py-12 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto" /></td></tr>
                            ) : posts.length === 0 ? (
                                <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-500">No posts yet. Write your first blog post.</td></tr>
                            ) : (
                                posts.map((post) => (
                                    <tr key={post.id}>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                {post.featured_image && (
                                                    <img src={post.featured_image} alt="" className="w-12 h-8 object-cover rounded" />
                                                )}
                                                <div>
                                                    <p className="font-medium text-slate-900">{post.title}</p>
                                                    <p className="text-xs text-slate-500">{post.slug}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600 capitalize text-sm">{post.category?.replace('-', ' ')}</td>
                                        <td className="px-6 py-4 text-slate-600 text-sm">{post.author_name || '-'}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${post.is_published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                {post.is_published ? 'Published' : 'Draft'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600 text-sm">
                                            {post.created_date && format(new Date(post.created_date), 'MMM d, yyyy')}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <Button variant="ghost" size="icon" onClick={() => handleEdit(post)}><Pencil className="w-4 h-4" /></Button>
                                                <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(post.id)} className="text-red-500 hover:text-red-700">
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
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