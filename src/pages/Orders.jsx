import React, { useState, useEffect } from 'react';
import { getMyOrders } from '../services/order.service';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/ui/Loader';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Calendar, Tag, ChevronRight, ExternalLink } from 'lucide-react';

const Orders = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getMyOrders(user.id);
                setOrders(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [user.id]);

    if (loading) return <Loader fullScreen />;

    return (
        <div className="bg-[#f8f6f6] min-h-screen pt-32 pb-20">
            <div className="max-w-5xl mx-auto px-6">
                <div className="mb-12 space-y-2">
                    <h1 className="text-4xl md:text-5xl font-bold serif-font text-primary">Your Acquisitions</h1>
                    <p className="text-primary/40 text-[10px] font-bold uppercase tracking-widest">Chronicle of your heritage journey</p>
                </div>

                {orders.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-white rounded-3xl p-16 text-center border border-primary/5 shadow-sm space-y-6"
                    >
                        <Package size={60} strokeWidth={0.5} className="mx-auto text-primary/20" />
                        <div className="space-y-2">
                            <h3 className="text-xl serif-font text-primary">No acquisitions found</h3>
                            <p className="text-sm text-primary/40 italic">You haven't added any pieces to your heritage archive yet.</p>
                        </div>
                        <a href="/products" className="text-xs font-bold uppercase tracking-widest text-primary border-b border-primary pb-1">Begin Collection</a>
                    </motion.div>
                ) : (
                    <div className="space-y-8">
                        {orders.map((order, idx) => (
                            <motion.div
                                key={order.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white rounded-3xl shadow-sm border border-primary/5 overflow-hidden border-l-4 border-l-accent-gold"
                            >
                                <div className="p-8 md:p-10">
                                    <div className="flex flex-wrap items-center justify-between gap-6 mb-8 pb-6 border-b border-primary/5">
                                        <div className="flex items-center gap-6">
                                            <div>
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-primary/40 mb-1">Manifest ID</p>
                                                <p className="text-sm font-bold text-primary font-mono select-all">#{order.id.slice(0, 8)}</p>
                                            </div>
                                            <div className="h-8 w-px bg-primary/10"></div>
                                            <div>
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-primary/40 mb-1">Acquisition Date</p>
                                                <p className="text-sm font-bold text-primary italic">{new Date(order.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-primary/40 mb-1">Total Valuation</p>
                                                <p className="text-xl font-bold text-primary">₹{order.total}</p>
                                            </div>
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${order.status === 'pending' ? 'bg-yellow-50 text-yellow-600 border-yellow-100' :
                                                    order.status === 'delivered' ? 'bg-green-50 text-green-600 border-green-100' :
                                                        'bg-primary/5 text-primary border-primary/10'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {order.items.map((item, idxx) => (
                                            <div key={idxx} className="flex items-center gap-4 group">
                                                <div className="w-14 h-18 bg-ivory rounded-lg overflow-hidden shrink-0">
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-sm font-bold serif-font text-primary truncate leading-tight">{item.name}</p>
                                                    <p className="text-[10px] text-primary/40 font-bold uppercase tracking-widest">Qty: {item.quantity}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-primary/5 flex justify-end">
                                        <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent-gold hover:text-primary transition-colors">
                                            View Full Manifest <ExternalLink size={14} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
