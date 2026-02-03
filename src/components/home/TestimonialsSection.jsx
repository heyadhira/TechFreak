import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

const defaultTestimonials = [
    {
        id: 1,
        client_name: "Rajesh Kumar",
        client_designation: "Founder",
        company: "TechStart India",
        content: "TechFreak delivered our e-commerce website in just 2 weeks. The quality and attention to detail exceeded our expectations. Highly recommended!",
        rating: 5,
        photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
        id: 2,
        client_name: "Priya Sharma",
        client_designation: "Marketing Director",
        company: "GrowthBox",
        content: "Professional team, excellent communication, and they delivered exactly what we envisioned. Our website traffic increased by 200% after the redesign.",
        rating: 5,
        photo_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
    },
    {
        id: 3,
        client_name: "Amit Patel",
        client_designation: "CEO",
        company: "DigitalEdge",
        content: "Best value for money! They understood our requirements perfectly and built a stunning corporate website. Great support even after delivery.",
        rating: 5,
        photo_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    }
];

export default function TestimonialsSection() {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(0);

    const { data: testimonials } = useQuery({
        queryKey: ['testimonials'],
        queryFn: () => base44.entities.Testimonial.list(),
        initialData: []
    });

    const displayTestimonials = testimonials.length > 0
        ? testimonials.filter(t => t.is_active !== false)
        : defaultTestimonials;

    useEffect(() => {
        const timer = setInterval(() => {
            setDirection(1);
            setCurrent((prev) => (prev + 1) % displayTestimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [displayTestimonials.length]);

    const navigate = (dir) => {
        setDirection(dir);
        if (dir === 1) {
            setCurrent((prev) => (prev + 1) % displayTestimonials.length);
        } else {
            setCurrent((prev) => (prev - 1 + displayTestimonials.length) % displayTestimonials.length);
        }
    };

    const variants = {
        enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0 })
    };

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-20 left-10 text-slate-100">
                <Quote className="w-32 h-32" />
            </div>
            <div className="absolute bottom-20 right-10 text-slate-100 transform rotate-180">
                <Quote className="w-32 h-32" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <SectionHeading
                    badge="Testimonials"
                    title="What Our Clients Say"
                    subtitle="Don't just take our word for it — hear from businesses who've worked with us."
                />

                <div className="max-w-4xl mx-auto">
                    <div className="relative">
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={current}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100"
                            >
                                <div className="flex flex-col md:flex-row gap-8 items-center">
                                    {/* Client photo */}
                                    <div className="flex-shrink-0">
                                        <div className="relative">
                                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
                                                <img
                                                    src={displayTestimonials[current]?.photo_url || `https://ui-avatars.com/api/?name=${displayTestimonials[current]?.client_name}&background=6366f1&color=fff&size=150`}
                                                    alt={displayTestimonials[current]?.client_name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                                                <Quote className="w-5 h-5 text-white" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 text-center md:text-left">
                                        {/* Rating */}
                                        <div className="flex justify-center md:justify-start gap-1 mb-4">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-5 h-5 ${i < (displayTestimonials[current]?.rating || 5) ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`}
                                                />
                                            ))}
                                        </div>

                                        <p className="text-lg md:text-xl text-slate-700 leading-relaxed mb-6 italic">
                                            "{displayTestimonials[current]?.content}"
                                        </p>

                                        <div>
                                            <h4 className="text-xl font-bold text-slate-900">
                                                {displayTestimonials[current]?.client_name}
                                            </h4>
                                            <p className="text-slate-600">
                                                {displayTestimonials[current]?.client_designation}
                                                {displayTestimonials[current]?.company && `, ${displayTestimonials[current]?.company}`}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation */}
                        <div className="flex justify-center gap-4 mt-8">
                            <motion.button
                                onClick={() => navigate(-1)}
                                className="p-3 rounded-full bg-white shadow-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <ChevronLeft className="w-5 h-5 text-slate-700" />
                            </motion.button>

                            <div className="flex items-center gap-2">
                                {displayTestimonials.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => {
                                            setDirection(i > current ? 1 : -1);
                                            setCurrent(i);
                                        }}
                                        className={`w-2.5 h-2.5 rounded-full transition-all ${i === current
                                                ? 'bg-indigo-600 w-8'
                                                : 'bg-slate-300 hover:bg-slate-400'
                                            }`}
                                    />
                                ))}
                            </div>

                            <motion.button
                                onClick={() => navigate(1)}
                                className="p-3 rounded-full bg-white shadow-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <ChevronRight className="w-5 h-5 text-slate-700" />
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}