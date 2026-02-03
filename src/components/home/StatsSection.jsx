import React from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase, Award, Clock } from 'lucide-react';
import AnimatedCounter from '../ui/AnimatedCounter';

const stats = [
    {
        icon: Briefcase,
        value: 500,
        suffix: "+",
        label: "Projects Completed",
        color: "from-blue-500 to-indigo-600"
    },
    {
        icon: Users,
        value: 350,
        suffix: "+",
        label: "Happy Clients",
        color: "from-purple-500 to-pink-600"
    },
    {
        icon: Award,
        value: 98,
        suffix: "%",
        label: "Client Satisfaction",
        color: "from-amber-500 to-orange-600"
    },
    {
        icon: Clock,
        value: 5,
        suffix: "+",
        label: "Years Experience",
        color: "from-green-500 to-emerald-600"
    }
];

export default function StatsSection() {
    return (
        <section className="py-20 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="text-center group"
                        >
                            <motion.div
                                className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <stat.icon className="w-8 h-8 text-white" />
                            </motion.div>

                            <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                                <AnimatedCounter
                                    end={stat.value}
                                    suffix={stat.suffix}
                                    duration={2.5}
                                />
                            </div>

                            <p className="text-white/70 font-medium">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}