import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

/**
 * @typedef {Object} GlassCardProps
 * @property {string} [className]
 * @property {React.ReactNode} children
 * @property {string} [glowColor]
 * @property {boolean} [hoverGlow]
 */

/** @type {React.ForwardRefExoticComponent<GlassCardProps & React.HTMLAttributes<HTMLDivElement>>} */
const GlassCard = React.forwardRef(({
    className,
    children,
    glowColor = 'rgba(99, 102, 241, 0.1)',
    hoverGlow = true,
    ...props
}, ref) => {
    return (
        <motion.div
            ref={ref}
            className={cn(
                'relative rounded-2xl border border-white/20 backdrop-blur-xl shadow-xl',
                'bg-white/10 transition-all duration-300',
                hoverGlow && 'hover:border-indigo-500/30',
                className
            )}
            style={{
                boxShadow: `0 8px 32px ${glowColor}`,
            }}
            whileHover={hoverGlow ? {
                boxShadow: `0 12px 40px ${glowColor.replace('0.1', '0.2')}`,
                y: -2
            } : undefined}
            transition={{ duration: 0.3 }}
            {...props}
        >
            {children}
        </motion.div>
    );
});

GlassCard.displayName = 'GlassCard';

export default GlassCard;

