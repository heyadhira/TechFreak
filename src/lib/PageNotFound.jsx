import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function PageNotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center p-4">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <motion.div
                className="text-center relative z-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.8, delay: 0.2 }}
                    className="mb-8"
                >
                    <span className="text-[150px] md:text-[200px] font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent leading-none">
                        404
                    </span>
                </motion.div>

                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Page Not Found
                </h1>

                <p className="text-white/70 mb-8 max-w-md mx-auto">
                    Oops! The page you're looking for seems to have wandered off.
                    Let's get you back on track.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                    <Link to={createPageUrl('Home')}>
                        <motion.button
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-indigo-500/30 transition-all"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Home className="w-5 h-5" />
                            Go Home
                        </motion.button>
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Go Back
                    </button>
                </div>

                <div className="mt-12 pt-8 border-t border-white/10">
                    <p className="text-white/50 text-sm mb-4">Looking for something specific?</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {['Services', 'Portfolio', 'Contact', 'About'].map((page) => (
                            <Link
                                key={page}
                                to={createPageUrl(page)}
                                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm"
                            >
                                {page}
                            </Link>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}