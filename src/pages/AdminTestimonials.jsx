import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Plus, Pencil, Trash2, Loader2, Upload, X, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AdminLayout from '../components/admin/AdminLayout';
import { toast } from 'sonner';

export default function AdminTestimonials() {
    const [isOpen, setIsOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        client_name: '', client_designation: '', company: '', photo_url: '',
        content: '', rating: 5, project_type: '', is_featured: false, is_active: true
    });
    const [uploading, setUploading] = useState(false);

    const queryClient = useQueryClient();

    const { data: testimonials, isLoading } = useQuery({
        queryKey: ['admin-testimonials'],
        queryFn: () => base44.entities.Testimonial.list(),
        initialData: []
    });

    const createMutation = useMutation({
        mutationFn: (data) => base44.entities.Testimonial.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-testimonials'] });
            setIsOpen(false);
            resetForm();
            toast.success('Testimonial added successfully');
        }
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => base44.entities.Testimonial.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-testimonials'] });
            setIsOpen(false);
            resetForm();
            toast.success('Testimonial updated successfully');
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => base44.entities.Testimonial.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-testimonials'] });
            toast.success('Testimonial deleted successfully');
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
        const { file_url } = await base44.integrations.Core.UploadFile({ file });
        setFormData(prev => ({ ...prev, photo_url: file_url }));
        setUploading(false);
    };

    return (
        <AdminLayout currentPage="AdminTestimonials" title="Manage Testimonials">
            <div className="bg-white rounded-2xl shadow-sm">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <p className="text-slate-600">Showcase client feedback</p>
                    <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
                        <DialogTrigger asChild>
                            <Button className="bg-indigo-600 hover:bg-indigo-700">
                                <Plus className="w-4 h-4 mr-2" /> Add Testimonial
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>{editingItem ? 'Edit Testimonial' : 'Add Testimonial'}</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                                <div className="flex gap-4 items-start">
                                    {formData.photo_url ? (
                                        <div className="relative">
                                            <img src={formData.photo_url} alt="Photo" className="w-20 h-20 object-cover rounded-full" />
                                            <button
                                                type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, photo_url: '' }))}
                                                className="absolute -top-1 -right-1 p-1 bg-red-500 text-white rounded-full"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="w-20 h-20 border-2 border-dashed border-slate-300 rounded-full flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 transition-colors flex-shrink-0">
                                            {uploading ? <Loader2 className="w-5 h-5 animate-spin text-slate-400" /> : <Upload className="w-5 h-5 text-slate-400" />}
                                            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                        </label>
                                    )}
                                    <div className="flex-1 space-y-3">
                                        <Input
                                            value={formData.client_name}
                                            onChange={(e) => setFormData(prev => ({ ...prev, client_name: e.target.value }))}
                                            placeholder="Client Name"
                                            required
                                        />
                                        <Input
                                            value={formData.client_designation}
                                            onChange={(e) => setFormData(prev => ({ ...prev, client_designation: e.target.value }))}
                                            placeholder="Designation"
                                        />
                                        <Input
                                            value={formData.company}
                                            onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                                            placeholder="Company"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Testimonial</label>
                                    <Textarea
                                        value={formData.content}
                                        onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                                        rows={4}
                                        placeholder="What did the client say about your service?"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Rating</label>
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                                                    className="p-1"
                                                >
                                                    <Star className={`w-6 h-6 ${star <= formData.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`} />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Project Type</label>
                                        <Input
                                            value={formData.project_type}
                                            onChange={(e) => setFormData(prev => ({ ...prev, project_type: e.target.value }))}
                                            placeholder="e.g., E-Commerce Website"
                                        />
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
                                        {editingItem ? 'Update' : 'Add'}
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="grid md:grid-cols-2 gap-6 p-6">
                    {isLoading ? (
                        <div className="col-span-full text-center py-12"><Loader2 className="w-6 h-6 animate-spin mx-auto" /></div>
                    ) : testimonials.length === 0 ? (
                        <div className="col-span-full text-center py-12 text-slate-500">No testimonials yet. Add your first testimonial.</div>
                    ) : (
                        testimonials.map((item) => (
                            <div key={item.id} className="bg-slate-50 rounded-xl p-6 relative group">
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                    <Button size="icon" variant="secondary" className="h-8 w-8" onClick={() => handleEdit(item)}>
                                        <Pencil className="w-3 h-3" />
                                    </Button>
                                    <Button size="icon" variant="secondary" className="h-8 w-8 hover:bg-red-100" onClick={() => deleteMutation.mutate(item.id)}>
                                        <Trash2 className="w-3 h-3 text-red-500" />
                                    </Button>
                                </div>
                                <div className="flex gap-1 mb-3">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-4 h-4 ${i < item.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`} />
                                    ))}
                                </div>
                                <p className="text-slate-700 mb-4 italic">"{item.content}"</p>
                                <div className="flex items-center gap-3">
                                    <img
                                        src={item.photo_url || `https://ui-avatars.com/api/?name=${item.client_name}&background=6366f1&color=fff&size=100`}
                                        alt={item.client_name}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="font-semibold text-slate-900">{item.client_name}</p>
                                        <p className="text-sm text-slate-600">
                                            {item.client_designation}{item.company && `, ${item.company}`}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}