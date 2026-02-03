import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import {
    Target, Eye, Heart, Zap, Users, Award, Clock,
    ArrowRight, Linkedin, Twitter, Github, Mail
} from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import GlassCard from '../components/ui/GlassCard';
import GradientButton from '../components/ui/GradientButton';
import AnimatedCounter from '../components/ui/AnimatedCounter';

const defaultTeam = [
    {
        id: 1,
        name: "Vikram Singh",
        designation: "Founder & CEO",
        bio: "10+ years in web development. Passionate about creating digital solutions that drive business growth.",
        photo_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
        linkedin: "#",
        twitter: "#"
    },
    {
        id: 2,
        name: "Priya Mehta",
        designation: "Lead Designer",
        bio: "UI/UX expert with a keen eye for aesthetics and user experience. Creates designs that convert.",
        photo_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face",
        linkedin: "#",
        twitter: "#"
    },
    {
        id: 3,
        name: "Rahul Sharma",
        designation: "Senior Developer",
        bio: "Full-stack developer specializing in React and Node.js. Builds scalable, performant applications.",
        photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
        linkedin: "#",
        github: "#"
    },
    {
        id: 4,
        name: "Ananya Reddy",
        designation: "Project Manager",
        bio: "Ensures projects are delivered on time and exceed client expectations. Expert in agile methodologies.",
        photo_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
        linkedin: "#",
        twitter: "#"
    }
];

const timeline = [
    { year: "2019", title: "The Beginning", description: "TechFreak started as a small freelance operation with a dream to help businesses go digital." },
    { year: "2020", title: "First Office", description: "Opened our first office and grew to a team of 5 passionate developers and designers." },
    { year: "2021", title: "100 Projects", description: "Celebrated our 100th successful project delivery and expanded our service offerings." },
    { year: "2022", title: "Team Expansion", description: "Grew to 15+ team members and started serving clients across India." },
    { year: "2023", title: "500+ Projects", description: "Reached the milestone of 500+ completed projects with 98% client satisfaction." },
    { year: "2024", title: "Innovation Hub", description: "Launched our innovation lab focusing on cutting-edge web technologies." }
];

const values = [
    { icon: Target, title: "Mission", description: "To empower Indian businesses with world-class web solutions at affordable prices." },
    { icon: Eye, title: "Vision", description: "To be the most trusted web development partner for businesses across India." },
    { icon: Heart, title: "Values", description: "Quality, integrity, innovation, and customer-first approach in everything we do." },
    { icon: Zap, title: "Promise", description: "Deliver exceptional websites that drive real business results for our clients." }
];

export default function About() {
    const { data: teamMembers } = useQuery({
        queryKey: ['team'],
        queryFn: () => base44.entities.TeamMember.list(),
        initialData: []
    });

    const displayTeam = teamMembers.length > 0 ? teamMembers.filter(t => t.is_active !== false) : defaultTeam;

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.span
                        className="inline-block px-4 py-2 bg-white/10 border border-white/20 text-white/90 rounded-full text-sm font-medium mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        About Us
                    </motion.span>
                    <motion.h1
                        className="text-4xl md:text-6xl font-bold text-white mb-6"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        We're Building The
                        <br />
                        <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Future of Web</span>
                    </motion.h1>
                    <motion.p
                        className="text-lg text-white/70 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        A passionate team of developers and designers dedicated to helping Indian businesses succeed online.
                    </motion.p>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-4">
                                Our Story
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                                From a Small Dream to
                                <br />
                                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">500+ Happy Clients</span>
                            </h2>
                            <p className="text-slate-600 mb-6 leading-relaxed">
                                TechFreak was born from a simple belief: every business, regardless of size, deserves a stunning online presence.
                                What started as a one-person freelance operation in 2019 has grown into a full-service web development agency
                                serving clients across India.
                            </p>
                            <p className="text-slate-600 mb-8 leading-relaxed">
                                Our journey has been driven by passion, innovation, and an unwavering commitment to quality.
                                Today, we're proud to have helped over 500 businesses transform their digital presence and achieve their goals.
                            </p>

                            <div className="grid grid-cols-3 gap-6">
                                <div className="text-center p-4 bg-slate-50 rounded-2xl">
                                    <div className="text-3xl font-bold text-indigo-600 mb-1">
                                        <AnimatedCounter end={500} suffix="+" />
                                    </div>
                                    <p className="text-sm text-slate-600">Projects</p>
                                </div>
                                <div className="text-center p-4 bg-slate-50 rounded-2xl">
                                    <div className="text-3xl font-bold text-indigo-600 mb-1">
                                        <AnimatedCounter end={98} suffix="%" />
                                    </div>
                                    <p className="text-sm text-slate-600">Satisfaction</p>
                                </div>
                                <div className="text-center p-4 bg-slate-50 rounded-2xl">
                                    <div className="text-3xl font-bold text-indigo-600 mb-1">
                                        <AnimatedCounter end={5} suffix="+" />
                                    </div>
                                    <p className="text-sm text-slate-600">Years</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=500&fit=crop"
                                alt="Our team"
                                className="rounded-3xl shadow-2xl"
                            />
                            <div className="absolute -bottom-6 -left-6 p-6 bg-white rounded-2xl shadow-xl">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                                        <Award className="w-7 h-7 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900">Top Rated</p>
                                        <p className="text-sm text-slate-600">Web Agency 2024</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Mission & Values */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-4">
                    <SectionHeading
                        badge="Our Purpose"
                        title="Mission, Vision & Values"
                        subtitle="The principles that guide everything we do."
                    />

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <GlassCard className="h-full p-6 bg-white" glowColor="rgba(99, 102, 241, 0.1)">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4">
                                        <item.icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                                    <p className="text-slate-600">{item.description}</p>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <SectionHeading
                        badge="Our Journey"
                        title="The TechFreak Timeline"
                        subtitle="Key milestones in our growth story."
                    />

                    <div className="relative max-w-4xl mx-auto">
                        {/* Timeline line */}
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500" />

                        {timeline.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    }`}
                            >
                                <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'} pl-12 md:pl-0`}>
                                    <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-bold mb-2">
                                        {item.year}
                                    </span>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                                    <p className="text-slate-600">{item.description}</p>
                                </div>

                                {/* Center dot */}
                                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-white border-4 border-indigo-500 rounded-full transform -translate-x-1/2" />

                                <div className="hidden md:block flex-1" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-24 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
                <div className="container mx-auto px-4">
                    <SectionHeading
                        badge="Our Team"
                        title="Meet The People Behind TechFreak"
                        subtitle="Talented individuals who bring your vision to life."
                        light
                    />

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {displayTeam.slice(0, 4).map((member, index) => (
                            <motion.div
                                key={member.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 hover:bg-white/20 transition-colors">
                                    <div className="relative mb-4">
                                        <img
                                            src={member.photo_url || `https://ui-avatars.com/api/?name=${member.name}&background=6366f1&color=fff&size=200`}
                                            alt={member.name}
                                            className="w-32 h-32 mx-auto rounded-2xl object-cover"
                                        />
                                    </div>
                                    <h3 className="text-xl font-bold text-white text-center">{member.name}</h3>
                                    <p className="text-indigo-300 text-center mb-3">{member.designation}</p>
                                    <p className="text-white/70 text-sm text-center mb-4">{member.bio}</p>

                                    <div className="flex justify-center gap-3">
                                        {member.linkedin && (
                                            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                                                <Linkedin className="w-4 h-4 text-white" />
                                            </a>
                                        )}
                                        {member.twitter && (
                                            <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                                                <Twitter className="w-4 h-4 text-white" />
                                            </a>
                                        )}
                                        {member.github && (
                                            <a href={member.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                                                <Github className="w-4 h-4 text-white" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            Ready to Work With Us?
                        </h2>
                        <p className="text-slate-600 mb-8 max-w-xl mx-auto">
                            Let's discuss how we can help your business grow online.
                        </p>
                        <Link to={createPageUrl("Contact")}>
                            <GradientButton variant="primary" size="lg">
                                Get In Touch
                                <ArrowRight className="w-5 h-5" />
                            </GradientButton>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}