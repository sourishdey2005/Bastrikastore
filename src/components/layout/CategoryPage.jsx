import React, { useState, useEffect } from 'react';
import { getProducts } from '../../services/product.service';
import ProductCard from '../product/ProductCard';
import Loader from '../ui/Loader';
import { motion, AnimatePresence } from 'framer-motion';

const CategoryPage = ({ category, title, description, bannerImage }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const data = await getProducts(category, 'created_at', 'desc');
                setProducts(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [category]);

    return (
        <div className="bg-[#f8f6f6] min-h-screen">
            {/* Elegant Header */}
            <section className="relative h-[70vh] overflow-hidden bg-black flex items-center justify-center text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 1.25 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 bg-cover bg-center opacity-60"
                    style={{ backgroundImage: `url(${bannerImage})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20"></div>

                <div className="relative z-10 px-6 max-w-4xl space-y-8">
                    <motion.span
                        initial={{ opacity: 0, letterSpacing: '0.8em', y: 30 }}
                        animate={{ opacity: 1, letterSpacing: '0.5em', y: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="text-white/80 uppercase tracking-[0.5em] text-[10px] font-bold block"
                    >
                        Heritage Collection
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 40, skewY: 2 }}
                        animate={{ opacity: 1, y: 0, skewY: 0 }}
                        transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="text-6xl md:text-8xl serif-font text-white italic font-light leading-tight"
                    >
                        {title}
                    </motion.h1>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1.5, delay: 0.8 }}
                        className="w-24 h-px bg-accent-gold mx-auto"
                    ></motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.6 }}
                        className="text-white/70 text-xl serif-font max-w-2xl mx-auto leading-relaxed italic"
                    >
                        {description}
                    </motion.p>
                </div>
            </section>

            {/* Product Grid */}
            <div className="max-w-7xl mx-auto px-6 py-24">
                {loading ? (
                    <div className="flex justify-center py-40"><Loader /></div>
                ) : (
                    <AnimatePresence mode="wait">
                        {products.length === 0 ? (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-40 space-y-4"
                            >
                                <h3 className="text-xl serif-font text-primary/60 italic">The collection is currently being curated...</h3>
                                <p className="text-primary/40 text-xs uppercase tracking-widest">Check back soon for new additions</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="grid"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16"
                            >
                                {products.map((product, idx) => (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                    >
                                        <ProductCard product={product} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
};

export default CategoryPage;
