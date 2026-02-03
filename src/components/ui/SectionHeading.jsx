import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function SectionHeading({
    badge,
    title,
    subtitle,
    className,
    light = false,
    center = true
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={cn(
                'mb-12 md:mb-16',
                center && 'text-center',
                className
            )}
        >
            {badge && (
                <span className={cn(
                    'inline-block px-4 py-2 rounded-full text-sm font-medium mb-4',
                    light
                        ? 'bg-white/10 border border-white/20 text-white/90'
                        : 'bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700'
                )}>
                    {badge}
                </span>
            )}
            <h2 className={cn(
                'text-3xl md:text-4xl lg:text-5xl font-bold mb-4',
                light ? 'text-white' : 'text-slate-900'
            )}>
                {title}
            </h2>
            {subtitle && (
                <p className={cn(
                    'text-lg max-w-2xl leading-relaxed',
                    center && 'mx-auto',
                    light ? 'text-white/70' : 'text-slate-600'
                )}>
                    {subtitle}
                </p>
            )}
        </motion.div>
    );
}
