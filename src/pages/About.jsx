import React from 'react';
import { motion, useScroll, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { localClient } from '@/api/localClient';
import {
    Target, Eye, Heart, Zap, Users, Award,
    ArrowRight, Linkedin, Twitter, Github, Sparkles, Send, Star
} from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import GlassCard from '../components/ui/GlassCard';
import GradientButton from '../components/ui/GradientButton';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import PageHero from '../components/ui/PageHero';
import NoiseTexture from '../components/ui/NoiseTexture';
import Magnetic from '../components/ui/Magnetic';

const defaultTeam = [
    {
        id: 1,
        name: "Vikram Singh",
        designation: "Founder & CEO",
        bio: "Visionary architect with 10+ years in digital engineering. Strategically scaling Indian businesses.",
        photo_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
        linkedin: "#",
        twitter: "#"
    },
    {
        id: 2,
        name: "Priya Mehta",
        designation: "Lead Creative Designer",
        bio: "Visual storyteller specializing in high-end UI/UX. Crafting digital emotions that convert.",
        photo_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
        linkedin: "#",
        twitter: "#"
    },
    {
        id: 3,
        name: "Rahul Sharma",
        designation: "Senior Tech Architect",
        bio: "Full-stack virtuoso in React/Node.js. Engineering high-performance infrastructures.",
        photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        linkedin: "#",
        github: "#"
    },
    {
        id: 4,
        name: "Ananya Reddy",
        designation: "Product Strategist",
        bio: "Project maestro ensuring precision delivery. Scaling growth through agile innovation.",
        photo_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
        linkedin: "#",
        twitter: "#"
    }
];

const timeline = [
    { year: "2024", title: "The Ignition", description: "Launched TechFreak to disrupt the digital status quo with premium tech access for everyone." },
    { year: "2025", title: "Structural Scaling", description: "Expanded into enterprise-grade solutions, surpassing 50+ high-impact digital transformations." },
    { year: "2026", title: "Apex Innovation", description: "Evolved into a top-tier tech agency with 150+ successful deployments and 98% satisfaction." }
];

const values = [
    { icon: Target, title: "Mission", description: "Empowering visionary businesses with world-class digital engineering solutions." },
    { icon: Eye, title: "Vision", description: "To be the premier architect of digital excellence for global Indian brands." },
    { icon: Heart, title: "Aesthetics", description: "Merging high-end visual design with peak technical performance." },
    { icon: Zap, title: "Velocity", description: "Delivering state-of-the-art results with rapid, agile execution." }
];

function InteractiveMemberCard({ member, index }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
    const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);
    const springX = useSpring(rotateX, { stiffness: 150, damping: 20 });
    const springY = useSpring(rotateY, { stiffness: 150, damping: 20 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            style={{
                rotateX: springX,
                rotateY: springY,
                transformStyle: "preserve-3d",
                perspective: 1000
            }}
            className="group"
        >
            <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/5 p-8 rounded-[3rem] transition-all duration-500 group-hover:bg-indigo-600/5 group-hover:border-indigo-500/30 overflow-hidden shadow-2xl">
                <div className="relative mb-8 flex justify-center" style={{ transform: "translateZ(50px)" }}>
                    <div className="relative w-40 h-40">
                        <img
                            src={member.photo_url || `https://ui-avatars.com/api/?name=${member.name}&background=6366f1&color=fff&size=200`}
                            alt={member.name}
                            className="w-full h-full rounded-3xl object-cover ring-4 ring-white/5 group-hover:ring-indigo-500/30 transition-all shadow-2xl"
                        />
                        <div className="absolute inset-0 rounded-3xl bg-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                </div>

                <div className="text-center" style={{ transform: "translateZ(30px)" }}>
                    <h3 className="text-2xl font-black text-white mb-1 tracking-tight">{member.name}</h3>
                    <p className="text-indigo-400 font-bold mb-4 text-xs uppercase tracking-widest">{member.designation}</p>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6 px-4">{member.bio}</p>

                    <div className="flex justify-center gap-4">
                        <Magnetic strength={0.3}>
                            <a href={member.linkedin} className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                                <Linkedin className="w-4 h-4 text-white" />
                            </a>
                        </Magnetic>
                        {member.twitter && (
                            <Magnetic strength={0.3}>
                                <a href={member.twitter} className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                                    <Twitter className="w-4 h-4 text-white" />
                                </a>
                            </Magnetic>
                        )}
                    </div>
                </div>

                {/* Background Glow */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
        </motion.div>
    );
}

export default function About() {
    const { data: teamMembers } = useQuery({
        queryKey: ['team'],
        queryFn: () => localClient.get('/team'),
        initialData: []
    });

    const displayTeam = teamMembers && teamMembers.length > 0 ? teamMembers.filter(t => t.is_active !== false) : defaultTeam;

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    return (
        <main className="relative bg-slate-950 selection:bg-indigo-500/30">
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 z-[100] origin-left"
                style={{ scaleX }}
            />
            <NoiseTexture />

            <PageHero
                title="The Architects of Scale"
                subtitle="Engineering Digital Advantage"
                badge="Elite Tech Collective"
                badgeIcon={Users}
                primaryBtnText="Initiate Partnership"
                primaryBtnLink={createPageUrl("Contact")}
                secondaryBtnText="Explore Innovations"
                secondaryBtnLink={createPageUrl("Services")}
                showStats={true}
                floatingIcons={[
                    { icon: Target, className: "top-20 left-[10%] text-red-500", delay: 0.2 },
                    { icon: Sparkles, className: "top-40 right-[15%] text-indigo-400", delay: 0.4 },
                    { icon: Send, className: "bottom-20 left-[20%] text-blue-500", delay: 0.6 },
                    { icon: Star, className: "top-32 right-[5%] text-purple-400", delay: 0.8 }
                ]}
            />

            {/* Story Section */}
            <section className="py-32 relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                                <Star className="w-3 h-3 text-indigo-500" />
                                Our Narrative
                            </span>
                            <h2 className="text-5xl md:text-7xl font-black text-white mb-10 tracking-tighter leading-none">
                                Turning Dreams Into <br />
                                <span className="text-indigo-500">Digital Engines.</span>
                            </h2>
                            <p className="text-xl text-slate-400 mb-8 leading-relaxed font-medium">
                                TechFreak was founded in 2024 with a singular mandate: to bridge the gap between premium visual aesthetics and high-performance engineering for the Indian market.
                            </p>
                            <p className="text-slate-500 mb-12 leading-relaxed">
                                What began as an agile lab has scaled into a full-scale digital powerhouse. We don't just build websites; we engineer revenue-generating ecosystems that allow brands to outpace the competition.
                            </p>

                            <div className="grid grid-cols-3 gap-8">
                                {[
                                    { label: "Deployments", val: 150 },
                                    { label: "Loyalty Rate", val: 98, suffix: "%" },
                                    { label: "Market Edge", val: 5 }
                                ].map((stat, i) => (
                                    <div key={i} className="p-6 bg-white/5 rounded-[2rem] border border-white/5 hover:border-indigo-500/20 transition-colors group">
                                        <div className="text-3xl font-black text-white mb-1 group-hover:text-indigo-400 transition-colors text-center md:text-left">
                                            <AnimatedCounter end={stat.val} suffix={stat.suffix || "+"} />
                                        </div>
                                        <p className="text-[10px] uppercase tracking-widest text-slate-500 font-black text-center md:text-left">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, type: "spring" }}
                            className="relative group lg:mt-0 mt-20"
                        >
                            <div className="absolute -inset-4 bg-indigo-500/10 rounded-[3rem] blur-3xl group-hover:bg-indigo-500/20 transition-colors" />
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=700&fit=crop"
                                alt="Innovation Lab"
                                className="relative rounded-[3rem] shadow-2xl border border-white/10 grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute -bottom-10 -left-10 p-8 bg-slate-900 border border-white/10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] max-w-[280px]">
                                <div className="flex items-center gap-5">
                                    <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/30">
                                        <Award className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-black text-white tracking-tight text-xl">Top Rated</p>
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Elite Tech Partner 2024</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Decorative Blobs */}
                <div className="absolute top-1/2 left-0 w-96 h-96 bg-indigo-600/5 rounded-full blur-[120px] -z-10" />
            </section>

            {/* Mission & Values - Interactive Grid */}
            <section className="py-32 relative bg-white/5 backdrop-blur-3xl">
                <div className="container mx-auto px-4">
                    <SectionHeading
                        badge="Our DNA"
                        title="Engineering Principles"
                        subtitle="The technical and visual baseline for every line of code we ship."
                        className="mb-20"
                    />

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <GlassCard className="h-full p-10 bg-slate-900/60 transition-all duration-500 hover:scale-[1.02] border-white/5 rounded-[3rem]" glowColor="rgba(99, 102, 241, 0.2)">
                                    <Magnetic strength={0.4}>
                                        <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center mb-8 shadow-lg shadow-indigo-600/20">
                                            <item.icon className="w-8 h-8 text-white" />
                                        </div>
                                    </Magnetic>
                                    <h3 className="text-2xl font-black text-white mb-4 tracking-tight">{item.title}</h3>
                                    <p className="text-slate-400 leading-relaxed font-medium">{item.description}</p>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline - Cinematic Vertical Scroll */}
            <section className="py-32 bg-slate-950 relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <SectionHeading
                        badge="The Trajectory"
                        title="Strategic Milestones"
                        subtitle="A look back at our evolution into an elite tech lab."
                    />

                    <div className="relative max-w-4xl mx-auto mt-24">
                        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-indigo-500/50 to-transparent transform -translate-x-1/2" />

                        {timeline.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                className={`relative flex items-center mb-24 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                            >
                                <div className={`flex-1 hidden md:block`} />

                                <div className="absolute left-6 md:left-1/2 w-12 h-12 bg-slate-950 border border-indigo-500 rounded-2xl transform -translate-x-1/2 z-10 flex items-center justify-center">
                                    <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse" />
                                </div>

                                <div className="flex-1 pl-20 md:pl-12 md:pr-12">
                                    <GlassCard className="p-10 border-white/5 rounded-[2.5rem] bg-indigo-600/5 group hover:bg-slate-900/60 transition-all duration-500">
                                        <div className="inline-block px-5 py-1.5 bg-indigo-500 text-white rounded-full text-[10px] font-black tracking-widest uppercase mb-6 shadow-lg shadow-indigo-500/30">
                                            Phase {item.year}
                                        </div>
                                        <h3 className="text-3xl font-black text-white mb-4 tracking-tight group-hover:text-indigo-400 transition-colors">{item.title}</h3>
                                        <p className="text-slate-400 leading-relaxed font-medium">
                                            {item.description}
                                        </p>
                                    </GlassCard>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section - Interactive 3D */}
            <section className="py-32 bg-gradient-to-b from-slate-950 to-indigo-950/20">
                <div className="container mx-auto px-4">
                    <SectionHeading
                        badge="The Guild"
                        title="Meet The Architects"
                        subtitle="The engineers and designers steering TechFreak's vision."
                    />

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-24">
                        {displayTeam.slice(0, 4).map((member, index) => (
                            <InteractiveMemberCard key={member.id} member={member} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA - Deep Perspective */}
            <section className="py-32 relative overflow-hidden bg-slate-950">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto p-16 rounded-[4rem] bg-indigo-600/5 border border-white/5 relative group overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-transparent to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                        <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-none">
                            Ready To Build <br />
                            <span className="text-indigo-500 underline decoration-indigo-500/20 underline-offset-[12px]">The Future?</span>
                        </h2>
                        <p className="text-xl text-slate-400 mb-12 max-w-xl mx-auto font-medium">
                            Join over 150+ brands that have scaled their digital presence with our elite tech lab.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Magnetic strength={0.3}>
                                <GradientButton variant="primary" size="lg" className="h-16 px-12 rounded-2xl group text-lg font-black shadow-2xl shadow-indigo-600/20" onClick={() => window.location.href = createPageUrl("Contact")}>
                                    Initiate Project
                                    <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </GradientButton>
                            </Magnetic>
                            <Magnetic strength={0.2}>
                                <GradientButton variant="outline" size="lg" className="h-16 px-12 rounded-2xl bg-white/5 border-white/10 hover:bg-white/10 text-white font-black" onClick={() => window.location.href = createPageUrl("Services")}>
                                    Our Mastery
                                </GradientButton>
                            </Magnetic>
                        </div>
                    </motion.div>
                </div>
                {/* Background Decoration */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            </section>
        </main>
    );
}