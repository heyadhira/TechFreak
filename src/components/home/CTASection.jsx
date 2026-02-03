import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowRight, Phone, Mail, MessageCircle } from 'lucide-react';
import GradientButton from '../ui/GradientButton';

export default function CTASection() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-gradient-to-b from-blue-50 via-indigo-50/50 to-transparent rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    className="max-w-4xl mx-auto text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.span
                        className="inline-block px-4 py-2 bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 rounded-full text-sm font-medium mb-6"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        🚀 Ready to Transform Your Online Presence?
                    </motion.span>

                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                        Let's Build Something
                        <br />
                        <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Amazing Together
                        </span>
                    </h2>

                    <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Get a free consultation and quote for your project. No commitment, no pressure —
                        just expert advice to help you succeed online.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        <Link to={createPageUrl("Contact")}>
                            <GradientButton variant="primary" size="lg">
                                Get Free Consultation
                                <ArrowRight className="w-5 h-5" />
                            </GradientButton>
                        </Link>
                        <a href="https://wa.me/919876543210?text=Hi!%20I'm%20interested%20in%20your%20web%20development%20services." target="_blank" rel="noopener noreferrer">
                            <GradientButton variant="outline" size="lg">
                                <MessageCircle className="w-5 h-5" />
                                Chat on WhatsApp
                            </GradientButton>
                        </a>
                    </div>

                    {/* Contact quick links */}
                    <div className="flex flex-wrap justify-center gap-8 text-slate-600">
                        <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-indigo-600 transition-colors">
                            <Phone className="w-5 h-5" />
                            <span>+91 98765 43210</span>
                        </a>
                        <a href="mailto:hello@techfreak.in" className="flex items-center gap-2 hover:text-indigo-600 transition-colors">
                            <Mail className="w-5 h-5" />
                            <span>hello@techfreak.in</span>
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}