import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/order.service';
import Loader from '../components/ui/Loader';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, ChevronRight, CreditCard, MapPin } from 'lucide-react';

const Checkout = () => {
    const { user } = useAuth();
    const { cart, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState({
        fullName: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        phone: ''
    });

    if (cart.length === 0) return <Navigate to="/cart" />;

    const handleInputChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const orderData = {
                userId: user.id,
                items: cart,
                total: cartTotal,
                address: address
            };

            const order = await createOrder(orderData);
            clearCart();
            navigate(`/orders`);
            alert(`Order placed successfully! Order ID: ${order.id}`);
        } catch (err) {
            console.error(err);
            alert('Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#f8f6f6] min-h-screen pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-12 space-y-2">
                    <h1 className="text-4xl md:text-5xl font-bold serif-font text-primary">Finalizing Acquisition</h1>
                    <div className="flex items-center gap-2 text-primary/40 text-[10px] font-bold uppercase tracking-widest">
                        <span>Cart</span> <ChevronRight size={10} /> <span>Secure Checkout</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-primary/5 space-y-10"
                        >
                            <div className="space-y-8">
                                <div className="flex items-center gap-3 pb-4 border-b border-primary/10">
                                    <MapPin size={20} className="text-accent-gold" />
                                    <h3 className="text-xl serif-font text-primary">Delivery Details</h3>
                                </div>

                                <form onSubmit={handleSubmit} id="checkout-form" className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 ml-1">Requester Full Name</label>
                                        <input
                                            name="fullName"
                                            required
                                            onChange={handleInputChange}
                                            className="w-full bg-ivory/30 border border-primary/10 rounded-xl px-6 py-4 text-sm focus:ring-1 focus:ring-primary focus:bg-white outline-none transition-all text-primary"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 ml-1">Street Address</label>
                                        <input
                                            name="street"
                                            required
                                            onChange={handleInputChange}
                                            className="w-full bg-ivory/30 border border-primary/10 rounded-xl px-6 py-4 text-sm focus:ring-1 focus:ring-primary focus:bg-white outline-none transition-all text-primary"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 ml-1">City</label>
                                            <input name="city" required onChange={handleInputChange} className="w-full bg-ivory/30 border border-primary/10 rounded-xl px-6 py-4 text-sm focus:ring-1 focus:ring-primary focus:bg-white outline-none transition-all text-primary" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 ml-1">State / Province</label>
                                            <input name="state" required onChange={handleInputChange} className="w-full bg-ivory/30 border border-primary/10 rounded-xl px-6 py-4 text-sm focus:ring-1 focus:ring-primary focus:bg-white outline-none transition-all text-primary" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 ml-1">Zip Code</label>
                                            <input name="zipCode" required onChange={handleInputChange} className="w-full bg-ivory/30 border border-primary/10 rounded-xl px-6 py-4 text-sm focus:ring-1 focus:ring-primary focus:bg-white outline-none transition-all text-primary" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60 ml-1">Contact Number</label>
                                            <input name="phone" required onChange={handleInputChange} className="w-full bg-ivory/30 border border-primary/10 rounded-xl px-6 py-4 text-sm focus:ring-1 focus:ring-primary focus:bg-white outline-none transition-all text-primary" />
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div className="space-y-6 pt-10 border-t border-primary/10">
                                <div className="flex items-center gap-3 pb-4">
                                    <CreditCard size={20} className="text-accent-gold" />
                                    <h3 className="text-xl serif-font text-primary">Payment Manifest</h3>
                                </div>
                                <div className="bg-ivory/50 border border-primary/10 p-6 rounded-2xl flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-primary shadow-sm">
                                            <Truck size={24} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm text-primary">Cash on Delivery</p>
                                            <p className="text-[10px] text-primary/40 font-bold uppercase tracking-widest">Available for Heritage Pieces</p>
                                        </div>
                                    </div>
                                    <ShieldCheck className="text-green-600" />
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="lg:col-span-5">
                        <div className="bg-primary text-white rounded-3xl p-8 md:p-10 shadow-2xl sticky top-28 space-y-10">
                            <h3 className="text-2xl serif-font mb-4 border-b border-white/10 pb-4 italic">Manifest Summary</h3>

                            <div className="space-y-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                {cart.map(item => (
                                    <div key={item.productId} className="flex justify-between items-center gap-4 group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-20 bg-white/10 rounded-lg overflow-hidden shrink-0">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold serif-font leading-tight">{item.name}</p>
                                                <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Qty: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <p className="font-bold text-accent-gold whitespace-nowrap">₹{item.price * item.quantity}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-8 border-t border-white/10 space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] uppercase tracking-widest font-bold text-white/40">Acquisition Amount</span>
                                    <span className="text-3xl font-bold">₹{cartTotal}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] uppercase tracking-widest font-bold text-white/40">Logistics</span>
                                    <span className="text-[10px] uppercase tracking-widest font-bold text-green-400">Complimentary</span>
                                </div>
                            </div>

                            <button
                                form="checkout-form"
                                type="submit"
                                disabled={loading}
                                className="w-full bg-accent-gold text-primary py-5 rounded-xl font-bold uppercase tracking-[0.2em] shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 relative"
                            >
                                {loading ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-6 h-6 border-2 border-primary/20 border-t-primary rounded-full" /> : 'Finalize Acquisition'}
                            </button>

                            <div className="flex items-center justify-center gap-4 text-white/20">
                                <ShieldCheck size={14} />
                                <span className="text-[8px] uppercase tracking-[0.3em] font-bold">Encrypted Heritage Transaction</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {loading && <Loader fullScreen />}
        </div>
    );
};

export default Checkout;
