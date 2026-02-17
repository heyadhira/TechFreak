import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { localClient } from '@/api/localClient';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AdminLayout from '../components/admin/AdminLayout';
import { toast } from 'sonner';

const iconOptions = ['Globe', 'ShoppingCart', 'Smartphone', 'Search', 'PenTool', 'Server', 'Code2', 'Palette', 'Gauge'];

export default function AdminServices() {
    const [isOpen, setIsOpen] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [formData, setFormData] = useState({
        title: '', slug: '', description: '', long_description: '', icon: 'Globe', price_starting: 0,
        features: [], image_url: '', is_featured: false, is_active: true, order: 0
    });
    const [newFeature, setNewFeature] = useState('');

    const queryClient = useQueryClient();

    const { data: services, isLoading } = useQuery({
        queryKey: ['admin-services'],
        queryFn: () => localClient.get('/services'),
        initialData: []
    });

    const createMutation = useMutation({
        mutationFn: (data) => localClient.post('/services', data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-services'] });
            setIsOpen(false);
            resetForm();
            toast.success('Service created successfully');
        }
    });

    const updateMutation = useMutation({
        /** @param {{id: any, data: any}} variables */
        mutationFn: (variables) => localClient.put(`/services/${variables.id}`, variables.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-services'] });
            setIsOpen(false);
            resetForm();
            toast.success('Service updated successfully');
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => localClient.delete(`/services/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-services'] });
            toast.success('Service deleted successfully');
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

    return (
        <AdminLayout currentPage="AdminServices" title="Manage Services">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <p className="text-slate-600 dark:text-slate-400">Add and manage your service offerings</p>
                    <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
                        <DialogTrigger asChild>
                            <Button className="bg-indigo-600 hover:bg-indigo-700">
                                <Plus className="w-4 h-4 mr-2" /> Add Service
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>{editingService ? 'Edit Service' : 'Add New Service'}</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Title</label>
                                    <Input
                                        value={formData.title}
                                        onChange={(e) => {
                                            const title = e.target.value;
                                            const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                                            setFormData(prev => ({ ...prev, title, slug: editingService ? prev.slug : slug }));
                                        }}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Slug (URL-friendly, auto-generated)</label>
                                    <Input
                                        value={formData.slug}
                                        onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                                        placeholder="auto-generated-from-title"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Short Description</label>
                                    <Textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                        rows={3}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Detailed Description (for service detail page)</label>
                                    <Textarea
                                        value={formData.long_description}
                                        onChange={(e) => setFormData(prev => ({ ...prev, long_description: e.target.value }))}
                                        rows={5}
                                        placeholder="Detailed description shown on the individual service page..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Service Image URL</label>
                                    <Input
                                        value={formData.image_url}
                                        onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                                        placeholder="https://..."
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Icon</label>
                                        <select
                                            value={formData.icon}
                                            onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                                            className="w-full h-10 px-3 rounded-md border border-input bg-background"
                                        >
                                            {iconOptions.map(icon => (
                                                <option key={icon} value={icon}>{icon}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Starting Price (₹)</label>
                                        <Input
                                            type="number"
                                            value={formData.price_starting}
                                            onChange={(e) => setFormData(prev => ({ ...prev, price_starting: parseInt(e.target.value) || 0 }))}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Features</label>
                                    <div className="flex gap-2 mb-2">
                                        <Input
                                            value={newFeature}
                                            onChange={(e) => setNewFeature(e.target.value)}
                                            placeholder="Add a feature"
                                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                                        />
                                        <Button type="button" onClick={addFeature} variant="outline">Add</Button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {formData.features.map((feature, i) => (
                                            <span key={i} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-sm flex items-center gap-2">
                                                {feature}
                                                <button type="button" onClick={() => removeFeature(i)} className="text-slate-500 dark:text-slate-400 hover:text-red-500">×</button>
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
                                        {editingService ? 'Update' : 'Create'}
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 dark:bg-slate-800/50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {isLoading ? (
                                <tr><td colSpan={4} className="px-6 py-12 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto" /></td></tr>
                            ) : services.length === 0 ? (
                                <tr><td colSpan={4} className="px-6 py-12 text-center text-slate-500">No services yet. Add your first service.</td></tr>
                            ) : (
                                services.map((service) => (
                                    <tr key={service.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-medium text-slate-900 dark:text-white">{service.title}</p>
                                                <p className="text-sm text-slate-500 dark:text-slate-400 truncate max-w-xs">{service.description}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600 dark:text-slate-400 font-medium">₹{service.price_starting?.toLocaleString('en-IN')}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${service.is_active !== false ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-400'}`}>
                                                {service.is_active !== false ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <Button variant="ghost" size="icon" onClick={() => handleEdit(service)}><Pencil className="w-4 h-4" /></Button>
                                                <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(service.id)} className="text-red-500 hover:text-red-700">
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