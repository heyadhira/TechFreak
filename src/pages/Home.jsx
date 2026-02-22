import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import HeroSection from '../components/home/HeroSection';
import ServicesSection from '../components/home/ServicesSection';
import StatsSection from '../components/home/StatsSection';
import PortfolioSection from '../components/home/PortfolioSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import PricingSection from '../components/home/PricingSection';
import CTASection from '../components/home/CTASection';
import NoiseTexture from '../components/ui/NoiseTexture';

export default function Home() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    return (
        <main className="relative bg-slate-950 selection:bg-indigo-500/30 overflow-hidden">
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 z-[100] origin-left"
                style={{ scaleX }}
            />
            <NoiseTexture />

            <HeroSection />
            <ServicesSection />
            <StatsSection />
            <PortfolioSection />
            <TestimonialsSection />
            <PricingSection />
            <CTASection />
        </main>
    );
}