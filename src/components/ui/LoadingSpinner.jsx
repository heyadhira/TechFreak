import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

/**
 * A professional loading spinner component with multiple variants
 */
export default function LoadingSpinner({
    size = 'md',
    variant = 'default',
    className,
    text
}) {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
        xl: 'w-16 h-16'
    };

    const textSizes = {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
        xl: 'text-lg'
    };

    if (variant === 'fullscreen') {
        return (
            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
                <div className="relative">
                    <div className={cn(
                        'animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600',
                        sizeClasses.lg
                    )} />
                    <div className="absolute inset-0 animate-ping rounded-full border-4 border-indigo-400 opacity-20" />
                </div>
                {text && (
                    <p className={cn('mt-4 text-slate-600 font-medium', textSizes.lg)}>
                        {text}
                    </p>
                )}
            </div>
        );
    }

    if (variant === 'branded') {
        return (
            <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
                <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 animate-pulse">
                        <span className="text-white font-bold text-xl">T</span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full animate-bounce" />
                </div>
                {text && (
                    <p className={cn('text-slate-600 font-medium', textSizes[size])}>
                        {text}
                    </p>
                )}
            </div>
        );
    }

    // Default spinner using Lucide icon
    return (
        <div className={cn('flex items-center justify-center gap-2', className)}>
            <Loader2 className={cn('animate-spin text-indigo-600', sizeClasses[size])} />
            {text && (
                <span className={cn('text-slate-600', textSizes[size])}>
                    {text}
                </span>
            )}
        </div>
    );
}

/**
 * Skeleton loader for content placeholders
 */
export function Skeleton({ className, ...props }) {
    return (
        <div
            className={cn(
                'animate-pulse rounded-lg bg-slate-200',
                className
            )}
            {...props}
        />
    );
}

/**
 * Card skeleton for loading states
 */
export function CardSkeleton({ className }) {
    return (
        <div className={cn('p-6 bg-white rounded-2xl border border-slate-100', className)}>
            <Skeleton className="h-40 w-full mb-4" />
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-4" />
            <div className="flex gap-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
            </div>
        </div>
    );
}
