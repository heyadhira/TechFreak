import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ServicesSection from '../components/home/ServicesSection';
import StatsSection from '../components/home/StatsSection';
import PortfolioSection from '../components/home/PortfolioSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import PricingSection from '../components/home/PricingSection';
import CTASection from '../components/home/CTASection';

export default function Home() {
    return (
        <main className="overflow-hidden">
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