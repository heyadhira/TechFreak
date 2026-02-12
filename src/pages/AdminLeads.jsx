import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { localClient } from '@/api/localClient';
import { Eye, Trash2, Loader2, Mail, Phone, Building, Calendar, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import AdminLayout from '../components/admin/AdminLayout';
import { format } from 'date-fns';
import { toast } from 'sonner';

const statusOptions = [
    { value: 'new', label: 'New', color: 'bg-blue-100 text-blue-700' },
    { value: 'contacted', label: 'Contacted', color: 'bg-yellow-100 text-yellow-700' },
    { value: 'qualified', label: 'Qualified', color: 'bg-purple-100 text-purple-700' },
    { value: 'proposal-sent', label: 'Proposal Sent', color: 'bg-indigo-100 text-indigo-700' },
    { value: 'negotiation', label: 'Negotiation', color: 'bg-orange-100 text-orange-700' },
    { value: 'won', label: 'Won', color: 'bg-green-100 text-green-700' },
    { value: 'lost', label: 'Lost', color: 'bg-red-100 text-red-700' }
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
            toast.success('Lead updated successfully');
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => localClient.delete(`/leads/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-leads'] });
            toast.success('Lead deleted successfully');
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
            l.created_date ? format(new Date(l.created_date), 'yyyy-MM-dd') : ''
        ]);

        const csvContent = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `leads-${format(new Date(), 'yyyy-MM-dd')}.csv`;
        a.click();
    };

    return (
        <AdminLayout currentPage="AdminLeads" title="Manage Leads">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-wrap gap-4 justify-between items-center">
                    <div className="flex items-center gap-4">
                        <p className="text-slate-600 dark:text-slate-400">Total: {leads.length} leads</p>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                {statusOptions.map(opt => (
                                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Button variant="outline" onClick={exportToCSV}>
                        <Download className="w-4 h-4 mr-2" /> Export CSV
                    </Button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 dark:bg-slate-800/50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Service</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Budget</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {isLoading ? (
                                <tr><td colSpan={7} className="px-6 py-12 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto" /></td></tr>
                            ) : filteredLeads.length === 0 ? (
                                <tr><td colSpan={7} className="px-6 py-12 text-center text-slate-500">No leads found.</td></tr>
                            ) : (
                                filteredLeads.map((lead) => (
                                    <tr key={lead.id} className={!lead.is_read ? 'bg-blue-50/50 dark:bg-blue-900/10' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors'}>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-medium text-slate-700 dark:text-slate-300">
                                                    {lead.name?.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-slate-900 dark:text-white">{lead.name}</p>
                                                    {lead.company && <p className="text-sm text-slate-500 dark:text-slate-400">{lead.company}</p>}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm">
                                                <p className="text-slate-900 dark:text-white font-medium">{lead.email}</p>
                                                {lead.phone && <p className="text-slate-500 dark:text-slate-400">{lead.phone}</p>}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600 dark:text-slate-400 text-sm whitespace-nowrap">{lead.service_interested || '-'}</td>
                                        <td className="px-6 py-4 text-slate-600 dark:text-slate-400 text-sm whitespace-nowrap">{budgetLabels[lead.budget] || '-'}</td>
                                        <td className="px-6 py-4">
                                            <Select value={lead.status || 'new'} onValueChange={(value) => updateStatus(lead.id, value)}>
                                                <SelectTrigger className="w-32 h-8">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {statusOptions.map(opt => (
                                                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600 dark:text-slate-400 text-sm">
                                            {lead.created_at && format(new Date(lead.created_at), 'MMM d, yyyy')}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <Button variant="ghost" size="icon" onClick={() => viewLead(lead)}>
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(lead.id)} className="text-red-500 hover:text-red-700">
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

            {/* Lead Detail Modal */}
            <Dialog open={!!selectedLead} onOpenChange={(open) => !open && setSelectedLead(null)}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Lead Details</DialogTitle>
                    </DialogHeader>
                    {selectedLead && (
                        <div className="space-y-6 mt-4">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-2xl font-medium text-slate-700 dark:text-slate-300">
                                    {selectedLead.name?.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{selectedLead.name}</h3>
                                    {selectedLead.company && <p className="text-slate-600 dark:text-slate-400">{selectedLead.company}</p>}
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                                    <Mail className="w-5 h-5 text-slate-400" />
                                    <div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Email</p>
                                        <a href={`mailto:${selectedLead.email}`} className="text-slate-900 dark:text-indigo-400 font-medium hover:underline">{selectedLead.email}</a>
                                    </div>
                                </div>
                                {selectedLead.phone && (
                                    <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                                        <Phone className="w-5 h-5 text-slate-400" />
                                        <div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Phone</p>
                                            <a href={`tel:${selectedLead.phone}`} className="text-slate-900 dark:text-indigo-400 font-medium hover:underline">{selectedLead.phone}</a>
                                        </div>
                                    </div>
                                )}
                                {selectedLead.service_interested && (
                                    <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                                        <Building className="w-5 h-5 text-slate-400" />
                                        <div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Service Interested</p>
                                            <p className="text-slate-900 dark:text-white font-medium">{selectedLead.service_interested}</p>
                                        </div>
                                    </div>
                                )}
                                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                                    <Calendar className="w-5 h-5 text-slate-400" />
                                    <div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Date</p>
                                        <p className="text-slate-900 dark:text-white font-medium">{selectedLead.created_at && format(new Date(selectedLead.created_at), 'MMMM d, yyyy')}</p>
                                    </div>
                                </div>
                            </div>

                            {selectedLead.budget && (
                                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Budget</p>
                                    <p className="text-slate-900 dark:text-white font-bold">{budgetLabels[selectedLead.budget] || selectedLead.budget}</p>
                                </div>
                            )}

                            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Message</p>
                                <p className="text-slate-900 dark:text-slate-300 whitespace-pre-wrap italic">"{selectedLead.message}"</p>
                            </div>

                            <div>
                                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Internal Notes</p>
                                <Textarea
                                    value={selectedLead.notes || ''}
                                    onChange={(e) => setSelectedLead(prev => ({ ...prev, notes: e.target.value }))}
                                    onBlur={(e) => updateNotes(e.target.value)}
                                    placeholder="Add internal notes..."
                                    rows={3}
                                />
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
}