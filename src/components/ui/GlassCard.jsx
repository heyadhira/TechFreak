import React from 'react';
import { cn } from '@/lib/utils';

const GlassCard = React.forwardRef(({ className, children, glowColor = 'rgba(99, 102, 241, 0.1)', ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                'relative rounded-2xl border border-white/20 backdrop-blur-xl shadow-xl',
                'bg-white/10 hover:bg-white/20 transition-all duration-300',
                className
            )}
            style={{
                boxShadow: `0 8px 32px ${glowColor}`,
            }}
            {...props}
        >
            {children}
        </div>
    );
});

GlassCard.displayName = 'GlassCard';

export default GlassCard;
