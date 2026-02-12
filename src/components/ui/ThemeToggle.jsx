import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/lib/ThemeContext';
import { cn } from '@/lib/utils';

export default function ThemeToggle({ className = '', variant = 'default' }) {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    if (variant === 'icon') {
        return (
            <motion.button
                onClick={toggleTheme}
                className={cn(
                    'relative p-2 rounded-xl transition-colors',
                    'hover:bg-slate-100 dark:hover:bg-slate-800',
                    className
                )}
                whileTap={{ scale: 0.9 }}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
                <motion.div
                    initial={false}
                    animate={{ rotate: isDark ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {isDark ? (
                        <Moon className="w-5 h-5 text-indigo-400" />
                    ) : (
                        <Sun className="w-5 h-5 text-amber-500" />
                    )}
                </motion.div>
            </motion.button>
        );
    }

    // Default toggle switch variant
    return (
        <motion.button
            onClick={toggleTheme}
            className={cn(
                'relative w-14 h-7 rounded-full p-1 transition-colors duration-300',
                isDark
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600'
                    : 'bg-gradient-to-r from-amber-400 to-orange-400',
                className
            )}
            whileTap={{ scale: 0.95 }}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            <motion.div
                className="w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center"
                animate={{ x: isDark ? 28 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
                {isDark ? (
                    <Moon className="w-3 h-3 text-indigo-600" />
                ) : (
                    <Sun className="w-3 h-3 text-amber-500" />
                )}
            </motion.div>
        </motion.button>
    );
}
