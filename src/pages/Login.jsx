import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Lock, ArrowRight, AlertCircle } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { error } = await login(email, password);
            if (error) throw error;
            navigate('/');
        } catch (err) {
            setError(err.message || 'The credentials provided do not match our records.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-ivory flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none transform translate-x-20 -translate-y-20">
                <span className="material-symbols-outlined text-[400px]">eco</span>
            </div>
            <div className="absolute bottom-0 left-0 p-20 opacity-5 pointer-events-none transform -translate-x-20 translate-y-20">
                <span className="material-symbols-outlined text-[400px]">auto_awesome</span>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="bg-white rounded-3xl shadow-2xl p-10 md:p-12 border border-primary/5 relative z-10">
                    <div className="text-center space-y-3 mb-12">
                        <Link to="/" className="inline-block mb-4">
                            <span className="material-symbols-outlined text-primary text-5xl">auto_awesome</span>
                        </Link>
                        <h2 className="text-3xl serif-font text-primary">Welcome Home</h2>
                        <p className="text-primary/40 text-[10px] font-bold uppercase tracking-[0.3em]">Access the Bastrika Vault</p>
                    </div>

                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mb-8 bg-red-50 border border-red-100 p-4 rounded-xl flex items-start gap-3"
                            >
                                <AlertCircle className="text-red-500 shrink-0" size={18} />
                                <p className="text-xs text-red-700 leading-relaxed italic">{error}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 ml-1">Email Identifier</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-primary transition-colors" size={18} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="e.g. rahul@heritage.com"
                                    className="w-full bg-ivory/30 border border-primary/10 rounded-xl px-12 py-4 text-sm focus:ring-1 focus:ring-primary focus:bg-white outline-none transition-all text-primary"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Key Phrase</label>
                                <a href="#" className="text-[9px] font-bold uppercase tracking-widest text-accent-gold hover:text-primary transition-colors">Forgot Key?</a>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-primary transition-colors" size={18} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-ivory/30 border border-primary/10 rounded-xl px-12 py-4 text-sm focus:ring-1 focus:ring-primary focus:bg-white outline-none transition-all text-primary"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary text-white py-5 rounded-xl font-bold uppercase tracking-[0.2em] shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 relative overflow-hidden group"
                        >
                            {loading ? (
                                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full" />
                            ) : (
                                <>Enter Vault <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
                            )}
                        </button>
                    </form>

                    <div className="mt-12 text-center">
                        <p className="text-primary/40 text-[10px] font-bold uppercase tracking-widest">
                            New to our house? <Link to="/register" className="text-accent-gold hover:text-primary transition-colors border-b border-accent-gold pb-0.5 ml-1">Begin Your Journey</Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
