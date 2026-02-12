import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { localClient } from '@/api/localClient';
import { Plus, Pencil, Trash2, Loader2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AdminLayout from '../components/admin/AdminLayout';
import { toast } from 'sonner';

const categoryOptions = ['basic', 'standard', 'premium', 'enterprise'];

export default function AdminPricing() {
    const [isOpen, setIsOpen] = useState(false);
    const [editingPlan, setEditingPlan] = useState(null);
    const [formData, setFormData] = useState({
        name: '', price: 0, original_price: 0, description: '',
        features: [], is_popular: false, category: 'basic', order: 0, is_active: true
    });
    const [newFeature, setNewFeature] = useState('');

    const queryClient = useQueryClient();

    const { data: plansResponse, isLoading } = useQuery({
        queryKey: ['admin-pricing'],
        queryFn: () => localClient.get('/pricing'),
    });

    const plans = plansResponse || [];

    const createMutation = useMutation({
        mutationFn: (data) => localClient.post('/pricing', data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-pricing'] });
            setIsOpen(false);
            resetForm();
            toast.success('Pricing plan created successfully');
        }
    });

    const updateMutation = useMutation({
        mutationFn: (variables) => localClient.put(`/pricing/${variables.id}`, variables.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-pricing'] });
            setIsOpen(false);
            resetForm();
            toast.success('Pricing plan updated successfully');
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => localClient.delete(`/pricing/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-pricing'] });
            toast.success('Pricing plan deleted successfully');
        }
    });

    const resetForm = () => {
        setFormData({
            name: '', price: 0, original_price: 0, description: '',
            features: [], is_popular: false, category: 'basic', order: 0, is_active: true
        });
        setEditingPlan(null);
        setNewFeature('');
    };

    const handleEdit = (plan) => {
        setEditingPlan(plan);
        setFormData({
            name: plan.name || '',
            price: plan.price || 0,
            original_price: plan.original_price || 0,
            description: plan.description || '',
            features: plan.features || [],
            is_popular: plan.is_popular || false,
            category: plan.category || 'basic',
            order: plan.order || 0,
            is_active: plan.is_active !== false
        });
        setIsOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingPlan) {
            updateMutation.mutate({ id: editingPlan.id, data: formData });
        } else {
            createMutation.mutate(formData);
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
        <AdminLayout currentPage="AdminPricing" title="Manage Pricing Plans">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <p className="text-slate-600 dark:text-slate-400">Set up your pricing packages</p>
                    <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
                        <DialogTrigger asChild>
                            <Button className="bg-indigo-600 hover:bg-indigo-700">
                                <Plus className="w-4 h-4 mr-2" /> Add Plan
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>{editingPlan ? 'Edit Pricing Plan' : 'Add Pricing Plan'}</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Plan Name</label>
                                        <Input
                                            value={formData.name}
                                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                            placeholder="e.g., Starter, Professional"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Category</label>
                                        <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                {categoryOptions.map(cat => (
                                                    <SelectItem key={cat} value={cat} className="capitalize">{cat}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Description</label>
                                    <Textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                        rows={2}
                                        placeholder="Brief description of what's included..."
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Price (₹)</label>
                                        <Input
                                            type="number"
                                            value={formData.price}
                                            onChange={(e) => setFormData(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Original Price (₹)</label>
                                        <Input
                                            type="number"
                                            value={formData.original_price}
                                            onChange={(e) => setFormData(prev => ({ ...prev, original_price: parseInt(e.target.value) || 0 }))}
                                            placeholder="For showing discount"
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
                                    <div className="space-y-2 max-h-40 overflow-y-auto">
                                        {formData.features.map((feature, i) => (
                                            <div key={i} className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700">
                                                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                                                <span className="text-sm flex-1 text-slate-700 dark:text-slate-300">{feature}</span>
                                                <button type="button" onClick={() => removeFeature(i)} className="text-slate-400 dark:text-slate-500 hover:text-red-500">×</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Display Order</label>
                                        <Input
                                            type="number"
                                            value={formData.order}
                                            onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                                        />
                                    </div>
                                    <div className="flex items-end gap-6 pb-1">
                                        <label className="flex items-center gap-2">
                                            <Switch
                                                checked={formData.is_popular}
                                                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_popular: checked }))}
                                            />
                                            <span className="text-sm">Popular</span>
                                        </label>
                                        <label className="flex items-center gap-2">
                                            <Switch
                                                checked={formData.is_active}
                                                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
                                            />
                                            <span className="text-sm">Active</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-3 pt-4">
                                    <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                                    <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700" disabled={createMutation.isPending || updateMutation.isPending}>
                                        {(createMutation.isPending || updateMutation.isPending) && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                        {editingPlan ? 'Update' : 'Create'}
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                    {isLoading ? (
                        <div className="col-span-full text-center py-12"><Loader2 className="w-6 h-6 animate-spin mx-auto" /></div>
                    ) : plans.length === 0 ? (
                        <div className="col-span-full text-center py-12 text-slate-500">No pricing plans yet. Add your first plan.</div>
                    ) : (
                        plans.map((plan) => (
                            <div key={plan.id} className={`rounded-xl p-6 relative border border-slate-200 dark:border-slate-800 transition-all hover:shadow-lg ${plan.is_popular ? 'bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 text-white border-transparent' : 'bg-slate-50 dark:bg-slate-800/50'}`}>
                                {plan.is_popular && (
                                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-amber-400 text-amber-900 text-xs font-bold rounded-full shadow-md">
                                        Popular
                                    </span>
                                )}
                                <div className="absolute top-4 right-4 flex gap-1">
                                    <Button size="icon" variant={plan.is_popular ? "ghost" : "secondary"} className={`h-8 w-8 ${plan.is_popular ? 'bg-white/20 hover:bg-white/30 text-white' : 'bg-white dark:bg-slate-900 shadow-sm'}`} onClick={() => handleEdit(plan)}>
                                        <Pencil className="w-3 h-3" />
                                    </Button>
                                    <Button size="icon" variant={plan.is_popular ? "ghost" : "secondary"} className={`h-8 w-8 ${plan.is_popular ? 'bg-white/20 hover:bg-white/30 text-white' : 'bg-white dark:bg-slate-900 shadow-sm'}`} onClick={() => deleteMutation.mutate(plan.id)}>
                                        <Trash2 className={`w-3 h-3 ${plan.is_popular ? 'text-white' : 'text-red-500'}`} />
                                    </Button>
                                </div>
                                <h3 className={`text-lg font-bold mb-1 ${plan.is_popular ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{plan.name}</h3>
                                <p className={`text-sm mb-4 ${plan.is_popular ? 'text-white/80' : 'text-slate-600 dark:text-slate-400'}`}>{plan.description}</p>
                                <div className="mb-4">
                                    <span className={`text-3xl font-bold ${plan.is_popular ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                                        ₹{plan.price?.toLocaleString('en-IN')}
                                    </span>
                                    {plan.original_price > 0 && (
                                        <span className={`ml-2 text-lg line-through ${plan.is_popular ? 'text-white/60' : 'text-slate-400 dark:text-slate-500'}`}>
                                            ₹{plan.original_price?.toLocaleString('en-IN')}
                                        </span>
                                    )}
                                </div>
                                <ul className="space-y-2">
                                    {plan.features?.slice(0, 5).map((feature, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm">
                                            <Check className={`w-4 h-4 ${plan.is_popular ? 'text-green-300' : 'text-green-500'}`} />
                                            <span className={plan.is_popular ? 'text-white/90' : 'text-slate-600 dark:text-slate-300'}>{feature}</span>
                                        </li>
                                    ))}
                                    {plan.features?.length > 5 && (
                                        <li className={`text-sm ${plan.is_popular ? 'text-white/60' : 'text-slate-500 dark:text-slate-400'}`}>
                                            +{plan.features.length - 5} more features
                                        </li>
                                    )}
                                </ul>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}