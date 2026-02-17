import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { ShoppingBag, User, Menu, X, LogOut, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { user, logout } = useAuth();
    const { cartCount } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
        setIsMenuOpen(false);
    };

    return (
        <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${scrolled ? 'glass h-16 shadow-none' : 'bg-transparent h-24'}`}>
            <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="-ml-1"
                >
                    <Link to="/" className="flex items-center gap-3 group">
                        <span className="material-symbols-outlined text-primary text-4xl transition-transform duration-700 group-hover:rotate-[360deg] group-hover:scale-110">auto_awesome</span>
                        <h1 className="text-3xl font-black tracking-tighter text-primary serif-font -ml-4 relative -top-[1px]">Bastrika</h1>
                    </Link>
                </motion.div>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
                    {[
                        { name: "What's New", path: "/whats-new" },
                        { name: "High Jewellery", path: "/collections/high-jewellery" },
                        { name: "Fine Jewellery", path: "/collections/fine-jewellery" },
                        { name: "Womenswear", path: "/collections/womenswear" },
                        { name: "Menswear", path: "/collections/menswear" },
                        { name: "Weddings", path: "/collections/weddings" },
                        { name: "Accessories", path: "/collections/accessories" },
                        { name: "World of Bastrika", path: "/world-of-bastrika" }
                    ].map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className="text-[11px] font-black hover:text-primary transition-colors uppercase tracking-[0.25em] text-[#171212] relative group/link"
                        >
                            {item.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent-gold transition-all duration-500 group-hover/link:w-full"></span>
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-4 md:gap-6">
                    <div className="hidden md:flex items-center bg-primary/5 rounded-full px-4 py-1.5 border border-primary/10 transition-all focus-within:ring-1 focus-within:ring-primary/20">
                        <Search size={18} className="text-primary/60" />
                        <input
                            className="bg-transparent border-none focus:ring-0 text-sm w-24 xl:w-40 placeholder:text-primary/40 ml-2 font-medium"
                            placeholder="Search..."
                            type="text"
                        />
                    </div>

                    <Link to="/cart" className="text-primary hover:bg-primary/5 p-2 rounded-full transition-all relative">
                        <ShoppingBag size={22} className="stroke-[2.5px]" />
                        {cartCount > 0 && (
                            <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute top-1 right-1 bg-accent-gold text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-black shadow-lg"
                            >
                                {cartCount}
                            </motion.span>
                        )}
                    </Link>

                    {user ? (
                        <div className="hidden md:flex items-center gap-3 border-l border-primary/10 pl-4">
                            <span className="text-[11px] font-black uppercase tracking-widest text-primary/80">{user.email.split('@')[0]}</span>
                            <button onClick={handleLogout} className="text-primary hover:bg-primary/5 p-2 rounded-full transition-all">
                                <LogOut size={20} className="stroke-[2.5px]" />
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="text-primary hover:bg-primary/5 p-2 rounded-full transition-all">
                            <User size={22} className="stroke-[2.5px]" />
                        </Link>
                    )}

                    <button
                        className="lg:hidden text-primary p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={28} className="stroke-[2.5px]" /> : <Menu size={28} className="stroke-[2.5px]" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 top-0 left-0 w-full h-screen bg-white z-[60] py-24 px-8 flex flex-col gap-8 overflow-y-auto"
                    >
                        <button
                            className="absolute top-8 right-8 text-primary p-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <X size={32} className="stroke-[2.5px]" />
                        </button>

                        <div className="space-y-6">
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/30 block mb-10">Navigation</span>
                            {[
                                { name: "Home", path: "/" },
                                { name: "What's New", path: "/whats-new" },
                                { name: "High Jewellery", path: "/collections/high-jewellery" },
                                { name: "Fine Jewellery", path: "/collections/fine-jewellery" },
                                { name: "Womenswear", path: "/collections/womenswear" },
                                { name: "Menswear", path: "/collections/menswear" },
                                { name: "Weddings", path: "/collections/weddings" },
                                { name: "Accessories", path: "/collections/accessories" },
                                { name: "World of Bastrika", path: "/world-of-bastrika" }
                            ].map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="text-2xl font-black uppercase tracking-[0.2em] text-primary block py-2 border-b border-primary/5 hover:italic transition-all"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        <div className="mt-auto space-y-6 pt-10 border-t border-primary/10">
                            {user ? (
                                <button onClick={handleLogout} className="text-lg font-black uppercase tracking-widest text-primary hover:italic">Logout</button>
                            ) : (
                                <Link to="/login" className="text-lg font-black uppercase tracking-widest text-primary hover:italic" onClick={() => setIsMenuOpen(false)}>Account Login</Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
