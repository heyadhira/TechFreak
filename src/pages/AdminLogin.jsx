import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/lib/AdminAuthContext';
import { Mail, Lock, Eye, EyeOff, LogIn, AlertCircle, ShieldCheck, Terminal, Fingerprint, Cpu, Target } from 'lucide-react';
import { createPageUrl } from '@/utils';
import NoiseTexture from '../components/ui/NoiseTexture';
import Magnetic from '../components/ui/Magnetic';
import { Input } from '@/components/ui/input';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { adminLogin } = useAdminAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const result = await adminLogin(email, password);
            if (result.success) {
                navigate(createPageUrl('AdminDashboard'));
            } else {
                setError(result.error || 'Authentication Failed');
            }
        } catch (err) {
            setError('Neural Link Interrupted');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-300 selection:bg-indigo-500/30 flex items-center justify-center p-6 sm:p-12 overflow-hidden relative">
            <NoiseTexture opacity={0.03} />

            {/* Cinematic Background Elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/5 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-purple-600/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[1px] h-screen bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-50" />
                <div className="w-screen h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-50" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-[500px] z-10"
            >
                <div className="bg-slate-900/40 backdrop-blur-3xl rounded-[4rem] border border-white/5 p-12 sm:p-16 shadow-2xl relative overflow-hidden group">
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                    {/* Header */}
                    <div className="text-center mb-12">
                        <motion.div
                            initial={{ rotateY: 180, opacity: 0 }}
                            animate={{ rotateY: 0, opacity: 1 }}
                            transition={{ duration: 1.2, delay: 0.2 }}
                            className="inline-flex items-center justify-center w-20 h-20 bg-white/5 border border-white/10 rounded-[2.5rem] mb-8 relative group"
                        >
                            <div className="absolute inset-0 bg-indigo-600/20 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <Fingerprint className="w-10 h-10 text-indigo-400 relative z-10" />
                        </motion.div>

                        <div className="flex items-center justify-center gap-2 mb-2 font-black">
                            <Terminal className="w-3 h-3 text-indigo-500" />
                            <span className="text-[10px] uppercase tracking-[0.4em] text-slate-500">Authorized Personnel Only</span>
                        </div>
                        <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic leading-none mb-4">Neural Access</h1>
                        <p className="text-xs text-slate-500 font-medium tracking-tight">Syncing binary signatures with the TechFreak core gateway.</p>
                    </div>

                    {/* Error Communication */}
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -20, height: 0 }}
                                animate={{ opacity: 1, y: 0, height: 'auto' }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="mb-8 p-6 bg-red-500/5 border border-red-500/20 rounded-3xl flex items-center gap-4 text-red-400"
                            >
                                <AlertCircle className="w-6 h-6 flex-shrink-0" />
                                <span className="text-xs font-black uppercase tracking-widest">{error}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Authentication Logic */}
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-6 flex items-center gap-2">
                                    <Cpu className="w-3 h-3" /> Identity Frequency
                                </label>
                                <div className="relative group/input">
                                    <div className="absolute inset-0 bg-slate-950/50 rounded-2xl group-hover/input:bg-slate-950/80 transition-colors border border-white/5" />
                                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within/input:text-indigo-400 transition-colors" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="admin@techfreak.in"
                                        required
                                        className="w-full h-16 bg-transparent border-none rounded-2xl pl-16 pr-6 text-white placeholder-slate-600 focus:ring-1 focus:ring-indigo-500/50 transition-all font-bold relative z-10"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-6 flex items-center gap-2">
                                    <Target className="w-3 h-3" /> Binary Hash
                                </label>
                                <div className="relative group/input">
                                    <div className="absolute inset-0 bg-slate-950/50 rounded-2xl group-hover/input:bg-slate-950/80 transition-colors border border-white/5" />
                                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within/input:text-indigo-400 transition-colors" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••••••"
                                        required
                                        className="w-full h-16 bg-transparent border-none rounded-2xl pl-16 pr-16 text-white placeholder-slate-600 focus:ring-1 focus:ring-indigo-500/50 transition-all font-bold relative z-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors z-20"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <Magnetic strength={0.2}>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-20 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-4 relative overflow-hidden group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
                                {isLoading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Authenticating Systems...
                                    </>
                                ) : (
                                    <>
                                        <ShieldCheck className="w-5 h-5" />
                                        Initiate Workspace
                                    </>
                                )}
                            </button>
                        </Magnetic>
                    </form>

                    {/* Exit Strategy */}
                    <div className="mt-12 text-center">
                        <a
                            href="/"
                            className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-indigo-400 transition-all flex items-center justify-center gap-2 group/back"
                        >
                            <span className="group-hover/back:-translate-x-2 transition-transform">←</span> Return to Public Frequency
                        </a>
                    </div>
                </div>

                {/* Tactical Footer */}
                <div className="mt-8 flex justify-between items-center px-4">
                    <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">
                        Neural Integrity Index: Optimal
                    </p>
                    <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">
                        © TECHFREAK v2.0
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
