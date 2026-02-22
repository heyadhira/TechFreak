import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function FloatingIcon({
    icon: Icon,
    className,
    delay = 0,
    size = 'default',
    ...props
}) {
    const sizeClasses = {
        sm: 'w-8 h-8 p-1.5',
        default: 'w-12 h-12 p-2.5',
        lg: 'w-16 h-16 p-3',
    };

    return (
        <motion.div
            className={cn(
                'absolute hidden md:flex items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl',
                sizeClasses[size],
                className
            )}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                opacity: 1,
                scale: 1,
                y: [0, -10, 0],
            }}
            transition={{
                opacity: { delay, duration: 0.5 },
                scale: { delay, duration: 0.5 },
                y: {
                    delay: delay + 0.5,
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }
            }}
            {...props}
        >
            <Icon className="w-full h-full" />
        </motion.div>
    );
}
