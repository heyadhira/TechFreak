import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { localClient } from '@/api/localClient';
import { Plus, Pencil, Trash2, Loader2, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AdminLayout from '../components/admin/AdminLayout';
import { toast } from 'sonner';

const categoryOptions = ['e-commerce', 'corporate', 'educational', 'healthcare', 'startup', 'portfolio', 'other'];

export default function AdminPortfolio() {
    const [isOpen, setIsOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [formData, setFormData] = useState({
        title: '', description: '', category: 'corporate', client_name: '',
        project_url: '', thumbnail_url: '', tech_stack: [], is_featured: false, is_active: true
    });
    const [newTech, setNewTech] = useState('');
    const [uploading, setUploading] = useState(false);

    const queryClient = useQueryClient();

    const { data: projects, isLoading } = useQuery({
        queryKey: ['admin-portfolio'],
        queryFn: () => localClient.get('/portfolio'),
        initialData: []
    });

    const createMutation = useMutation({
        mutationFn: (data) => localClient.post('/portfolio', data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-portfolio'] });
            setIsOpen(false);
            resetForm();
            toast.success('Project created successfully');
        }
    });

    const updateMutation = useMutation({
        mutationFn: (variables) => localClient.put(`/portfolio/${variables.id}`, variables.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-portfolio'] });
            setIsOpen(false);
            resetForm();
            toast.success('Project updated successfully');
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => localClient.delete(`/portfolio/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-portfolio'] });
            toast.success('Project deleted successfully');
        }
    });

    const resetForm = () => {
        setFormData({
            title: '', description: '', category: 'corporate', client_name: '',
            project_url: '', thumbnail_url: '', tech_stack: [], is_featured: false, is_active: true
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
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', 'portfolio');

        try {
            const response = await localClient.post('/upload', formData);
            setFormData(prev => ({ ...prev, thumbnail_url: response.url }));
            toast.success('Image uploaded successfully');
        } catch (error) {
            console.error('Upload failed:', error);
            toast.error('Failed to upload image');
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
        <AdminLayout currentPage="AdminPortfolio" title="Manage Portfolio">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <p className="text-slate-600 dark:text-slate-400">Showcase your best work</p>
                    <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
                        <DialogTrigger asChild>
                            <Button className="bg-indigo-600 hover:bg-indigo-700">
                                <Plus className="w-4 h-4 mr-2" /> Add Project
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>{editingProject ? 'Edit Project' : 'Add New Project'}</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Title</label>
                                    <Input
                                        value={formData.title}
                                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Description</label>
                                    <Textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                        rows={3}
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
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
                                        <label className="block text-sm font-medium mb-1">Client Name</label>
                                        <Input
                                            value={formData.client_name}
                                            onChange={(e) => setFormData(prev => ({ ...prev, client_name: e.target.value }))}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Project URL</label>
                                    <Input
                                        value={formData.project_url}
                                        onChange={(e) => setFormData(prev => ({ ...prev, project_url: e.target.value }))}
                                        placeholder="https://..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Thumbnail Image</label>
                                    <div className="flex gap-4 items-center">
                                        {formData.thumbnail_url ? (
                                            <div className="relative">
                                                <img src={formData.thumbnail_url} alt="Thumbnail" className="w-32 h-24 object-cover rounded-lg" />
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData(prev => ({ ...prev, thumbnail_url: '' }))}
                                                    className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </div>
                                        ) : (
                                            <label className="w-32 h-24 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 transition-colors bg-slate-50 dark:bg-slate-800/50">
                                                {uploading ? <Loader2 className="w-6 h-6 animate-spin text-slate-400" /> : <Upload className="w-6 h-6 text-slate-400" />}
                                                <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">Upload</span>
                                                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                            </label>
                                        )}
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Or paste image URL:</p>
                                        <Input
                                            value={formData.thumbnail_url}
                                            onChange={(e) => setFormData(prev => ({ ...prev, thumbnail_url: e.target.value }))}
                                            placeholder="https://..."
                                            className="flex-1"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Tech Stack</label>
                                    <div className="flex gap-2 mb-2">
                                        <Input
                                            value={newTech}
                                            onChange={(e) => setNewTech(e.target.value)}
                                            placeholder="Add technology"
                                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                                        />
                                        <Button type="button" onClick={addTech} variant="outline">Add</Button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {formData.tech_stack.map((tech, i) => (
                                            <span key={i} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm flex items-center gap-2">
                                                {tech}
                                                <button type="button" onClick={() => removeTech(i)} className="text-slate-500 dark:text-slate-400 hover:text-red-500">×</button>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <label className="flex items-center gap-2">
                                        <Switch
                                            checked={formData.is_featured}
                                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_featured: checked }))}
                                        />
                                        <span className="text-sm">Featured</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <Switch
                                            checked={formData.is_active}
                                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
                                        />
                                        <span className="text-sm">Active</span>
                                    </label>
                                </div>
                                <div className="flex justify-end gap-3 pt-4">
                                    <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                                    <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700" disabled={createMutation.isPending || updateMutation.isPending}>
                                        {(createMutation.isPending || updateMutation.isPending) && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                        {editingProject ? 'Update' : 'Create'}
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                    {isLoading ? (
                        <div className="col-span-full text-center py-12"><Loader2 className="w-6 h-6 animate-spin mx-auto" /></div>
                    ) : projects.length === 0 ? (
                        <div className="col-span-full text-center py-12 text-slate-500">No projects yet. Add your first project.</div>
                    ) : (
                        projects.map((project) => (
                            <div key={project.id} className="bg-slate-50 dark:bg-slate-800/50 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 transition-all hover:shadow-md">
                                <div className="aspect-video relative group">
                                    {project.thumbnail_url ? (
                                        <img src={project.thumbnail_url} alt={project.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500">No Image</div>
                                    )}
                                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button size="icon" variant="secondary" className="h-8 w-8 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm" onClick={() => handleEdit(project)}>
                                            <Pencil className="w-3 h-3" />
                                        </Button>
                                        <Button size="icon" variant="secondary" className="h-8 w-8 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm hover:bg-red-100 dark:hover:bg-red-500/20" onClick={() => deleteMutation.mutate(project.id)}>
                                            <Trash2 className="w-3 h-3 text-red-500" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 capitalize">{project.category?.replace('-', ' ')}</span>
                                    <h3 className="font-semibold text-slate-900 dark:text-white mt-1">{project.title}</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">{project.description}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}