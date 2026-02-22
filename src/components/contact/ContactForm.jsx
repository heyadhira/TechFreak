import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation } from '@tanstack/react-query';
import { localClient } from '@/api/localClient';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import GradientButton from '../ui/GradientButton';
import { Send, CheckCircle, Loader2, User, Mail, Building, Briefcase, IndianRupee, MessageSquare, Sparkles, Clock, Target, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import Magnetic from '../ui/Magnetic';

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

const timelineOptions = [
    { value: "asap", label: "As soon as possible" },
    { value: "1-2-weeks", label: "Within 1-2 Weeks" },
    { value: "1-month", label: "Within 1 Month" },
    { value: "planning", label: "Just Planning / Future" }
];

const goalOptions = [
    { value: "sales", label: "Increase Sales/Revenue" },
    { value: "leads", label: "Generate More Leads" },
    { value: "branding", label: "Brand Awareness / Identity" },
    { value: "portfolio", label: "Showcase Work / Portfolio" },
    { value: "informational", label: "Informational / Education" }
];

const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    phone: z.string().optional(),
    company: z.string().optional(),
    service_interested: z.string().optional(),
    budget: z.string().optional(),
    timeline: z.string().optional(),
    primary_goal: z.string().optional(),
    message: z.string().min(10, { message: "Message must be at least 10 characters." })
});

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export default function ContactForm({ preSelectedService, preSelectedPlan }) {
    const [submitted, setSubmitted] = useState(false);

    const { register, control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            company: '',
            service_interested: preSelectedService || preSelectedPlan || '',
            budget: '',
            timeline: '',
            primary_goal: '',
            message: ''
        }
    });

    const createLead = useMutation({
        mutationFn: (data) => localClient.post('/leads', data),
        onSuccess: () => {
            setSubmitted(true);
            toast.success('Message sent successfully!');
            reset();
        },
        onError: () => {
            toast.error('Failed to send message. Please try again.');
        }
    });

    const onSubmit = (data) => {
        // Format structured data into the message for database compatibility
        const structuredMessage = `
--- STRUCTURED REQUIREMENTS ---
Timeline: ${data.timeline || 'Not specified'}
Primary Goal: ${data.primary_goal || 'Not specified'}
Budget Range: ${data.budget || 'Not specified'}
-------------------------------

${data.message}`;

        createLead.mutate({
            ...data,
            message: structuredMessage,
            source: 'contact-form',
            status: 'new'
        });
    };

    return (
        <div className="relative group p-1 rounded-[3rem] bg-gradient-to-br from-white/10 via-transparent to-white/5">
            <div className="bg-slate-900/60 backdrop-blur-3xl border border-white/10 p-10 md:p-14 rounded-[calc(3rem-4px)] shadow-2xl relative overflow-hidden">
                <AnimatePresence mode="wait">
                    {submitted ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="text-center py-20"
                        >
                            <motion.div
                                initial={{ scale: 0, rotate: -45 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                className="w-24 h-24 mx-auto mb-8 bg-indigo-600 rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(79,70,229,0.4)]"
                            >
                                <CheckCircle className="w-12 h-12 text-white" />
                            </motion.div>
                            <h3 className="text-4xl font-black text-white mb-4 tracking-tight">Transmission Received</h3>
                            <p className="text-slate-400 font-medium mb-10 max-w-sm mx-auto leading-relaxed">
                                Our tech architects have received your signal. Expect an encrypted response within 24 hours.
                            </p>
                            <Magnetic strength={0.2}>
                                <GradientButton onClick={() => setSubmitted(false)} variant="ghost" className="px-10 h-14 rounded-2xl bg-white/5 border-white/10 hover:bg-white/10">
                                    Send Another Signal
                                </GradientButton>
                            </Magnetic>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="form"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center">
                                    <Sparkles className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-black text-white tracking-tight">Project Briefing</h2>
                                    <p className="text-slate-400 font-medium text-sm mt-1">Initialize your digital transformation sequence.</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                                {/* Basic Info Section */}
                                <div className="space-y-8">
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <motion.div variants={itemVariants}>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                                <Input
                                                    {...register("name")}
                                                    placeholder="Full Identity"
                                                    className={`pl-12 h-14 rounded-2xl bg-white/5 border-white/10 focus:border-indigo-500 focus:bg-white/10 transition-all ${errors.name ? 'border-red-500' : ''}`}
                                                />
                                            </div>
                                        </motion.div>
                                        <motion.div variants={itemVariants}>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                                <Input
                                                    type="email"
                                                    {...register("email")}
                                                    placeholder="Communication Vector (Email)"
                                                    className={`pl-12 h-14 rounded-2xl bg-white/5 border-white/10 focus:border-indigo-500 focus:bg-white/10 transition-all ${errors.email ? 'border-red-500' : ''}`}
                                                />
                                            </div>
                                        </motion.div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-8">
                                        <motion.div variants={itemVariants}>
                                            <div className="relative">
                                                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                                <Input
                                                    {...register("phone")}
                                                    placeholder="Phone Coordinate"
                                                    className="pl-12 h-14 rounded-2xl bg-white/5 border-white/10 focus:border-indigo-500 focus:bg-white/10 transition-all"
                                                />
                                            </div>
                                        </motion.div>
                                        <motion.div variants={itemVariants}>
                                            <div className="relative">
                                                <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                                <Input
                                                    {...register("company")}
                                                    placeholder="Organization Name"
                                                    className="pl-12 h-14 rounded-2xl bg-white/5 border-white/10 focus:border-indigo-500 focus:bg-white/10 transition-all"
                                                />
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Detailed Requirement Section */}
                                <div className="pt-8 border-t border-white/5 space-y-8">
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <motion.div variants={itemVariants}>
                                            <div className="relative">
                                                <Controller
                                                    name="service_interested"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <SelectTrigger className="h-14 rounded-2xl bg-white/5 border-white/10 focus:bg-white/10 transition-all">
                                                                <SelectValue placeholder="Target Service" />
                                                            </SelectTrigger>
                                                            <SelectContent className="bg-slate-900 border-white/10">
                                                                {services.map((service) => (
                                                                    <SelectItem key={service} value={service} className="text-white hover:bg-white/5">{service}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    )}
                                                />
                                            </div>
                                        </motion.div>
                                        <motion.div variants={itemVariants}>
                                            <div className="relative">
                                                <Controller
                                                    name="timeline"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <SelectTrigger className="h-14 rounded-2xl bg-white/5 border-white/10 focus:bg-white/10 transition-all">
                                                                <div className="flex items-center gap-2">
                                                                    <Clock className="w-4 h-4 text-slate-500" />
                                                                    <SelectValue placeholder="Project Timeline" />
                                                                </div>
                                                            </SelectTrigger>
                                                            <SelectContent className="bg-slate-900 border-white/10">
                                                                {timelineOptions.map((option) => (
                                                                    <SelectItem key={option.value} value={option.value} className="text-white hover:bg-white/5">{option.label}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    )}
                                                />
                                            </div>
                                        </motion.div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-8">
                                        <motion.div variants={itemVariants}>
                                            <div className="relative">
                                                <Controller
                                                    name="primary_goal"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <SelectTrigger className="h-14 rounded-2xl bg-white/5 border-white/10 focus:bg-white/10 transition-all">
                                                                <div className="flex items-center gap-2">
                                                                    <Target className="w-4 h-4 text-slate-500" />
                                                                    <SelectValue placeholder="Primary Goal" />
                                                                </div>
                                                            </SelectTrigger>
                                                            <SelectContent className="bg-slate-900 border-white/10">
                                                                {goalOptions.map((option) => (
                                                                    <SelectItem key={option.value} value={option.value} className="text-white hover:bg-white/5">{option.label}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    )}
                                                />
                                            </div>
                                        </motion.div>
                                        <motion.div variants={itemVariants}>
                                            <div className="relative">
                                                <Controller
                                                    name="budget"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <SelectTrigger className="h-14 rounded-2xl bg-white/5 border-white/10 focus:bg-white/10 transition-all">
                                                                <div className="flex items-center gap-2">
                                                                    <IndianRupee className="w-4 h-4 text-slate-500" />
                                                                    <SelectValue placeholder="Budget Range" />
                                                                </div>
                                                            </SelectTrigger>
                                                            <SelectContent className="bg-slate-900 border-white/10">
                                                                {budgetOptions.map((option) => (
                                                                    <SelectItem key={option.value} value={option.value} className="text-white hover:bg-white/5">{option.label}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    )}
                                                />
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>

                                <motion.div variants={itemVariants}>
                                    <div className="relative">
                                        <MessageSquare className="absolute left-4 top-6 w-4 h-4 text-slate-500" />
                                        <Textarea
                                            {...register("message")}
                                            placeholder="Detailed Specifications & Requirements..."
                                            rows={6}
                                            className={`pl-12 pt-5 rounded-[2rem] bg-white/5 border-white/10 focus:border-indigo-500 focus:bg-white/10 transition-all resize-none ${errors.message ? 'border-red-500' : ''}`}
                                        />
                                    </div>
                                </motion.div>

                                <motion.div variants={itemVariants}>
                                    <Magnetic strength={0.15}>
                                        <GradientButton
                                            type="submit"
                                            variant="primary"
                                            size="lg"
                                            className="w-full h-16 rounded-[2rem] text-lg font-black group shadow-[0_20px_40px_-10px_rgba(79,70,229,0.5)]"
                                            disabled={createLead.isPending}
                                        >
                                            {createLead.isPending ? (
                                                <>
                                                    <Loader2 className="w-6 h-6 animate-spin mr-3" />
                                                    Processing...
                                                </>
                                            ) : (
                                                <>
                                                    Launch Inquiry
                                                    <Send className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                                </>
                                            )}
                                        </GradientButton>
                                    </Magnetic>
                                </motion.div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Decorative glows */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] -z-10" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] -z-10" />
            </div>
        </div>
    );
}
