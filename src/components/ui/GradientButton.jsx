import React from 'react';
import { cn } from '@/lib/utils';

const variants = {
    primary: 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-indigo-500/30 hover:scale-[1.02]',
    secondary: 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg hover:shadow-orange-500/30 hover:scale-[1.02]',
    outline: 'bg-transparent border-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400',
    ghost: 'bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20',
};

const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
};

const GradientButton = React.forwardRef(({
    className,
    variant = 'primary',
    size = 'md',
    children,
    ...props
}, ref) => {
    return (
        <button
            ref={ref}
            className={cn(
                'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
});

GradientButton.displayName = 'GradientButton';

export default GradientButton;
