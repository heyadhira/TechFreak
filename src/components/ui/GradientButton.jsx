import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const variants = {
    primary: 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-indigo-500/30 hover:scale-[1.02] active:scale-[0.98]',
    secondary: 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg hover:shadow-orange-500/30 hover:scale-[1.02] active:scale-[0.98]',
    outline: 'bg-transparent border-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 active:bg-slate-100',
    ghost: 'bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 active:bg-white/30',
};

const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
};

/**
 * @typedef {Object} GradientButtonProps
 * @property {string} [className]
 * @property {'primary' | 'secondary' | 'outline' | 'ghost'} [variant]
 * @property {'sm' | 'md' | 'lg'} [size]
 * @property {React.ReactNode} children
 * @property {boolean} [isLoading]
 * @property {boolean} [disabled]
 */

/** @type {React.ForwardRefExoticComponent<GradientButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>>} */
const GradientButton = React.forwardRef(({
    className,
    variant = 'primary',
    size = 'md',
    children,
    isLoading = false,
    disabled,
    ...props
}, ref) => {
    const isDisabled = disabled || isLoading;

    return (
        <button
            ref={ref}
            disabled={isDisabled}
            className={cn(
                'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2',
                variants[variant],
                sizes[size],
                isDisabled && 'opacity-60 cursor-not-allowed hover:scale-100',
                className
            )}
            {...props}
        >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {children}
        </button>
    );
});

GradientButton.displayName = 'GradientButton';

export default GradientButton;

