import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
    const navigate = useNavigate();

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-ivory flex items-center justify-center px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-8"
                >
                    <div className="relative inline-block">
                        <ShoppingBag size={120} strokeWidth={0.5} className="text-primary/10" />
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <span className="material-symbols-outlined text-primary/40 text-4xl">eco</span>
                        </motion.div>
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-3xl serif-font text-primary">Your Bag is Empty</h2>
                        <p className="text-primary/60 font-light max-w-xs mx-auto">Treat yourself with our exclusive heritage collection.</p>
                    </div>
                    <Link to="/products" className="inline-block bg-primary text-white px-10 py-4 rounded-lg font-bold uppercase tracking-widest text-xs transition-all shadow-xl hover:shadow-2xl">Shop Collection</Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="bg-[#f8f6f6] min-h-screen pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="space-y-2">
                        <h1 className="text-4xl md:text-5xl font-bold serif-font text-primary">Shopping Bag</h1>
                        <p className="text-primary/60 text-sm font-bold uppercase tracking-widest">{cart.length} Articles Selected</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        <AnimatePresence>
                            {cart.map((item) => (
                                <motion.div
                                    key={item.productId}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="bg-white rounded-2xl p-6 flex flex-col sm:flex-row gap-6 items-center shadow-sm border border-primary/5 hover:shadow-md transition-all"
                                >
                                    <div className="w-32 h-40 rounded-lg overflow-hidden bg-ivory flex-shrink-0">
                                        <img src={item.image || 'https://via.placeholder.com/150'} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-grow space-y-4 text-center sm:text-left">
                                        <div>
                                            <Link to={`/product/${item.productId}`} className="text-xl serif-font text-primary hover:text-accent-gold transition-colors">{item.name}</Link>
                                            <p className="text-primary/40 text-[10px] uppercase font-bold tracking-widest mt-1">Heritage Collection</p>
                                        </div>
                                        <div className="flex flex-wrap justify-center sm:justify-start items-center gap-6">
                                            <div className="flex items-center bg-ivory/50 border border-primary/10 rounded-lg px-2 py-1">
                                                <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="p-1 hover:text-primary transition-colors"><Minus size={14} /></button>
                                                <span className="px-4 font-bold text-sm text-primary">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="p-1 hover:text-primary transition-colors"><Plus size={14} /></button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.productId)}
                                                className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary/40 hover:text-red-600 transition-colors"
                                            >
                                                <Trash2 size={14} /> Remove Article
                                            </button>
                                        </div>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <p className="text-xl font-bold text-primary">₹{item.price * item.quantity}</p>
                                        <p className="text-[10px] text-primary/40 font-bold uppercase tracking-widest">₹{item.price} / unit</p>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl p-8 shadow-xl border border-primary/5 sticky top-28">
                            <h3 className="text-2xl serif-font text-primary mb-8 pb-4 border-b border-primary/10">Order Summary</h3>
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-sm">
                                    <span className="text-primary/60 font-medium">Subtotal</span>
                                    <span className="text-primary font-bold">₹{cartTotal}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-primary/60 font-medium">Shipping</span>
                                    <span className="text-green-600 font-bold uppercase tracking-widest text-[10px]">Complimentary</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-primary/60 font-medium">GST (Inc.)</span>
                                    <span className="text-primary font-bold">0%</span>
                                </div>
                            </div>
                            <div className="pt-6 border-t border-primary/10 mb-8">
                                <div className="flex justify-between items-end">
                                    <span className="text-primary/40 text-[10px] font-bold uppercase tracking-[0.2em]">Final Amount</span>
                                    <span className="text-3xl font-bold text-primary">₹{cartTotal}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => navigate('/checkout')}
                                className="w-full bg-primary text-white py-5 rounded-xl font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-2xl group"
                            >
                                Secure Checkout <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <p className="text-[9px] text-center mt-6 text-primary/30 uppercase tracking-widest leading-relaxed">
                                SSL SECURED PAYMENTS <br /> BASTRIKA HERITAGE PROMISE
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
