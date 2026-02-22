import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { localClient } from '@/api/localClient';
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import Magnetic from '../ui/Magnetic';

const defaultTestimonials = [
    {
        id: 1,
        client_name: "Rajesh Kumar",
        client_designation: "Chief Architect",
        company: "Quantum Nodes India",
        content: "TechFreak re-engineered our entire digital presence within an impossible timeline. Their attention to architectural detail is unparalleled in the industry.",
        rating: 5,
        photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
    },
    {
        id: 2,
        client_name: "Priya Sharma",
        client_designation: "Strategic Director",
        company: "Vanguard Ops",
        content: "Moving to cinematic design was the best decision we made. Our conversion logic saw a 200% shift post-deployment. True engineering mastery.",
        rating: 5,
        photo_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face"
    }
];

function TestimonialCard({ testimonial, direction }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-0.5, 0.5], [5, -5]);
    const rotateY = useTransform(x, [-0.5, 0.5], [-5, 5]);
    const springX = useSpring(rotateX, { stiffness: 100, damping: 20 });
    const springY = useSpring(rotateY, { stiffness: 100, damping: 20 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const variants = {
        enter: (dir) => ({ x: dir > 0 ? 500 : -500, opacity: 0, scale: 0.9, filter: "blur(10px)" }),
        center: { x: 0, opacity: 1, scale: 1, filter: "blur(0px)" },
        exit: (dir) => ({ x: dir > 0 ? -500 : 500, opacity: 0, scale: 0.9, filter: "blur(10px)" })
    };

    return (
        <motion.div
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            style={{
                rotateX: springX,
                rotateY: springY,
                transformStyle: "preserve-3d",
                perspective: 1200
            }}
            className="w-full"
        >
            <div className="relative bg-slate-900/60 backdrop-blur-3xl border border-white/5 rounded-[4rem] p-12 md:p-20 shadow-2xl overflow-hidden group">
                {/* Glow Background */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="flex flex-col md:flex-row gap-16 items-center" style={{ transform: "translateZ(50px)" }}>
                    {/* Client photo - Cinematic */}
                    <div className="flex-shrink-0 relative">
                        <div className="w-40 h-40 md:w-56 md:h-56 rounded-[3rem] overflow-hidden border-2 border-white/10 shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-700">
                            <img
                                src={testimonial?.photo_url || `https://ui-avatars.com/api/?name=${testimonial?.client_name}&background=6366f1&color=fff&size=300`}
                                alt={testimonial?.client_name}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                        <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl">
                            <Quote className="w-8 h-8 text-white" />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center md:text-left">
                        <div className="flex justify-center md:justify-start gap-1 mb-10">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-6 h-6 ${i < (testimonial?.rating || 5) ? 'text-amber-400 fill-amber-400' : 'text-slate-800'}`}
                                />
                            ))}
                        </div>

                        <p className="text-2xl md:text-4xl text-white leading-tight font-black tracking-tighter mb-10 italic">
                            "{testimonial?.content}"
                        </p>

                        <div className="pt-10 border-t border-white/5">
                            <h4 className="text-2xl font-black text-white uppercase tracking-widest">
                                {testimonial?.client_name}
                            </h4>
                            <p className="text-indigo-400 font-bold text-xs uppercase tracking-[0.3em] mt-2">
                                {testimonial?.client_designation} @ {testimonial?.company}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function TestimonialsSection() {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(0);

    const { data: testimonials } = useQuery({
        queryKey: ['testimonials'],
        queryFn: () => localClient.get('/testimonials'),
        initialData: []
    });

    const displayTestimonials = testimonials && testimonials.length > 0
        ? testimonials.filter(t => t.is_active !== false)
        : defaultTestimonials;

    const navigate = (dir) => {
        setDirection(dir);
        if (dir === 1) {
            setCurrent((prev) => (prev + 1) % displayTestimonials.length);
        } else {
            setCurrent((prev) => (prev - 1 + displayTestimonials.length) % displayTestimonials.length);
        }
    };

    return (
        <section className="py-32 bg-slate-950 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <SectionHeading
                    badge="The Impact Record"
                    title="Voices of Transformation"
                    subtitle="How our engineering architectures are reshaping the digital landscape for visionaries."
                    className="mb-24"
                />

                <div className="max-w-7xl mx-auto relative px-4">
                    <div className="min-h-[600px] flex items-center justify-center relative overflow-visible">
                        <AnimatePresence mode="wait" custom={direction}>
                            <TestimonialCard
                                key={current}
                                testimonial={displayTestimonials[current]}
                                direction={direction}
                            />
                        </AnimatePresence>
                    </div>

                    {/* Navigation - Cinematic Controls */}
                    <div className="flex justify-center items-center gap-12 mt-16 scale-110">
                        <Magnetic strength={0.2}>
                            <button
                                onClick={() => navigate(-1)}
                                className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all text-white group"
                            >
                                <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                            </button>
                        </Magnetic>

                        <div className="flex items-center gap-4">
                            {displayTestimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        setDirection(i > current ? 1 : -1);
                                        setCurrent(i);
                                    }}
                                    className={`h-1.5 rounded-full transition-all duration-500 ${i === current
                                        ? 'bg-indigo-600 w-12 shadow-[0_0_10px_rgba(99,102,241,0.5)]'
                                        : 'bg-white/10 w-3 hover:bg-white/20'
                                        }`}
                                />
                            ))}
                        </div>

                        <Magnetic strength={0.2}>
                            <button
                                onClick={() => navigate(1)}
                                className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all text-white group"
                            >
                                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Magnetic>
                    </div>
                </div>
            </div>
        </section>
    );
}