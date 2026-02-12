import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { localClient } from '@/api/localClient';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import GradientButton from '../ui/GradientButton';

const defaultPlans = [
    {
        id: 1,
        name: "Starter",
        price: 4999,
        original_price: 7999,
        description: "Perfect for small businesses starting online",
        features: [
            "5-Page Responsive Website",
            "Mobile-Friendly Design",
            "Contact Form Integration",
            "Basic SEO Setup",
            "Social Media Links",
            "1 Month Free Support"
        ],
        is_popular: false,
        category: "basic"
    },
    {
        id: 2,
        name: "Professional",
        price: 14999,
        original_price: 24999,
        description: "Ideal for growing businesses",
        features: [
            "10-Page Custom Website",
            "Advanced Responsive Design",
            "WhatsApp Integration",
            "Advanced SEO Optimization",
            "Google Analytics Setup",
            "Blog Section",
            "3 Months Free Support",
            "Free Domain (.com)"
        ],
        is_popular: true,
        category: "standard"
    },
    {
        id: 3,
        name: "Enterprise",
        price: 34999,
        original_price: 59999,
        description: "Complete solution for established businesses",
        features: [
            "Unlimited Pages",
            "E-Commerce Ready",
            "Payment Gateway Integration",
            "Custom Admin Panel",
            "Premium SEO Package",
            "Speed Optimization",
            "6 Months Free Support",
            "Free Domain + Hosting (1 Year)",
            "Priority Support"
        ],
        is_popular: false,
        category: "premium"
    }
];

export default function PricingSection() {
    const { data: plans } = useQuery({
        queryKey: ['pricing-plans'],
        queryFn: () => localClient.get('/pricing'),
        initialData: []
    });

    const displayPlans = plans && plans.length > 0 ? plans.filter(p => p.is_active !== false) : defaultPlans;

    return (
        <section className="py-24 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <SectionHeading
                    badge="Pricing Plans"
                    title="Affordable Packages For Everyone"
                    subtitle="Transparent pricing with no hidden costs. Choose the plan that fits your needs."
                    light
                    className=""
                />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
                    {displayPlans.slice(0, 3).map((plan, index) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`relative rounded-3xl p-1 ${plan.is_popular
                                ? 'bg-gradient-to-br from-amber-400 via-orange-500 to-pink-500'
                                : 'bg-white/10'
                                }`}
                        >
                            {plan.is_popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full text-sm font-bold text-white flex items-center gap-1 shadow-lg">
                                    <Sparkles className="w-4 h-4" />
                                    Most Popular
                                </div>
                            )}

                            <div className={`h-full rounded-[calc(1.5rem-4px)] p-6 lg:p-8 ${plan.is_popular ? 'bg-white dark:bg-slate-900' : 'bg-white/5 backdrop-blur-sm'
                                }`}>
                                <h3 className={`text-xl font-bold mb-2 ${plan.is_popular ? 'text-slate-900 dark:text-white' : 'text-white'}`}>
                                    {plan.name}
                                </h3>
                                <p className={`text-sm mb-6 ${plan.is_popular ? 'text-slate-600 dark:text-slate-400' : 'text-white/70'}`}>
                                    {plan.description}
                                </p>

                                <div className="mb-6">
                                    <div className="flex items-baseline gap-2">
                                        <span className={`text-4xl font-bold ${plan.is_popular ? 'text-slate-900 dark:text-white' : 'text-white'}`}>
                                            ₹{plan.price?.toLocaleString('en-IN')}
                                        </span>
                                        {plan.original_price && (
                                            <span className={`text-lg line-through ${plan.is_popular ? 'text-slate-400 dark:text-slate-500' : 'text-white/50'}`}>
                                                ₹{plan.original_price?.toLocaleString('en-IN')}
                                            </span>
                                        )}
                                    </div>
                                    <p className={`text-sm ${plan.is_popular ? 'text-slate-500 dark:text-slate-500' : 'text-white/60'}`}>
                                        One-time payment
                                    </p>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {plan.features?.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${plan.is_popular ? 'bg-green-100 dark:bg-green-900/30' : 'bg-white/10'
                                                }`}>
                                                <Check className={`w-3 h-3 ${plan.is_popular ? 'text-green-600 dark:text-green-400' : 'text-green-400'}`} />
                                            </div>
                                            <span className={`text-sm ${plan.is_popular ? 'text-slate-600 dark:text-slate-400' : 'text-white/80'}`}>
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <Link to={createPageUrl("Contact") + `?plan=${plan.name}`}>
                                    {plan.is_popular ? (
                                        <GradientButton variant="secondary" className="w-full">
                                            Get Started
                                            <ArrowRight className="w-4 h-4" />
                                        </GradientButton>
                                    ) : (
                                        <GradientButton variant="ghost" className="w-full border-white/30 hover:bg-white/20">
                                            Get Started
                                            <ArrowRight className="w-4 h-4" />
                                        </GradientButton>
                                    )}
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.p
                    className="text-center text-white/60 mt-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                >
                    Need a custom solution? <Link to={createPageUrl("Contact")} className="text-amber-400 hover:text-amber-300 underline">Contact us</Link> for a personalized quote.
                </motion.p>
            </div>
        </section>
    );
}