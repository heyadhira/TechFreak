import React from 'react';
import { motion, useScroll, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { createPageUrl } from '@/utils';
import GradientButton from '../components/ui/GradientButton';
import PageHero from '../components/ui/PageHero';
import { Phone, Mail, MapPin, Clock, MessageCircle, ArrowRight, Megaphone, Sparkles, Send } from 'lucide-react';
import ContactForm from '../components/contact/ContactForm';
import NoiseTexture from '../components/ui/NoiseTexture';
import Magnetic from '../components/ui/Magnetic';

const contactInfo = [
    { icon: Phone, title: "Direct Call", value: "+91 85959 57070", href: "tel:+918595957070", color: "blue" },
    { icon: Mail, title: "Official Email", value: "techfreakdotin@gmail.com", href: "mailto:techfreakdotin@gmail.com", color: "indigo" },
    { icon: MapPin, title: "Our Location", value: "North West, Delhi, India", color: "purple" },
    { icon: Clock, title: "Support Cycle", value: "Mon - Sat: 10AM - 7PM IST", color: "slate" }
];

function ContactInfoCard({ item, index }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

    function handleMouseMove(event) {
        const rect = event.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXRelative = event.clientX - rect.left;
        const mouseYRelative = event.clientY - rect.top;
        x.set(mouseXRelative / width - 0.5);
        y.set(mouseYRelative / height - 0.5);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                perspective: 1000
            }}
            className="group relative h-full"
        >
            <div className="h-full bg-white/5 dark:bg-slate-900/40 backdrop-blur-3xl border border-white/10 dark:border-slate-800 p-8 rounded-[2.5rem] flex flex-col items-center text-center transition-all duration-500 group-hover:bg-white/10 group-hover:border-indigo-500/30 overflow-hidden shadow-2xl">
                <Magnetic strength={0.3}>
                    <div className="w-20 h-20 rounded-2xl bg-slate-950 flex items-center justify-center mb-8 border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] group-hover:shadow-indigo-500/20 transition-all duration-500">
                        <item.icon className="w-8 h-8 text-indigo-400 group-hover:scale-110 transition-transform" />
                    </div>
                </Magnetic>

                <h3 className="text-xl font-black text-white mb-3 tracking-tight" style={{ transform: "translateZ(40px)" }}>{item.title}</h3>

                {item.href ? (
                    <a href={item.href} className="text-slate-400 dark:text-slate-400 hover:text-white transition-colors font-medium text-sm leading-relaxed" style={{ transform: "translateZ(20px)" }}>
                        {item.value}
                    </a>
                ) : (
                    <p className="text-slate-400 dark:text-slate-400 font-medium text-sm leading-relaxed" style={{ transform: "translateZ(20px)" }}>
                        {item.value}
                    </p>
                )}

                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />
            </div>
        </motion.div>
    );
}

export default function Contact() {
    const urlParams = new URLSearchParams(window.location.search);
    const preSelectedService = urlParams.get('service') || '';
    const preSelectedPlan = urlParams.get('plan') || '';

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <main className="relative bg-slate-950 selection:bg-indigo-500/30">
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 z-[100] origin-left"
                style={{ scaleX }}
            />
            <NoiseTexture />

            <PageHero
                title="Let's Build Magic"
                subtitle="Starting at ₹4,999"
                badge="Globally Available"
                badgeIcon={Send}
                primaryBtnText="Deploy Your Vision"
                primaryBtnLink="#contact-form"
                secondaryBtnText="Explore Mastery"
                secondaryBtnLink={createPageUrl("Services")}
                showStats={false}
                floatingIcons={[
                    { icon: Sparkles, className: "top-20 left-[10%] text-amber-400", delay: 0.2 },
                    { icon: Send, className: "top-40 right-[15%] text-blue-400", delay: 0.4 },
                    { icon: MessageCircle, className: "bottom-20 left-[20%] text-indigo-400", delay: 0.6 },
                    { icon: Megaphone, className: "top-32 right-[5%] text-purple-400", delay: 0.8 }
                ]}
            />

            <section className="py-32 relative z-10" id="contact-form">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col items-center mb-24 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-8"
                        >
                            <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.3em]">
                                <MessageCircle className="w-4 h-4 text-indigo-500" />
                                Interactive Support
                            </span>
                        </motion.div>
                        <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-none">
                            Connecting Visionaries <br />
                            <span className="text-indigo-500">To Solutions.</span>
                        </h2>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 mb-32">
                        <div className="lg:col-span-5 grid grid-cols-1 md:grid-cols-2 gap-6 h-fit">
                            {contactInfo.map((item, index) => (
                                <ContactInfoCard key={index} item={item} index={index} />
                            ))}

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="md:col-span-2 mt-4"
                            >
                                <div className="bg-indigo-600 rounded-[2.5rem] p-10 text-white relative overflow-hidden group shadow-2xl">
                                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                                        <div className="text-center md:text-left">
                                            <h4 className="text-3xl font-black mb-2">Instant Response?</h4>
                                            <p className="text-indigo-100 font-medium">WhatsApp our tech architects now.</p>
                                        </div>
                                        <Magnetic strength={0.4}>
                                            <a
                                                href="https://wa.me/918595957070?text=Hi!%20I'm%20interested%20in%20your%20web%20development%20services."
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="h-16 px-10 rounded-2xl bg-white text-indigo-600 font-black flex items-center gap-3 hover:bg-slate-100 transition-colors shadow-xl"
                                            >
                                                <MessageCircle className="w-6 h-6" />
                                                Live Chat
                                            </a>
                                        </Magnetic>
                                    </div>
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000" />
                                </div>
                            </motion.div>
                        </div>

                        <div className="lg:col-span-7 relative">
                            <div className="absolute -top-32 -left-32 w-64 h-64 opacity-20 pointer-events-none hidden lg:block">
                                <svg className="w-full h-full stroke-indigo-500" viewBox="0 0 100 100">
                                    <motion.path
                                        d="M0 10 Q 50 10, 50 50 T 100 90"
                                        fill="none"
                                        strokeWidth="0.5"
                                        initial={{ pathLength: 0 }}
                                        whileInView={{ pathLength: 1 }}
                                        transition={{ duration: 3 }}
                                    />
                                </svg>
                            </div>

                            <ContactForm
                                preSelectedService={preSelectedService}
                                preSelectedPlan={preSelectedPlan}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="h-[500px] relative overflow-hidden mx-4 mb-4 rounded-[3rem] border border-white/5 shadow-2xl">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995709657!3d19.08219783958221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1704067200000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: "grayscale(1) invert(0.9) contrast(1.2)" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="TechFreak Location"
                />
                <div className="absolute inset-0 bg-indigo-600/10 pointer-events-none" />
            </section>
        </main>
    );
}