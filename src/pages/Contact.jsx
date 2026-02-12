import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import { localClient } from '@/api/localClient';
import { createPageUrl } from '@/utils';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import GlassCard from '../components/ui/GlassCard';
import GradientButton from '../components/ui/GradientButton';
import PageHero from '../components/ui/PageHero';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, CheckCircle, Loader2, ArrowRight, Megaphone } from 'lucide-react';
import { toast } from 'sonner';

const services = [
    "Custom Website Development",
    "E-Commerce Solutions",
    "Mobile-First Design",
    "SEO Optimization",
    "UI/UX Design",
    "Web Application Development",
    "Website Redesign",
    "Other"
];

const budgetOptions = [
    { value: "under-10k", label: "Under ₹10,000" },
    { value: "10k-25k", label: "₹10,000 - ₹25,000" },
    { value: "25k-50k", label: "₹25,000 - ₹50,000" },
    { value: "50k-1lakh", label: "₹50,000 - ₹1,00,000" },
    { value: "above-1lakh", label: "Above ₹1,00,000" }
];

const contactInfo = [
    { icon: Phone, title: "Phone", value: "+91 98765 43210", href: "tel:+919876543210" },
    { icon: Mail, title: "Email", value: "hello@techfreak.in", href: "mailto:hello@techfreak.in" },
    { icon: MapPin, title: "Address", value: "Mumbai, Maharashtra, India" },
    { icon: Clock, title: "Working Hours", value: "Mon - Sat: 10AM - 7PM IST" }
];

export default function Contact() {
    const urlParams = new URLSearchParams(window.location.search);
    const preSelectedService = urlParams.get('service') || '';
    const preSelectedPlan = urlParams.get('plan') || '';

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        service_interested: preSelectedService || preSelectedPlan || '',
        budget: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const createLead = useMutation({
        mutationFn: (data) => localClient.post('/leads', data),
        onSuccess: () => {
            setSubmitted(true);
            toast.success('Message sent successfully!');
        },
        onError: () => {
            toast.error('Failed to send message. Please try again.');
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            toast.error('Please fill in all required fields');
            return;
        }
        createLead.mutate({
            ...formData,
            source: 'contact-form',
            status: 'new'
        });
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div>
            <PageHero
                title="Let's Connect"
                subtitle="Starting at ₹4,999"
                badge="Available for Projects"
                badgeIcon={MessageCircle}
                primaryBtnText="Get Free Quote"
                primaryBtnLink="#contact-form"
                secondaryBtnText="What We Offer"
                secondaryBtnLink={createPageUrl("Services")}
                showStats={true}
                floatingIcons={[
                    { icon: Phone, className: "top-20 left-[10%] text-green-400", delay: 0.2 },
                    { icon: Mail, className: "top-40 right-[15%] text-blue-400", delay: 0.4 },
                    { icon: MessageCircle, className: "bottom-20 left-[20%] text-indigo-400", delay: 0.6 },
                    { icon: Megaphone, className: "top-32 right-[5%] text-amber-400", delay: 0.8 }
                ]}
            />

            {/* Contact Section */}
            <section className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-5 gap-12">
                        {/* Contact Info */}
                        <div className="lg:col-span-2">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Contact Information</h2>

                                <div className="space-y-6 mb-8">
                                    {contactInfo.map((item, index) => (
                                        <div key={index} className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                                                <item.icon className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-slate-900 dark:text-white">{item.title}</h4>
                                                {item.href ? (
                                                    <a href={item.href} className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                                        {item.value}
                                                    </a>
                                                ) : (
                                                    <p className="text-slate-600 dark:text-slate-400">{item.value}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* WhatsApp CTA */}
                                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
                                    <div className="flex items-center gap-3 mb-4">
                                        <MessageCircle className="w-8 h-8" />
                                        <div>
                                            <h4 className="font-bold">Quick Response via WhatsApp</h4>
                                            <p className="text-white/80 text-sm">Get instant replies during business hours</p>
                                        </div>
                                    </div>
                                    <a
                                        href="https://wa.me/919876543210?text=Hi!%20I'm%20interested%20in%20your%20web%20development%20services."
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block"
                                    >
                                        <GradientButton variant="ghost" className="w-full bg-white/20 border-white/30 hover:bg-white/30">
                                            Chat on WhatsApp
                                            <ArrowRight className="w-4 h-4" />
                                        </GradientButton>
                                    </a>
                                </div>
                            </motion.div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-3">
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <GlassCard className="p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800" glowColor="rgba(99, 102, 241, 0.15)">
                                    {submitted ? (
                                        <div className="text-center py-12">
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: "spring" }}
                                                className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center"
                                            >
                                                <CheckCircle className="w-10 h-10 text-green-600" />
                                            </motion.div>
                                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Message Sent!</h3>
                                            <p className="text-slate-600 dark:text-slate-400 mb-6">
                                                Thank you for reaching out. We'll get back to you within 24 hours.
                                            </p>
                                            <GradientButton onClick={() => setSubmitted(false)} variant="outline">
                                                Send Another Message
                                            </GradientButton>
                                        </div>
                                    ) : (
                                        <>
                                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Send us a Message</h2>
                                            <p className="text-slate-600 dark:text-slate-400 mb-6">Fill out the form below and we'll get back to you shortly.</p>

                                            <form onSubmit={handleSubmit} className="space-y-6">
                                                <div className="grid md:grid-cols-2 gap-6">
                                                    <div>
                                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                                            Full Name <span className="text-red-500">*</span>
                                                        </label>
                                                        <Input
                                                            value={formData.name}
                                                            onChange={(e) => handleChange('name', e.target.value)}
                                                            placeholder="John Doe"
                                                            className="h-12"
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                                            Email Address <span className="text-red-500">*</span>
                                                        </label>
                                                        <Input
                                                            type="email"
                                                            value={formData.email}
                                                            onChange={(e) => handleChange('email', e.target.value)}
                                                            placeholder="john@example.com"
                                                            className="h-12"
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid md:grid-cols-2 gap-6">
                                                    <div>
                                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                                            Phone Number
                                                        </label>
                                                        <Input
                                                            value={formData.phone}
                                                            onChange={(e) => handleChange('phone', e.target.value)}
                                                            placeholder="+91 98765 43210"
                                                            className="h-12"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                                            Company Name
                                                        </label>
                                                        <Input
                                                            value={formData.company}
                                                            onChange={(e) => handleChange('company', e.target.value)}
                                                            placeholder="Your Company"
                                                            className="h-12"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid md:grid-cols-2 gap-6">
                                                    <div>
                                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                                            Service Interested In
                                                        </label>
                                                        <Select
                                                            value={formData.service_interested}
                                                            onValueChange={(value) => handleChange('service_interested', value)}
                                                        >
                                                            <SelectTrigger className="h-12">
                                                                <SelectValue placeholder="Select a service" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {services.map((service) => (
                                                                    <SelectItem key={service} value={service}>{service}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                                            Budget Range
                                                        </label>
                                                        <Select
                                                            value={formData.budget}
                                                            onValueChange={(value) => handleChange('budget', value)}
                                                        >
                                                            <SelectTrigger className="h-12">
                                                                <SelectValue placeholder="Select budget" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {budgetOptions.map((option) => (
                                                                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                                        Project Details <span className="text-red-500">*</span>
                                                    </label>
                                                    <Textarea
                                                        value={formData.message}
                                                        onChange={(e) => handleChange('message', e.target.value)}
                                                        placeholder="Tell us about your project requirements..."
                                                        rows={5}
                                                        required
                                                    />
                                                </div>

                                                <GradientButton
                                                    type="submit"
                                                    variant="primary"
                                                    size="lg"
                                                    className="w-full"
                                                    disabled={createLead.isPending}
                                                >
                                                    {createLead.isPending ? (
                                                        <>
                                                            <Loader2 className="w-5 h-5 animate-spin" />
                                                            Sending...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Send className="w-5 h-5" />
                                                            Send Message
                                                        </>
                                                    )}
                                                </GradientButton>
                                            </form>
                                        </>
                                    )}
                                </GlassCard>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="h-96 bg-slate-200 relative">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995709657!3d19.08219783958221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1704067200000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="TechFreak Location"
                />
            </section>
        </div>
    );
}