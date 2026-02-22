import React from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase, Award, Clock, Zap, Target, Rocket, Activity } from 'lucide-react';
import AnimatedCounter from '../ui/AnimatedCounter';
import Magnetic from '../ui/Magnetic';

const stats = [
    {
        icon: Rocket,
        value: 150,
        suffix: "+",
        label: "Architectures Deployed",
        color: "bg-indigo-600"
    },
    {
        icon: Users,
        value: 135,
        suffix: "+",
        label: "Visionary Partners",
        color: "bg-purple-600"
    },
    {
        icon: Target,
        value: 98,
        suffix: "%",
        label: "Strategic Success",
        color: "bg-blue-600"
    },
    {
        icon: Activity,
        value: 2,
        suffix: "+",
        label: "Years of Velocity",
        color: "bg-pink-600"
    }
];

export default function StatsSection() {
    return (
        <section className="py-32 bg-slate-950 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[150px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className="text-center group"
                        >
                            <Magnetic strength={0.3}>
                                <motion.div
                                    className={`w-24 h-24 mx-auto mb-10 rounded-3xl ${stat.color} flex items-center justify-center shadow-2xl shadow-indigo-500/10 group-hover:rotate-12 transition-transform duration-500`}
                                >
                                    <stat.icon className="w-10 h-10 text-white" />
                                </motion.div>
                            </Magnetic>

                            <div className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter">
                                <AnimatedCounter
                                    end={stat.value}
                                    suffix={stat.suffix}
                                    duration={3}
                                />
                            </div>

                            <p className="text-slate-500 font-black uppercase tracking-[0.3em] text-[10px]">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}