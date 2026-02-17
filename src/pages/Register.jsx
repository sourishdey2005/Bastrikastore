import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            return setError('The keys you provided do not match.');
        }

        setLoading(true);

        try {
            const { error } = await signup(email, password);
            if (error) throw error;
            setSuccess(true);
            setTimeout(() => navigate('/login'), 3000);
        } catch (err) {
            setError(err.message || 'We could not create your account at this time.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-ivory flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 p-20 opacity-5 pointer-events-none transform -translate-x-20 -translate-y-20">
                <span className="material-symbols-outlined text-[400px]">eco</span>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-lg"
            >
                <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 md:p-14 border border-primary/5 relative z-10">
                    <div className="text-center space-y-3 mb-12">
                        <Link to="/" className="inline-block mb-4">
                            <span className="material-symbols-outlined text-primary text-5xl">auto_awesome</span>
                        </Link>
                        <h2 className="text-3xl serif-font text-primary">Join the House</h2>
                        <p className="text-primary/40 text-[10px] font-bold uppercase tracking-[0.3em]">Begin Your Heritage Journey</p>
                    </div>

                    <AnimatePresence mode="wait">
                        {success ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center py-10 space-y-6"
                            >
                                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-50 text-green-600">
                                    <CheckCircle2 size={40} />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl serif-font text-primary">Welcome to Bastrika</h3>
                                    <p className="text-sm text-primary/60 italic px-10">Your digital identifier has been created. Please confirm your email to access the collection.</p>
                                </div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-primary/30">Redirecting to Vault Access...</p>
                            </motion.div>
                        ) : (
                            <motion.form
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >
                                {error && (
                                    <div className="mb-6 bg-red-50 border border-red-100 p-4 rounded-xl flex items-start gap-3">
                                        <AlertCircle className="text-red-500 shrink-0" size={18} />
                                        <p className="text-xs text-red-700 leading-relaxed italic">{error}</p>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 ml-1">Digital Identifier (Email)</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-primary transition-colors" size={18} />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="priya@heritage.com"
                                            className="w-full bg-ivory/30 border border-primary/10 rounded-xl px-12 py-4 text-sm focus:ring-1 focus:ring-primary focus:bg-white outline-none transition-all text-primary"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 ml-1">Key Phrase</label>
                                        <div className="relative group">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-primary transition-colors" size={18} />
                                            <input
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="••••••••"
                                                className="w-full bg-ivory/30 border border-primary/10 rounded-xl px-12 py-4 text-sm focus:ring-1 focus:ring-primary focus:bg-white outline-none transition-all text-primary"
                                                required
                                                minLength="6"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 ml-1">Confirm Key</label>
                                        <div className="relative group">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-primary transition-colors" size={18} />
                                            <input
                                                type="password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                placeholder="••••••••"
                                                className="w-full bg-ivory/30 border border-primary/10 rounded-xl px-12 py-4 text-sm focus:ring-1 focus:ring-primary focus:bg-white outline-none transition-all text-primary"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-primary text-white py-5 rounded-xl font-bold uppercase tracking-[0.2em] shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 relative overflow-hidden group mt-4"
                                >
                                    {loading ? (
                                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full" />
                                    ) : (
                                        <>Request Entry <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
                                    )}
                                </button>
                            </motion.form>
                        )}
                    </AnimatePresence>

                    {!success && (
                        <div className="mt-12 text-center">
                            <p className="text-primary/40 text-[10px] font-bold uppercase tracking-widest">
                                Already a member? <Link to="/login" className="text-accent-gold hover:text-primary transition-colors border-b border-accent-gold pb-0.5 ml-1">Return to Vault</Link>
                            </p>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
