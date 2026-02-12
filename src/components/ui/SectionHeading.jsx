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
                    'inline-block px-4 py-2 rounded-full text-sm font-medium mb-4 transition-colors',
                    light
                        ? 'bg-white/10 border border-white/20 text-white/90'
                        : 'bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-transparent dark:border-indigo-500/20'
                )}>
                    {badge}
                </span>
            )}
            <h2 className={cn(
                'text-3xl md:text-4xl lg:text-5xl font-bold mb-6 transition-colors',
                light ? 'text-white' : 'text-slate-900 dark:text-white'
            )}>
                {title}
            </h2>
            {subtitle && (
                <p className={cn(
                    'text-lg max-w-2xl leading-relaxed transition-colors',
                    center && 'mx-auto',
                    light ? 'text-white/70' : 'text-slate-600 dark:text-slate-400'
                )}>
                    {subtitle}
                </p>
            )}
        </motion.div>
    );
}
