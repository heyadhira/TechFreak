import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { localClient } from '@/api/localClient';
import { Plus, Pencil, Trash2, Loader2, Upload, X, Users, Github, Linkedin, Twitter, Mail, Fingerprint, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import AdminLayout from '../components/admin/AdminLayout';
import { toast } from 'sonner';
import Magnetic from '../components/ui/Magnetic';
import GlassCard from '../components/ui/GlassCard';

export default function AdminTeam() {
    const [isOpen, setIsOpen] = useState(false);
    const [editingMember, setEditingMember] = useState(null);
    const [formData, setFormData] = useState({
        name: '', designation: '', bio: '', photo_url: '', email: '',
        linkedin: '', twitter: '', github: '', order: 0, is_active: true
    });
    const [uploading, setUploading] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const queryClient = useQueryClient();

    const { data: members = [], isLoading } = useQuery({
        queryKey: ['admin-team'],
        queryFn: () => localClient.get('/team'),
    });

    const createMutation = useMutation({
        mutationFn: (data) => localClient.post('/team', data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-team'] });
            setIsOpen(false);
            resetForm();
            toast.success('Operative assigned successfully');
        }
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => localClient.put(`/team/${id}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-team'] });
            setIsOpen(false);
            resetForm();
            toast.success('Operative profile re-calibrated');
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => localClient.delete(`/team/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-team'] });
            toast.success('Operative decommissioned');
            setDeleteId(null);
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
        const uploadFormData = new FormData();
        uploadFormData.append('file', file);
        uploadFormData.append('folder', 'team');

        try {
            const response = await localClient.post('/upload', uploadFormData);
            setFormData(prev => ({ ...prev, photo_url: response.url }));
            toast.success('Identity asset synchronized');
        } catch (error) {
            toast.error('Asset sync failed');
        } finally {
            setUploading(false);
        }
    };

    return (
        <AdminLayout currentPage="AdminTeam" title="Operative Roster">
            <div className="mb-12 flex justify-between items-end">
                <div>
                    <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] mb-2 flex items-center gap-2">
                        <Users className="w-3 h-3 text-indigo-500" />
                        Neural Network / Human Assets
                    </p>
                    <p className="text-slate-400 max-w-xl text-sm leading-relaxed">
                        Managing authorized operatives and high-performance engineering units.
                    </p>
                </div>
                <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
                    <DialogTrigger asChild>
                        <Magnetic strength={0.2}>
                            <Button className="h-14 px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-indigo-600/30">
                                <Plus className="w-4 h-4 mr-2" /> Assign New Operative
                            </Button>
                        </Magnetic>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl bg-slate-900 border-white/5 backdrop-blur-3xl p-10 rounded-[3.5rem]">
                        <DialogHeader>
                            <DialogTitle className="text-3xl font-black text-white uppercase italic tracking-tighter">
                                {editingMember ? 'Verify Operative' : 'Authorize New Asset'}
                            </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-6 mt-8">
                            <div className="flex justify-center mb-8">
                                {formData.photo_url ? (
                                    <div className="relative group">
                                        <img src={formData.photo_url} alt="Photo" className="w-40 h-40 object-cover rounded-full border-4 border-indigo-500/20 shadow-2xl" />
                                        <button
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, photo_url: '' }))}
                                            className="absolute top-2 right-2 w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center border-2 border-slate-900 opacity-0 group-hover:opacity-100 transition-all"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                ) : (
                                    <label className="w-40 h-40 border-2 border-dashed border-white/10 rounded-full flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 transition-all group overflow-hidden bg-white/2">
                                        {uploading ? <Loader2 className="w-8 h-8 animate-spin text-indigo-500" /> : <Upload className="w-8 h-8 text-slate-500 group-hover:text-indigo-400" />}
                                        <span className="text-[8px] font-black uppercase tracking-widest text-slate-500 mt-2">Sync Identity</span>
                                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                    </label>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Full Name</label>
                                    <Input
                                        className="h-14 bg-slate-950/50 border-white/5 rounded-2xl px-6 text-white outline-none focus:bg-slate-950/80 transition-all placeholder:text-slate-600"
                                        value={formData.name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Authorized Designation</label>
                                    <Input
                                        className="h-14 bg-slate-950/50 border-white/5 rounded-2xl px-6 text-white outline-none focus:bg-slate-950/80 transition-all placeholder:text-slate-600"
                                        value={formData.designation}
                                        onChange={(e) => setFormData(prev => ({ ...prev, designation: e.target.value }))}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Operative Dossier (Bio)</label>
                                <Textarea
                                    className="bg-slate-950/50 border-white/5 rounded-2xl px-6 py-4 text-white min-h-[100px] outline-none focus:bg-slate-950/80 transition-all placeholder:text-slate-600 no-scrollbar"
                                    value={formData.bio}
                                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                                    placeholder="Brief background..."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Direct Frequency (Email)</label>
                                    <Input
                                        className="h-14 bg-slate-950/50 border-white/5 rounded-2xl px-6 text-white outline-none focus:bg-slate-950/80 transition-all placeholder:text-slate-600"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Protocols (LinkedIn/Twitter/GitHub)</label>
                                    <div className="flex gap-2">
                                        <Input
                                            className="h-14 bg-slate-950/50 border-white/5 rounded-2xl px-6 text-white text-[10px] outline-none focus:bg-slate-950/80 transition-all placeholder:text-slate-600"
                                            value={formData.github}
                                            onChange={(e) => setFormData(prev => ({ ...prev, github: e.target.value }))}
                                            placeholder="GitHub URL"
                                        />
                                        <Input
                                            className="h-14 bg-slate-950/50 border-white/5 rounded-2xl px-6 text-white text-[10px] outline-none focus:bg-slate-950/80 transition-all placeholder:text-slate-600"
                                            value={formData.linkedin}
                                            onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                                            placeholder="LinkedIn URL"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-12 bg-white/2 p-6 rounded-[2rem] border border-white/5">
                                <div className="flex-1 flex items-center gap-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Node Order</label>
                                    <Input
                                        type="number"
                                        className="h-10 w-20 bg-slate-950/50 border-white/5 rounded-xl px-4 text-white text-xs outline-none focus:bg-slate-950/80 transition-all placeholder:text-slate-600"
                                        value={formData.order}
                                        onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                                    />
                                </div>
                                <label className="flex items-center gap-4 cursor-pointer">
                                    <Switch
                                        checked={formData.is_active}
                                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
                                    />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Live Node</span>
                                </label>
                            </div>

                            <div className="flex justify-end gap-6 pt-4">
                                <Button type="button" variant="ghost" onClick={() => setIsOpen(false)} className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Abort</Button>
                                <Button type="submit" className="h-14 px-12 bg-white text-slate-950 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">
                                    {(createMutation.isPending || updateMutation.isPending) && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                    {editingMember ? 'Verify Re-Calibration' : 'Authorize Asset'}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>

                <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
                    <AlertDialogContent className="bg-slate-900 border-white/5 backdrop-blur-3xl rounded-[2.5rem] p-10">
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-2xl font-black text-white uppercase italic tracking-tighter">Decommission Operative?</AlertDialogTitle>
                            <AlertDialogDescription className="text-slate-400 font-medium">
                                This action will purge the operative's credentials and history from the active roster. This protocol is irreversible.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="mt-8 gap-4">
                            <AlertDialogCancel className="h-12 border-white/5 bg-white/2 rounded-xl font-bold">Abort Purge</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteMutation.mutate(deleteId)} className="h-12 bg-red-600 hover:bg-red-700 rounded-xl font-bold uppercase tracking-widest text-xs">
                                {deleteMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Confirm Purge'}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
                {isLoading ? (
                    <div className="col-span-full text-center py-24"><Loader2 className="w-10 h-10 animate-spin mx-auto text-indigo-500" /></div>
                ) : members.length === 0 ? (
                    <div className="col-span-full text-center py-24 text-slate-500 font-black uppercase tracking-widest text-xs">No active operatives detected in network.</div>
                ) : (
                    members.map((member) => (
                        <div key={member.id} className="group relative">
                            <GlassCard
                                className="overflow-hidden rounded-[3rem] border border-white/5 bg-slate-900/40 backdrop-blur-3xl p-8 text-center transition-all duration-700 hover:bg-indigo-600/5 hover:border-indigo-500/30 group-hover:-translate-y-2"
                                glowColor="rgba(99, 102, 241, 0.1)"
                            >
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 flex gap-2">
                                    <Magnetic strength={0.3}>
                                        <button onClick={() => handleEdit(member)} className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-indigo-600 transition-all">
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                    </Magnetic>
                                    <Magnetic strength={0.3}>
                                        <button onClick={() => setDeleteId(member.id)} className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-red-600 transition-all">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </Magnetic>
                                </div>

                                <div className="relative inline-block mb-6">
                                    <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full scale-50 group-hover:scale-100 transition-transform duration-1000" />
                                    <img
                                        src={member.photo_url || `https://ui-avatars.com/api/?name=${member.name}&background=6366f1&color=fff&size=150`}
                                        alt={member.name}
                                        className="w-32 h-32 rounded-full mx-auto object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 border-4 border-white/5 group-hover:border-indigo-500/30 relative z-10"
                                    />
                                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-slate-900 rounded-full border border-indigo-500/30 flex items-center justify-center z-20">
                                        <Fingerprint className="w-5 h-5 text-indigo-400" />
                                    </div>
                                </div>

                                <h3 className="text-xl font-black text-white tracking-tighter uppercase italic group-hover:text-indigo-400 transition-colors mb-2">{member.name}</h3>
                                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-4">{member.designation}</p>

                                <div className="flex justify-center gap-4 mb-6">
                                    {member.github && (
                                        <a href={member.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/2 rounded-lg border border-white/5 text-slate-500 hover:text-white hover:bg-white/10 transition-all">
                                            <Github className="w-4 h-4" />
                                        </a>
                                    )}
                                    {member.linkedin && (
                                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/2 rounded-lg border border-white/5 text-slate-500 hover:text-white hover:bg-white/10 transition-all">
                                            <Linkedin className="w-4 h-4" />
                                        </a>
                                    )}
                                    {member.email && (
                                        <a href={`mailto:${member.email}`} className="p-2 bg-white/2 rounded-lg border border-white/5 text-slate-500 hover:text-white hover:bg-white/10 transition-all">
                                            <Mail className="w-4 h-4" />
                                        </a>
                                    )}
                                </div>

                                {member.bio && (
                                    <p className="text-xs text-slate-500 font-medium leading-relaxed italic line-clamp-2">"{member.bio}"</p>
                                )}

                                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-4">
                                    <Activity className="w-3 h-3 text-emerald-500" />
                                    <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Efficiency Index: Optimal</span>
                                </div>
                            </GlassCard>
                        </div>
                    ))
                )}
            </div>
        </AdminLayout>
    );
}