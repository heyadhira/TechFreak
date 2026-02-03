import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Save, Loader2, Globe, Search, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminLayout from '../components/admin/AdminLayout';
import ProjectDownloader from '../components/admin/ProjectDownloader';
import { toast } from 'sonner';

export default function AdminSettings() {
    const [settings, setSettings] = useState({
        site_name: 'TechFreak',
        tagline: 'Premium Web Development Services',
        phone: '+91 98765 43210',
        email: 'hello@techfreak.in',
        address: 'Mumbai, Maharashtra, India',
        whatsapp: '919876543210',
        meta_title: 'TechFreak - Premium Web Development Services',
        meta_description: 'Professional web development services for Indian businesses. Custom websites, e-commerce, SEO optimization starting at ₹4,999.',
        facebook: '',
        twitter: '',
        instagram: '',
        linkedin: '',
        hero_title: 'Build Your Dream Website',
        hero_subtitle: 'Starting at ₹4,999',
        hero_description: 'Transform your business with stunning, high-performance websites.'
    });

    const queryClient = useQueryClient();

    const { data: savedSettings, isLoading } = useQuery({
        queryKey: ['site-settings'],
        queryFn: () => base44.entities.SiteSettings.list(),
        initialData: []
    });

    useEffect(() => {
        if (savedSettings.length > 0) {
            const loadedSettings = {};
            savedSettings.forEach(s => {
                try {
                    loadedSettings[s.setting_key] = JSON.parse(s.setting_value);
                } catch {
                    loadedSettings[s.setting_key] = s.setting_value;
                }
            });
            setSettings(prev => ({ ...prev, ...loadedSettings }));
        }
    }, [savedSettings]);

    const saveMutation = useMutation({
        mutationFn: async (data) => {
            for (const [key, value] of Object.entries(data)) {
                const existing = savedSettings.find(s => s.setting_key === key);
                const settingValue = typeof value === 'object' ? JSON.stringify(value) : value;

                if (existing) {
                    await base44.entities.SiteSettings.update(existing.id, { setting_value: settingValue });
                } else {
                    await base44.entities.SiteSettings.create({
                        setting_key: key,
                        setting_value: settingValue,
                        setting_type: 'general'
                    });
                }
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['site-settings'] });
            toast.success('Settings saved successfully');
        }
    });

    const handleSave = () => {
        saveMutation.mutate(settings);
    };

    if (isLoading) {
        return (
            <AdminLayout currentPage="AdminSettings" title="Settings">
                <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout currentPage="AdminSettings" title="Settings">
            <div className="bg-white rounded-2xl shadow-sm">
                <Tabs defaultValue="general" className="p-6">
                    <TabsList className="mb-6">
                        <TabsTrigger value="general">General</TabsTrigger>
                        <TabsTrigger value="contact">Contact</TabsTrigger>
                        <TabsTrigger value="seo">SEO</TabsTrigger>
                        <TabsTrigger value="social">Social Media</TabsTrigger>
                        <TabsTrigger value="hero">Hero Section</TabsTrigger>
                    </TabsList>

                    <TabsContent value="general" className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Site Name</label>
                                <Input
                                    value={settings.site_name}
                                    onChange={(e) => setSettings(prev => ({ ...prev, site_name: e.target.value }))}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Tagline</label>
                                <Input
                                    value={settings.tagline}
                                    onChange={(e) => setSettings(prev => ({ ...prev, tagline: e.target.value }))}
                                />
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="contact" className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    <Phone className="w-4 h-4 inline mr-1" /> Phone Number
                                </label>
                                <Input
                                    value={settings.phone}
                                    onChange={(e) => setSettings(prev => ({ ...prev, phone: e.target.value }))}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Email</label>
                                <Input
                                    type="email"
                                    value={settings.email}
                                    onChange={(e) => setSettings(prev => ({ ...prev, email: e.target.value }))}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">WhatsApp Number</label>
                                <Input
                                    value={settings.whatsapp}
                                    onChange={(e) => setSettings(prev => ({ ...prev, whatsapp: e.target.value }))}
                                    placeholder="919876543210 (without +)"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    <MapPin className="w-4 h-4 inline mr-1" /> Address
                                </label>
                                <Input
                                    value={settings.address}
                                    onChange={(e) => setSettings(prev => ({ ...prev, address: e.target.value }))}
                                />
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="seo" className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                <Search className="w-4 h-4 inline mr-1" /> Meta Title
                            </label>
                            <Input
                                value={settings.meta_title}
                                onChange={(e) => setSettings(prev => ({ ...prev, meta_title: e.target.value }))}
                            />
                            <p className="text-xs text-slate-500 mt-1">Recommended: 50-60 characters</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Meta Description</label>
                            <Textarea
                                value={settings.meta_description}
                                onChange={(e) => setSettings(prev => ({ ...prev, meta_description: e.target.value }))}
                                rows={3}
                            />
                            <p className="text-xs text-slate-500 mt-1">Recommended: 150-160 characters</p>
                        </div>
                    </TabsContent>

                    <TabsContent value="social" className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Facebook URL</label>
                                <Input
                                    value={settings.facebook}
                                    onChange={(e) => setSettings(prev => ({ ...prev, facebook: e.target.value }))}
                                    placeholder="https://facebook.com/..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Twitter URL</label>
                                <Input
                                    value={settings.twitter}
                                    onChange={(e) => setSettings(prev => ({ ...prev, twitter: e.target.value }))}
                                    placeholder="https://twitter.com/..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Instagram URL</label>
                                <Input
                                    value={settings.instagram}
                                    onChange={(e) => setSettings(prev => ({ ...prev, instagram: e.target.value }))}
                                    placeholder="https://instagram.com/..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">LinkedIn URL</label>
                                <Input
                                    value={settings.linkedin}
                                    onChange={(e) => setSettings(prev => ({ ...prev, linkedin: e.target.value }))}
                                    placeholder="https://linkedin.com/company/..."
                                />
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="hero" className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Hero Title</label>
                            <Input
                                value={settings.hero_title}
                                onChange={(e) => setSettings(prev => ({ ...prev, hero_title: e.target.value }))}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Hero Subtitle</label>
                            <Input
                                value={settings.hero_subtitle}
                                onChange={(e) => setSettings(prev => ({ ...prev, hero_subtitle: e.target.value }))}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Hero Description</label>
                            <Textarea
                                value={settings.hero_description}
                                onChange={(e) => setSettings(prev => ({ ...prev, hero_description: e.target.value }))}
                                rows={3}
                            />
                        </div>
                    </TabsContent>

                    <div className="pt-6 border-t mt-6 flex justify-between items-center">
                        <Button
                            onClick={handleSave}
                            className="bg-indigo-600 hover:bg-indigo-700"
                            disabled={saveMutation.isPending}
                        >
                            {saveMutation.isPending ? (
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                                <Save className="w-4 h-4 mr-2" />
                            )}
                            Save Settings
                        </Button>

                        <div className="flex items-center gap-3">
                            <div className="text-right">
                                <p className="text-sm font-medium text-slate-700">Export Project</p>
                                <p className="text-xs text-slate-500">Download all project files</p>
                            </div>
                            <ProjectDownloader />
                        </div>
                    </div>
                </Tabs>
            </div>
        </AdminLayout>
    );
}