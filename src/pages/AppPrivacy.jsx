import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import PageHero from '../components/ui/PageHero';
import {
    Shield,
    Lock,
    Eye,
    Database,
    Share2,
    ChevronRight,
    Info,
    Mail,
    ShieldCheck,
    ExternalLink
} from 'lucide-react';

const sections = [
    { id: 'intro', title: 'Introduction', icon: Info },
    { id: 'collect', title: 'Information We Collect', icon: Database },
    { id: 'usage', title: 'How We Use Data', icon: Eye },
    { id: 'sharing', title: 'Sharing Information', icon: Share2 },
    { id: 'security', title: 'Security Measures', icon: Lock },
    { id: 'contact', title: 'Contact Us', icon: Mail },
];

export default function AppPrivacy() {
    const [activeSection, setActiveSection] = useState('intro');
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
                className="fixed top-0 left-0 right-0 h-1 bg-emerald-600 dark:bg-emerald-500 origin-left z-[100]"
                style={{ scaleX }}
            />

            <PageHero
                title="Privacy Policy"
                subtitle="Your privacy is our top priority. Learn how we protect and manage your data."
                badge="Data Protection"
                badgeIcon={Shield}
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
                                Privacy Sections
                            </h4>
                            {sections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => scrollToSection(section.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-left ${activeSection === section.id
                                            ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] dark:shadow-none border border-slate-200 dark:border-slate-800'
                                            : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900/50'
                                        }`}
                                >
                                    <section.icon size={18} />
                                    <span className="font-medium">{section.title}</span>
                                    {activeSection === section.id && (
                                        <motion.div layoutId="active-indicator-privacy" className="ml-auto">
                                            <ChevronRight size={16} />
                                        </motion.div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </aside>

                    {/* Content Area */}
                    <main className="lg:w-3/4 space-y-12">
                        {/* Status Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 p-6 rounded-3xl"
                        >
                            <div className="flex gap-4 items-center">
                                <div className="bg-emerald-600 p-2.5 rounded-xl text-white shadow-lg shadow-emerald-500/20">
                                    <ShieldCheck size={22} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-emerald-900 dark:text-emerald-100 mb-0.5">Compliant & Secure</h4>
                                    <p className="text-emerald-700 dark:text-emerald-300 text-sm">
                                        Last Updated: February 2026 • GDPA & CCPA Aligned
                                    </p>
                                </div>
                                <div className="ml-auto hidden md:block">
                                    <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 rounded-full text-xs font-bold uppercase">Active Protection</span>
                                </div>
                            </div>
                        </motion.div>

                        <div className="space-y-16">
                            {/* Section 1: Intro */}
                            <section id="intro" className="scroll-mt-32">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="h-12 w-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50">
                                        <Shield size={26} />
                                    </div>
                                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">1. Introduction</h2>
                                </div>
                                <div className="prose prose-slate dark:prose-invert max-w-none bg-white dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-sm">
                                    <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                                        Welcome to <strong>TechFreak</strong>. We are committed to protecting your personal information and your right to privacy.
                                        This policy outlines our commitment to transparency and our dedication to safeguarding any data we process.
                                    </p>
                                    <div className="mt-6 flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 w-fit">
                                        <Mail size={16} className="text-indigo-500" />
                                        <span className="text-sm font-medium text-slate-500">Legal queries: hello@techfreak.in</span>
                                    </div>
                                </div>
                            </section>

                            {/* Section 2: Collect */}
                            <section id="collect" className="scroll-mt-32">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="h-12 w-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50">
                                        <Database size={26} />
                                    </div>
                                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">2. Information We Collect</h2>
                                </div>
                                <div className="prose prose-slate dark:prose-invert max-w-none bg-white dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-sm">
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                                        We collect personal information that you voluntarily provide to us when you express interest in our services. This is stored securely in our encrypted databases.
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {[
                                            { label: 'Identity', desc: 'Name, professional title, and company details.', color: 'blue' },
                                            { label: 'Contact', desc: 'Email address, phone number, and location.', color: 'indigo' },
                                            { label: 'Project', desc: 'Business requirements and technical specs.', color: 'emerald' }
                                        ].map((item, idx) => (
                                            <div key={idx} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                                                <div className={`h-2 w-12 mb-4 rounded-full bg-${item.color}-500`} />
                                                <h5 className="font-bold text-slate-900 dark:text-slate-200 mb-2">{item.label}</h5>
                                                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* Section 3: Usage */}
                            <section id="usage" className="scroll-mt-32">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="h-12 w-12 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800/50">
                                        <Eye size={26} />
                                    </div>
                                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">3. How We Use Data</h2>
                                </div>
                                <div className="prose prose-slate dark:prose-invert max-w-none bg-white dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-sm">
                                    <p className="text-slate-600 dark:text-slate-400 mb-6">We use personal information collected via our Website for specific, legitimate business purposes:</p>
                                    <div className="space-y-3">
                                        {[
                                            'To facilitate project onboarding and account creation.',
                                            'To send marketing communications and updates.',
                                            'To deliver administrative and transaction records.',
                                            'To optimize our website performance and UX.'
                                        ].map((text, idx) => (
                                            <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-700/50 group hover:border-purple-300 dark:hover:border-purple-700 transition-colors">
                                                <div className="h-6 w-6 rounded-lg bg-white dark:bg-slate-700 flex-shrink-0 flex items-center justify-center text-xs font-bold text-purple-600 shadow-sm border border-slate-200 dark:border-slate-600">
                                                    {idx + 1}
                                                </div>
                                                <p className="text-slate-700 dark:text-slate-300 font-medium text-[15px]">{text}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* Section 4: Sharing */}
                            <section id="sharing" className="scroll-mt-32">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="h-12 w-12 rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800/50">
                                        <Share2 size={26} />
                                    </div>
                                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">4. Sharing Your Information</h2>
                                </div>
                                <div className="prose prose-slate dark:prose-invert max-w-none bg-white dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-sm">
                                    <p className="text-slate-600 dark:text-slate-400 italic mb-6 leading-relaxed">
                                        "We respect your data. We do not sell, rent, or trade your personal information with third parties for their promotional purposes."
                                    </p>
                                    <div className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40">
                                        <h5 className="font-bold text-amber-900 dark:text-amber-100 mb-3">Exceptions for sharing:</h5>
                                        <ul className="text-sm space-y-2 text-amber-800/80 dark:text-amber-200/80 list-disc pl-5">
                                            <li>With your explicit, written consent.</li>
                                            <li>To comply with legal obligations or government requests.</li>
                                            <li>With trusted sub-processors for payment/hosting (e.g., Stripe, AWS).</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            {/* Section 5: Security */}
                            <section id="security" className="scroll-mt-32">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="h-12 w-12 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/50">
                                        <Lock size={26} />
                                    </div>
                                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">5. Security Measures</h2>
                                </div>
                                <div className="prose prose-slate dark:prose-invert max-w-none bg-white dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-sm overflow-hidden relative">
                                    <div className="relative z-10">
                                        <p className="text-slate-600 dark:text-slate-400 mb-6 font-medium">
                                            We implement industry-standard security protocols to ensure your data remains protected from unauthorized access.
                                        </p>
                                        <div className="flex flex-wrap gap-3">
                                            {['SSL Encryption', 'AES-256 Storage', 'Strict Access Controls', 'Regular Audits'].map((tag) => (
                                                <span key={tag} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 shadow-sm">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <Lock size={120} className="absolute -bottom-10 -right-10 text-slate-100 dark:text-slate-800 pointer-events-none" />
                                </div>
                            </section>

                            {/* Section 6: Contact */}
                            <section id="contact" className="scroll-mt-32">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="h-12 w-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/50">
                                        <Mail size={26} />
                                    </div>
                                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">6. Contact Us</h2>
                                </div>
                                <div className="prose prose-slate dark:prose-invert max-w-none bg-gradient-to-br from-emerald-600 to-teal-700 p-10 rounded-[2.5rem] shadow-2xl shadow-emerald-500/30 text-white relative overflow-hidden group">
                                    {/* Decoration */}
                                    <div className="absolute top-0 right-0 p-12 mix-blend-overlay opacity-20 group-hover:scale-110 transition-transform duration-500">
                                        <Shield size={180} />
                                    </div>

                                    <div className="relative z-10">
                                        <p className="text-emerald-50 text-lg mb-8 max-w-md leading-relaxed">
                                            Your data rights are important. If you wish to request data deletion or have privacy concerns, please reach out.
                                        </p>
                                        <address className="not-italic space-y-6">
                                            <div className="flex items-center gap-4">
                                                <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl">
                                                    <ShieldCheck size={24} />
                                                </div>
                                                <div>
                                                    <h3 className="font-black text-2xl tracking-tight uppercase leading-none">TechFreak Trust Center</h3>
                                                    <p className="text-emerald-100 text-sm mt-1">Privacy & Compliance</p>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-4 pt-4">
                                                <a
                                                    href="mailto:hello@techfreak.in"
                                                    className="inline-flex items-center gap-2 bg-white text-emerald-600 px-8 py-4 rounded-2xl font-bold hover:bg-slate-100 transition-all hover:shadow-lg hover:-translate-y-1"
                                                >
                                                    hello@techfreak.in
                                                    <ExternalLink size={18} />
                                                </a>
                                                <div className="p-4 bg-emerald-500/30 backdrop-blur-md rounded-2xl border border-white/10 text-sm font-medium">
                                                    North West, Delhi, India
                                                </div>
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
