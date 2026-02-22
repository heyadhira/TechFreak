import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { localClient } from '@/api/localClient';
import { Eye, Trash2, Loader2, Mail, Phone, Building, Calendar, Download, Zap, Radio, Shield, Fingerprint, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import AdminLayout from '../components/admin/AdminLayout';
import { format } from 'date-fns';
import { toast } from 'sonner';
import Magnetic from '../components/ui/Magnetic';

const statusOptions = [
    { value: 'new', label: 'Inbound Signal', color: 'bg-indigo-600/20 border-indigo-500/30 text-indigo-400' },
    { value: 'contacted', label: 'Establishing Link', color: 'bg-amber-600/20 border-amber-500/30 text-amber-400' },
    { value: 'qualified', label: 'Verified Target', color: 'bg-purple-600/20 border-purple-500/30 text-purple-400' },
    { value: 'proposal-sent', label: 'Transmitting Data', color: 'bg-blue-600/20 border-blue-500/30 text-blue-400' },
    { value: 'negotiation', label: 'Strategic Alignment', color: 'bg-orange-600/20 border-orange-500/30 text-orange-400' },
    { value: 'won', label: 'Alliance Secured', color: 'bg-green-600/20 border-green-500/30 text-green-400' },
    { value: 'lost', label: 'Connection Dropped', color: 'bg-red-600/20 border-red-500/30 text-red-500' }
];

const budgetLabels = {
    'under-10k': 'Under ₹10,000',
    '10k-25k': '₹10,000 - ₹25,000',
    '25k-50k': '₹25,000 - ₹50,000',
    '50k-1lakh': '₹50,000 - ₹1,00,000',
    'above-1lakh': 'Above ₹1,00,000'
};

export default function AdminLeads() {
    const [selectedLead, setSelectedLead] = useState(null);
    const [statusFilter, setStatusFilter] = useState('all');
    const queryClient = useQueryClient();

    const { data: leadsData, isLoading } = useQuery({
        queryKey: ['admin-leads'],
        queryFn: () => localClient.get('/leads'),
    });

    const leads = leadsData || [];

    const updateMutation = useMutation({
        mutationFn: (variables) => localClient.put(`/leads/${variables.id}`, variables.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-leads'] });
            toast.success('Transmission updated');
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => localClient.delete(`/leads/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-leads'] });
            toast.success('Signal purged');
        }
    });

    const viewLead = (lead) => {
        setSelectedLead(lead);
        if (!lead.is_read) {
            updateMutation.mutate({ id: lead.id, data: { is_read: true } });
        }
    };

    const updateStatus = (leadId, status) => {
        updateMutation.mutate({ id: leadId, data: { status } });
    };

    const updateNotes = (notes) => {
        if (selectedLead) {
            updateMutation.mutate({ id: selectedLead.id, data: { notes } });
        }
    };

    const filteredLeads = statusFilter === 'all' ? leads : leads.filter(l => l.status === statusFilter);

    const exportToCSV = () => {
        const headers = ['Name', 'Email', 'Phone', 'Company', 'Service', 'Budget', 'Status', 'Message', 'Date'];
        const rows = leads.map(l => [
            l.name, l.email, l.phone || '', l.company || '', l.service_interested || '',
            budgetLabels[l.budget] || l.budget || '', l.status || 'new', l.message || '',
            l.created_at ? format(new Date(l.created_at), 'yyyy-MM-dd') : ''
        ]);

        const csvContent = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `transmissions-${format(new Date(), 'yyyy-MM-dd')}.csv`;
        a.click();
    };

    return (
        <AdminLayout currentPage="AdminLeads" title="Transmission Log">
            <div className="mb-12 flex flex-wrap gap-8 justify-between items-end">
                <div>
                    <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] mb-2 flex items-center gap-2">
                        <Radio className="w-3 h-3 text-indigo-500 animate-pulse" />
                        Live Intercepts / Leads
                    </p>
                    <p className="text-slate-400 max-w-xl text-sm leading-relaxed">
                        Monitor and decode inbound project transmissions from visionary partners.
                    </p>
                </div>

                <div className="flex items-center gap-6">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-56 h-14 bg-white/5 border-white/10 rounded-2xl px-6 text-white text-xs font-black uppercase tracking-widest">
                            <SelectValue placeholder="Signal Priority" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-white/10 text-white rounded-2xl">
                            <SelectItem value="all">All Channels</SelectItem>
                            {statusOptions.map(opt => (
                                <SelectItem key={opt.value} value={opt.value} className="text-[10px] font-black uppercase tracking-widest">{opt.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Magnetic strength={0.2}>
                        <Button variant="outline" onClick={exportToCSV} className="h-14 px-8 border-white/10 bg-white/5 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/10">
                            <Download className="w-4 h-4 mr-3 text-indigo-400" /> Archival Extract
                        </Button>
                    </Magnetic>
                </div>
            </div>

            <div className="bg-slate-900/40 backdrop-blur-3xl rounded-[3rem] border border-white/5 overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-white/2">
                                <th className="px-10 py-8 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Partner ID</th>
                                <th className="px-10 py-8 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Digital Link</th>
                                <th className="px-10 py-8 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Target Module</th>
                                <th className="px-10 py-8 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Signal State</th>
                                <th className="px-10 py-8 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Sync Time</th>
                                <th className="px-10 py-8 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Access</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {isLoading ? (
                                <tr><td colSpan={6} className="px-10 py-20 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-indigo-500" /></td></tr>
                            ) : filteredLeads.length === 0 ? (
                                <tr><td colSpan={6} className="px-10 py-20 text-center text-slate-500 font-bold uppercase tracking-widest text-xs">No transmissions detected in frequency.</td></tr>
                            ) : (
                                filteredLeads.map((lead) => (
                                    <tr key={lead.id} className={`${!lead.is_read ? 'bg-indigo-600/10' : ''} hover:bg-white/5 transition-all group`}>
                                        <td className="px-10 py-8">
                                            <div className="flex items-center gap-6">
                                                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-indigo-600 transition-all duration-500">
                                                    <Fingerprint className="w-6 h-6 text-white" />
                                                </div>
                                                <div>
                                                    <p className="text-lg font-black text-white tracking-tighter uppercase italic">{lead.name}</p>
                                                    {lead.company && <p className="text-[10px] text-indigo-400 font-black uppercase tracking-[0.2em]">{lead.company}</p>}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <p className="text-sm text-white font-bold tracking-tight">{lead.email}</p>
                                            {lead.phone && <p className="text-[10px] text-slate-500 font-bold">{lead.phone}</p>}
                                        </td>
                                        <td className="px-10 py-8 text-xs font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">{lead.service_interested || '-'}</td>
                                        <td className="px-10 py-8">
                                            <Select value={lead.status || 'new'} onValueChange={(value) => updateStatus(lead.id, value)}>
                                                <SelectTrigger className={`h-10 px-4 rounded-xl text-[9px] font-black uppercase tracking-[0.1em] border-none ${statusOptions.find(o => o.value === (lead.status || 'new'))?.color}`}>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent className="bg-slate-900 border-white/10 text-white rounded-xl">
                                                    {statusOptions.map(opt => (
                                                        <SelectItem key={opt.value} value={opt.value} className="text-[10px] font-black uppercase tracking-widest">{opt.label}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </td>
                                        <td className="px-10 py-8 text-[10px] font-black text-slate-600 uppercase tracking-widest">
                                            {lead.created_at && format(new Date(lead.created_at), 'MMM d, yyyy')}
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="flex gap-4">
                                                <Magnetic strength={0.3}>
                                                    <button onClick={() => viewLead(lead)} className="w-12 h-12 rounded-xl bg-white/2 border border-white/5 flex items-center justify-center hover:bg-white/10 text-slate-400 hover:text-white transition-all">
                                                        <Eye className="w-5 h-5" />
                                                    </button>
                                                </Magnetic>
                                                <Magnetic strength={0.3}>
                                                    <button onClick={() => deleteMutation.mutate(lead.id)} className="w-12 h-12 rounded-xl bg-white/2 border border-white/5 flex items-center justify-center hover:bg-red-500/20 text-slate-400 hover:text-red-500 transition-all">
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

            {/* Signal Detail Modal */}
            <Dialog open={!!selectedLead} onOpenChange={(open) => !open && setSelectedLead(null)}>
                <DialogContent className="max-w-3xl bg-slate-900 border-white/5 backdrop-blur-3xl p-12 rounded-[4rem]">
                    <DialogHeader className="mb-8">
                        <DialogTitle className="text-4xl font-black text-white uppercase italic tracking-tighter">
                            Transmission Decoded
                        </DialogTitle>
                        <div className="flex items-center gap-2 mt-2">
                            <Activity className="w-4 h-4 text-indigo-500" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Live Intercept Integrity: 100%</span>
                        </div>
                    </DialogHeader>
                    {selectedLead && (
                        <div className="space-y-8 mt-4 overflow-y-auto max-h-[70vh] pr-4 no-scrollbar">
                            <div className="flex items-center gap-8 p-8 bg-white/2 border border-white/5 rounded-[2.5rem]">
                                <div className="w-24 h-24 rounded-3xl bg-indigo-600 flex items-center justify-center text-4xl font-black text-white shadow-2xl">
                                    {selectedLead.name?.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-3xl font-black text-white tracking-tighter uppercase italic mb-2">{selectedLead.name}</h3>
                                    <div className="flex flex-wrap gap-4">
                                        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest px-4 py-1 bg-indigo-600/10 rounded-full border border-indigo-500/20 flex items-center gap-2">
                                            <Building className="w-3 h-3 text-indigo-500" /> {selectedLead.company || 'Individual Operative'}
                                        </span>
                                        <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest px-4 py-1 bg-amber-600/10 rounded-full border border-amber-500/20 flex items-center gap-2">
                                            <Zap className="w-3 h-3 text-amber-500" /> {selectedLead.service_interested || 'General Transmission'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="flex items-center gap-6 p-6 bg-white/2 border border-white/5 rounded-3xl">
                                    <Mail className="w-6 h-6 text-slate-500" />
                                    <div>
                                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Frequency</p>
                                        <a href={`mailto:${selectedLead.email}`} className="text-white font-black hover:text-indigo-400 transition-colors uppercase tracking-tight">{selectedLead.email}</a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 p-6 bg-white/2 border border-white/5 rounded-3xl">
                                    <Phone className="w-6 h-6 text-slate-500" />
                                    <div>
                                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Voice Link</p>
                                        <p className="text-white font-black uppercase tracking-tight">{selectedLead.phone || 'DATA MISSING'}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 bg-white/2 border border-white/5 rounded-[2.5rem] relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                                    <Zap className="w-32 h-32 text-indigo-500" />
                                </div>
                                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-4">Transmission Content</p>
                                <p className="text-2xl text-white font-medium leading-relaxed italic relative z-10">"{selectedLead.message}"</p>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4 flex items-center gap-2">
                                    <Shield className="w-3 h-3 text-indigo-500" /> Tactical Intelligence Notes
                                </label>
                                <Textarea
                                    className="bg-slate-950/50 border-white/5 rounded-3xl px-8 py-6 text-white text-lg font-medium outline-none focus:bg-slate-950/80 transition-all placeholder:text-slate-600 no-scrollbar"
                                    value={selectedLead.notes || ''}
                                    onChange={(e) => setSelectedLead(prev => ({ ...prev, notes: e.target.value }))}
                                    onBlur={(e) => updateNotes(e.target.value)}
                                    placeholder="Add intelligence findings..."
                                />
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
}