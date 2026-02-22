import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowRight, Phone, MessageCircle, Rocket, Sparkles, Zap } from 'lucide-react';
import GradientButton from '../ui/GradientButton';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import FloatingIcon from '../ui/FloatingIcon';

export default function CTASection() {
    const { settings } = useSiteSettings();

    return (
        <section className="py-32 bg-slate-950 relative overflow-hidden transition-colors duration-300">
            {/* Dynamic Gradient Mesh */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_0%,transparent_70%)]" />
            </div>

            {/* Floating 3D-like icons */}
            <FloatingIcon icon={Rocket} className="top-20 left-[10%] text-blue-500/20 w-16 h-16" delay={0} />
            <FloatingIcon icon={Sparkles} className="bottom-20 right-[15%] text-indigo-500/20 w-12 h-12" delay={1} />
            <FloatingIcon icon={Zap} className="top-40 right-[10%] text-purple-500/20 w-10 h-10" delay={0.5} />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    className="max-w-5xl mx-auto text-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mb-8"
                    >
                        <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-white/90 text-sm font-bold uppercase tracking-widest backdrop-blur-xl shadow-2xl">
                            <Rocket className="w-4 h-4 text-orange-500" />
                            Ready for takeoff?
                        </span>
                    </motion.div>

                    <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[1.05] tracking-tight">
                        Build your digital
                        <br />
                        <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent drop-shadow-2xl">
                            Future Today
                        </span>
                    </h2>

                    <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Stop dreaming about it. Let's create a high-performance, visually stunning website that
                        converts your vision into a global reality.
                    </p>

                    <div className="flex flex-wrap justify-center gap-6 mb-16">
                        <Link to={createPageUrl("Contact")}>
                            <GradientButton variant="primary" size="lg" className="h-16 px-10 rounded-2xl text-lg font-black group shadow-[0_20px_40px_-10px_rgba(99,102,241,0.5)]">
                                Launch Project
                                <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
                            </GradientButton>
                        </Link>
                        <a href={`https://wa.me/${settings.whatsapp}?text=Hi!%20I'm%20interested%20in%20your%20web%20development%20services.`} target="_blank" rel="noopener noreferrer">
                            <GradientButton variant="ghost" size="lg" className="h-16 px-10 rounded-2xl bg-white/5 border-white/10 hover:bg-white/10 text-white font-bold backdrop-blur-xl">
                                <MessageCircle className="w-6 h-6 mr-2 text-green-500" />
                                Chat Now
                            </GradientButton>
                        </a>
                    </div>

                    {/* Contact Stats/Links */}
                    <div className="flex flex-wrap justify-center gap-12 pt-12 border-t border-white/5">
                        <motion.a
                            whileHover={{ y: -5 }}
                            href={`tel:${settings.phone?.replace(/[^0-9+]/g, '')}`}
                            className="flex flex-col items-center gap-2 group"
                        >
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                                <Phone className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-sm font-bold text-slate-500 group-hover:text-white transition-colors tracking-widest">{settings.phone}</span>
                        </motion.a>

                        <motion.a
                            whileHover={{ y: -5 }}
                            href={`mailto:${settings.email}`}
                            className="flex flex-col items-center gap-2 group"
                        >
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-sm font-bold text-slate-500 group-hover:text-white transition-colors tracking-widest">{settings.email}</span>
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}