import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import PageHero from '../components/ui/PageHero';
import {
    FileText,
    Gavel,
    Scale,
    AlertCircle,
    ChevronRight,
    Terminal,
    ShieldCheck,
    CreditCard,
    ExternalLink
} from 'lucide-react';

const sections = [
    { id: 'agreement', title: 'Agreement to Terms', icon: Gavel },
    { id: 'ip-rights', title: 'Intellectual Property', icon: Scale },
    { id: 'user-reps', title: 'User Representations', icon: ShieldCheck },
    { id: 'payments', title: 'Services & Payment', icon: CreditCard },
    { id: 'liability', title: 'Limitation of Liability', icon: AlertCircle },
    { id: 'contact', title: 'Contact Us', icon: Terminal },
];

export default function AppTerms() {
    const [activeSection, setActiveSection] = useState('agreement');
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.5, rootMargin: '-10% 0% -80% 0%' }
        );

        sections.forEach((section) => {
            const el = document.getElementById(section.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="bg-[#f8fafc] dark:bg-[#020617] min-h-screen pb-24">
            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-indigo-600 dark:bg-indigo-500 origin-left z-[100]"
                style={{ scaleX }}
            />

            <PageHero
                title="Terms of Service"
                subtitle="Please read these terms carefully before using our premium services."
                badge="Legal Framework"
                badgeIcon={FileText}
                showStats={false}
                primaryBtnText={null}
                primaryBtnLink={null}
                secondaryBtnText={null}
                secondaryBtnLink={null}
            />

            <div className="container mx-auto px-4 mt-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sticky Sidebar Navigation */}
                    <aside className="lg:w-1/4 lg:sticky lg:top-24 lg:h-[calc(100vh-120px)] overflow-y-auto hidden lg:block">
                        <div className="space-y-2 pr-4">
                            <h4 className="text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4 px-3">
                                Table of Contents
                            </h4>
                            {sections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => scrollToSection(section.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-left ${activeSection === section.id
                                            ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] dark:shadow-none border border-slate-200 dark:border-slate-800'
                                            : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900/50'
                                        }`}
                                >
                                    <section.icon size={18} />
                                    <span className="font-medium">{section.title}</span>
                                    {activeSection === section.id && (
                                        <motion.div layoutId="active-indicator" className="ml-auto">
                                            <ChevronRight size={16} />
                                        </motion.div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </aside>

                    {/* Content Area */}
                    <main className="lg:w-3/4 space-y-12">
                        {/* Summary Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 p-6 rounded-3xl"
                        >
                            <div className="flex gap-4 items-start">
                                <div className="bg-indigo-600 p-2 rounded-lg text-white">
                                    <AlertCircle size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-indigo-900 dark:text-indigo-100 mb-1">TL;DR (Quick Summary)</h4>
                                    <p className="text-indigo-700 dark:text-indigo-300 text-sm leading-relaxed">
                                        These terms explain what you can expect from TechFreak and what we expect from you. By using our site, you agree to these rules. We own our content, you're responsible for your account, and we aren't liable for certain losses.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <div className="space-y-16">
                            {/* Section 1 */}
                            <section id="agreement" className="scroll-mt-32">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="h-12 w-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50">
                                        <Gavel size={26} />
                                    </div>
                                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">1. Agreement to Terms</h2>
                                </div>
                                <div className="prose prose-slate dark:prose-invert max-w-none bg-white dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-sm">
                                    <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                                        These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and <strong>TechFreak</strong> (“we,” “us” or “our”),
                                        concerning your access to and use of the website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the “Site”).
                                    </p>
                                    <p className="text-slate-600 dark:text-slate-400 mt-4 leading-relaxed">
                                        We are registered in India and have our registered office in North West, Delhi. You agree that by accessing the Site, you have read, understood, and agreed to be bound by all of these Terms of Service.
                                    </p>
                                </div>
                            </section>

                            {/* Section 2 */}
                            <section id="ip-rights" className="scroll-mt-32">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="h-12 w-12 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800/50">
                                        <Scale size={26} />
                                    </div>
                                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">2. Intellectual Property Rights</h2>
                                </div>
                                <div className="prose prose-slate dark:prose-invert max-w-none bg-white dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-sm">
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                        Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”)
                                        and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us.
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                                        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50">
                                            <h5 className="font-bold flex items-center gap-2 mb-3 text-slate-900 dark:text-slate-200">
                                                <ShieldCheck size={18} className="text-green-500" /> Permitted Use
                                            </h5>
                                            <ul className="text-[15px] space-y-2 list-none p-0 text-slate-600 dark:text-slate-400">
                                                <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-600" /> Browse content for personal use</li>
                                                <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-600" /> Share links to public pages</li>
                                                <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-600" /> Download resources for client use</li>
                                            </ul>
                                        </div>
                                        <div className="p-5 rounded-2xl bg-red-50/50 dark:bg-red-950/10 border border-red-100 dark:border-red-900/30">
                                            <h5 className="font-bold flex items-center gap-2 mb-3 text-red-900 dark:text-red-200">
                                                <AlertCircle size={18} className="text-red-500" /> Prohibited Actions
                                            </h5>
                                            <ul className="text-[15px] space-y-2 list-none p-0 text-red-700/80 dark:text-red-400/80">
                                                <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-red-200 dark:bg-red-800" /> Copy or extract source code</li>
                                                <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-red-200 dark:bg-red-800" /> Resell designs without license</li>
                                                <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-red-200 dark:bg-red-800" /> Unauthorized use of Marks</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Section 3 */}
                            <section id="user-reps" className="scroll-mt-32">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="h-12 w-12 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800/50">
                                        <ShieldCheck size={26} />
                                    </div>
                                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">3. User Representations</h2>
                                </div>
                                <div className="prose prose-slate dark:prose-invert max-w-none bg-white dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-sm">
                                    <p className="text-slate-600 dark:text-slate-400 mb-6">By using the Site, you represent and warrant that:</p>
                                    <div className="space-y-4">
                                        {[
                                            'All registration information you submit will be true and accurate.',
                                            'You will maintain the accuracy of such information promptly.',
                                            'You have the legal capacity to comply with these Terms.',
                                            'You are not a minor in your jurisdiction.'
                                        ].map((text, idx) => (
                                            <motion.div
                                                key={idx}
                                                whileHover={{ x: 10 }}
                                                className="flex gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-700/50"
                                            >
                                                <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                                                    {idx + 1}
                                                </div>
                                                <p className="text-slate-700 dark:text-slate-300 font-medium">{text}</p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* Section 4 */}
                            <section id="payments" className="scroll-mt-32">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="h-12 w-12 rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800/50">
                                        <CreditCard size={26} />
                                    </div>
                                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">4. Services and Payment</h2>
                                </div>
                                <div className="prose prose-slate dark:prose-invert max-w-none bg-white dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-sm">
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                                        We offer various web development and design services. Prices for services are subject to change without notice. We provide detailed quotes before any engagement.
                                    </p>
                                    <div className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40">
                                        <div className="flex items-start gap-4">
                                            <AlertCircle className="text-amber-600 mt-1" size={24} />
                                            <div>
                                                <h5 className="font-bold text-amber-900 dark:text-amber-100 mb-1">Billing Policy</h5>
                                                <p className="text-sm text-amber-800/80 dark:text-amber-200/80 leading-relaxed">
                                                    All payments are processed through secure gateways. We do not store your credit card information. Service delivery begins only after payment confirmation.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Section 5 */}
                            <section id="liability" className="scroll-mt-32">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="h-12 w-12 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/50">
                                        <AlertCircle size={26} />
                                    </div>
                                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">5. Limitation of Liability</h2>
                                </div>
                                <div className="prose prose-slate dark:prose-invert max-w-none bg-white dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-sm">
                                    <div className="relative p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                                        <Scale className="absolute top-4 right-4 text-slate-200 dark:text-slate-700" size={64} />
                                        <p className="text-slate-700 dark:text-slate-300 italic font-serif text-lg leading-relaxed relative z-10">
                                            "In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, or loss of data, arising from your use of the site or services."
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Section 6 */}
                            <section id="contact" className="scroll-mt-32">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="h-12 w-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/50">
                                        <Terminal size={26} />
                                    </div>
                                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">6. Contact Us</h2>
                                </div>
                                <div className="prose prose-slate dark:prose-invert max-w-none bg-gradient-to-br from-indigo-600 to-violet-700 p-10 rounded-[2.5rem] shadow-2xl shadow-indigo-500/30 text-white relative overflow-hidden group">
                                    {/* Decoration */}
                                    <div className="absolute top-0 right-0 p-12 mix-blend-overlay opacity-20 group-hover:scale-110 transition-transform duration-500">
                                        <FileText size={180} />
                                    </div>

                                    <div className="relative z-10">
                                        <p className="text-indigo-100 text-lg mb-8 max-w-md leading-relaxed">
                                            Have questions about these terms? Need further clarification? Our legal team is here to help.
                                        </p>
                                        <address className="not-italic space-y-6">
                                            <div className="flex items-center gap-4">
                                                <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl">
                                                    <FileText size={24} />
                                                </div>
                                                <div>
                                                    <h3 className="font-black text-2xl tracking-tight uppercase leading-none">TechFreak Solutions</h3>
                                                    <p className="text-indigo-200 text-sm mt-1">Legal Department</p>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-4 pt-4">
                                                <a
                                                    href="mailto:hello@techfreak.in"
                                                    className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-2xl font-bold hover:bg-slate-100 transition-all hover:shadow-lg hover:-translate-y-1"
                                                >
                                                    hello@techfreak.in
                                                    <ExternalLink size={18} />
                                                </a>
                                                <button
                                                    onClick={() => window.print()}
                                                    className="inline-flex items-center gap-2 bg-indigo-500/30 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-2xl font-bold hover:bg-indigo-500/50 transition-all"
                                                >
                                                    Print Terms
                                                </button>
                                            </div>
                                        </address>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
