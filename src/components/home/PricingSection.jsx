import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { localClient } from '@/api/localClient';
import { Check, Sparkles, ArrowRight, Zap, Target, Rocket, Send } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import GradientButton from '../ui/GradientButton';
import Magnetic from '../ui/Magnetic';

const defaultPlans = [
    {
        id: 1,
        name: "Starter Module",
        price: 4999,
        original_price: 7999,
        description: "Foundational digital presence for emerging brands.",
        icon: Target,
        features: [
            "5-Page High-Performance Site",
            "Responsive Architecture",
            "Secure Inquiry Module",
            "Baseline SEO Engineering",
            "Global CDN Deployment",
            "30-Day Technical Support"
        ],
        is_popular: false,
        category: "basic"
    },
    {
        id: 2,
        name: "Professional Engine",
        price: 14999,
        original_price: 24999,
        description: "Optimized architecture for scaling enterprises.",
        icon: Zap,
        features: [
            "10-Page Custom Architecture",
            "Advanced Growth SEO",
            "WhatsApp API Integration",
            "Interactive Intelligence Feed",
            "Performance Instrumentation",
            "90-Day VIP Maintenance",
            "Complimentary Tier-1 Domain"
        ],
        is_popular: true,
        category: "standard"
    },
    {
        id: 3,
        name: "Enterprise Vault",
        price: 34999,
        original_price: 59999,
        description: "Unrestricted power for market dominance.",
        icon: Rocket,
        features: [
            "Unlimited Digital Assets",
            "Full Commerce Ecosystem",
            "Custom Management Terminal",
            "Strategic SEO Domination",
            "Ultra-Low Latency Ops",
            "180-Day Elite Support",
            "Priority Infrastructure"
        ],
        is_popular: false,
        category: "premium"
    }
];

function PricingCard({ plan, index }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
    const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);
    const springX = useSpring(rotateX, { stiffness: 150, damping: 20 });
    const springY = useSpring(rotateY, { stiffness: 150, damping: 20 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const Icon = plan.icon || Zap;

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            style={{
                rotateX: springX,
                rotateY: springY,
                transformStyle: "preserve-3d",
                perspective: 1000
            }}
            className="group h-full"
        >
            <div className={`relative h-full flex flex-col p-12 rounded-[4rem] border transition-all duration-700 ${plan.is_popular
                ? 'bg-slate-900 border-indigo-500/50 shadow-[0_50px_100px_-20px_rgba(99,102,241,0.3)]'
                : 'bg-white/5 border-white/10 hover:border-white/20 backdrop-blur-3xl'
                }`}>

                {plan.is_popular && (
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-8 py-2 bg-indigo-600 rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-white flex items-center gap-2 shadow-2xl">
                        <Sparkles size={14} className="text-amber-400" />
                        Strategic Apex
                    </div>
                )}

                <div className="flex justify-between items-start mb-12" style={{ transform: "translateZ(40px)" }}>
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${plan.is_popular ? 'bg-indigo-600 shadow-lg shadow-indigo-600/30' : 'bg-white/5 border border-white/10'}`}>
                        <Icon className="w-8 h-8 text-white" />
                    </div>
                    {plan.original_price && (
                        <div className="px-5 py-2 rounded-full bg-red-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-500/20">
                            -{Math.round((1 - plan.price / plan.original_price) * 100)}% ROI Shift
                        </div>
                    )}
                </div>

                <div style={{ transform: "translateZ(60px)" }}>
                    <h3 className="text-4xl font-black text-white mb-4 tracking-tighter uppercase leading-none">
                        {plan.name}
                    </h3>
                    <p className="text-slate-400 font-medium mb-10 leading-relaxed text-sm">
                        {plan.description}
                    </p>

                    <div className="mb-12">
                        <div className="flex items-baseline gap-4">
                            <span className="text-6xl font-black text-white tracking-tighter">
                                ₹{plan.price?.toLocaleString('en-IN')}
                            </span>
                            {plan.original_price && (
                                <span className="text-2xl font-bold text-slate-600 line-through">
                                    ₹{plan.original_price?.toLocaleString('en-IN')}
                                </span>
                            )}
                        </div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-4">One-Time Architectural Investment</p>
                    </div>

                    <div className="space-y-5 mb-16">
                        {plan.features?.map((feature, i) => (
                            <div key={i} className="flex items-center gap-4 group/item">
                                <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all ${plan.is_popular ? 'bg-indigo-600/20 text-indigo-400' : 'bg-white/5 text-slate-600 group-hover/item:text-indigo-400'}`}>
                                    <Check className="w-3.5 h-3.5" />
                                </div>
                                <span className="text-slate-400 font-medium text-sm group-hover/item:text-white transition-colors">
                                    {feature}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-auto" style={{ transform: "translateZ(30px)" }}>
                    <Link to={createPageUrl("Contact") + `?plan=${plan.name}`}>
                        <Magnetic strength={0.3}>
                            <GradientButton
                                variant={plan.is_popular ? "primary" : "outline"}
                                className={`w-full h-20 rounded-[2rem] text-xl font-black group transition-all duration-500 ${!plan.is_popular ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white' : ''}`}
                            >
                                Activate {plan.name.split(' ')[0]}
                                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
                            </GradientButton>
                        </Magnetic>
                    </Link>
                </div>

                {plan.is_popular && (
                    <div className="absolute inset-0 bg-indigo-500/5 blur-[120px] -z-10 rounded-[4rem]" />
                )}
            </div>
        </motion.div>
    );
}

export default function PricingSection() {
    const { data: plans } = useQuery({
        queryKey: ['pricing-plans'],
        queryFn: () => localClient.get('/pricing'),
        initialData: []
    });

    const displayPlans = plans && plans.length > 0 ? plans.filter(p => p.is_active !== false) : defaultPlans;

    return (
        <section className="py-32 bg-slate-950 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-b from-slate-950/0 to-slate-950/0" />

            <div className="container mx-auto px-4 relative z-10">
                <SectionHeading
                    badge="The Investment Tiers"
                    title="Scale-Driven Pricing"
                    subtitle="Elite digital architectures engineered for various growth trajectories. No hidden friction."
                    className="mb-32"
                />

                <div className="grid lg:grid-cols-3 gap-12 max-w-[90rem] mx-auto">
                    {displayPlans.slice(0, 3).map((plan, index) => (
                        <PricingCard key={plan.id} plan={plan} index={index} />
                    ))}
                </div>

                <motion.div
                    className="text-center mt-32"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <p className="text-slate-500 font-black tracking-[0.4em] text-[10px] uppercase mb-10">Custom Enterprise Solutions</p>
                    <Magnetic strength={0.2}>
                        <Link to={createPageUrl("Contact")}>
                            <button className="px-12 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-black hover:bg-indigo-600 transition-all uppercase tracking-widest text-xs">
                                Consult With Architects
                            </button>
                        </Link>
                    </Magnetic>
                </motion.div>
            </div>
        </section>
    );
}