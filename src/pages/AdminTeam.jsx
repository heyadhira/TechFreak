import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Plus, Pencil, Trash2, Loader2, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AdminLayout from '../components/admin/AdminLayout';
import { toast } from 'sonner';

export default function AdminTeam() {
    const [isOpen, setIsOpen] = useState(false);
    const [editingMember, setEditingMember] = useState(null);
    const [formData, setFormData] = useState({
        name: '', designation: '', bio: '', photo_url: '', email: '',
        linkedin: '', twitter: '', github: '', order: 0, is_active: true
    });
    const [uploading, setUploading] = useState(false);

    const queryClient = useQueryClient();

    const { data: members, isLoading } = useQuery({
        queryKey: ['admin-team'],
        queryFn: () => base44.entities.TeamMember.list(),
        initialData: []
    });

    const createMutation = useMutation({
        mutationFn: (data) => base44.entities.TeamMember.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-team'] });
            setIsOpen(false);
            resetForm();
            toast.success('Team member added successfully');
        }
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => base44.entities.TeamMember.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-team'] });
            setIsOpen(false);
            resetForm();
            toast.success('Team member updated successfully');
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => base44.entities.TeamMember.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-team'] });
            toast.success('Team member removed successfully');
        }
    });

    const resetForm = () => {
        setFormData({
            name: '', designation: '', bio: '', photo_url: '', email: '',
            linkedin: '', twitter: '', github: '', order: 0, is_active: true
        });
        setEditingMember(null);
    };

    const handleEdit = (member) => {
        setEditingMember(member);
        setFormData({
            name: member.name || '',
            designation: member.designation || '',
            bio: member.bio || '',
            photo_url: member.photo_url || '',
            email: member.email || '',
            linkedin: member.linkedin || '',
            twitter: member.twitter || '',
            github: member.github || '',
            order: member.order || 0,
            is_active: member.is_active !== false
        });
        setIsOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingMember) {
            updateMutation.mutate({ id: editingMember.id, data: formData });
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
        <AdminLayout currentPage="AdminTeam" title="Manage Team">
            <div className="bg-white rounded-2xl shadow-sm">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <p className="text-slate-600">Add and manage team members</p>
                    <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
                        <DialogTrigger asChild>
                            <Button className="bg-indigo-600 hover:bg-indigo-700">
                                <Plus className="w-4 h-4 mr-2" /> Add Member
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>{editingMember ? 'Edit Team Member' : 'Add Team Member'}</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                                <div className="flex justify-center mb-4">
                                    {formData.photo_url ? (
                                        <div className="relative">
                                            <img src={formData.photo_url} alt="Photo" className="w-32 h-32 object-cover rounded-full" />
                                            <button
                                                type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, photo_url: '' }))}
                                                className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="w-32 h-32 border-2 border-dashed border-slate-300 rounded-full flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 transition-colors">
                                            {uploading ? <Loader2 className="w-6 h-6 animate-spin text-slate-400" /> : <Upload className="w-6 h-6 text-slate-400" />}
                                            <span className="text-xs text-slate-500 mt-1">Upload Photo</span>
                                            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                        </label>
                                    )}
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Name</label>
                                        <Input
                                            value={formData.name}
                                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Designation</label>
                                        <Input
                                            value={formData.designation}
                                            onChange={(e) => setFormData(prev => ({ ...prev, designation: e.target.value }))}
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Bio</label>
                                    <Textarea
                                        value={formData.bio}
                                        onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                                        rows={3}
                                        placeholder="Brief description..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Email</label>
                                    <Input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                    />
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">LinkedIn</label>
                                        <Input
                                            value={formData.linkedin}
                                            onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                                            placeholder="URL"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Twitter</label>
                                        <Input
                                            value={formData.twitter}
                                            onChange={(e) => setFormData(prev => ({ ...prev, twitter: e.target.value }))}
                                            placeholder="URL"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">GitHub</label>
                                        <Input
                                            value={formData.github}
                                            onChange={(e) => setFormData(prev => ({ ...prev, github: e.target.value }))}
                                            placeholder="URL"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium mb-1">Display Order</label>
                                        <Input
                                            type="number"
                                            value={formData.order}
                                            onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                                        />
                                    </div>
                                    <label className="flex items-center gap-2 pt-6">
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
                                        {editingMember ? 'Update' : 'Add'}
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
                    {isLoading ? (
                        <div className="col-span-full text-center py-12"><Loader2 className="w-6 h-6 animate-spin mx-auto" /></div>
                    ) : members.length === 0 ? (
                        <div className="col-span-full text-center py-12 text-slate-500">No team members yet. Add your first member.</div>
                    ) : (
                        members.map((member) => (
                            <div key={member.id} className="bg-slate-50 rounded-xl p-6 text-center relative group">
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                    <Button size="icon" variant="secondary" className="h-8 w-8" onClick={() => handleEdit(member)}>
                                        <Pencil className="w-3 h-3" />
                                    </Button>
                                    <Button size="icon" variant="secondary" className="h-8 w-8 hover:bg-red-100" onClick={() => deleteMutation.mutate(member.id)}>
                                        <Trash2 className="w-3 h-3 text-red-500" />
                                    </Button>
                                </div>
                                <img
                                    src={member.photo_url || `https://ui-avatars.com/api/?name=${member.name}&background=6366f1&color=fff&size=150`}
                                    alt={member.name}
                                    className="w-24 h-24 rounded-full mx-auto object-cover mb-4"
                                />
                                <h3 className="font-semibold text-slate-900">{member.name}</h3>
                                <p className="text-sm text-indigo-600">{member.designation}</p>
                                {member.bio && <p className="text-sm text-slate-500 mt-2 line-clamp-2">{member.bio}</p>}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}