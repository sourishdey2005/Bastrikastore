import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
    const isOutOfStock = product.stock <= 0;

    return (
        <motion.div
            whileHover={{ y: -8 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
            <Link to={`/product/${product.id}`} className="group cursor-pointer block relative">
                <div className="relative aspect-[3/4] overflow-hidden bg-ivory/30 rounded-sm group-hover:shadow-[0_20px_50px_-20px_rgba(108,30,30,0.2)] transition-all duration-700">
                    <motion.img
                        initial={{ scale: 1.1 }}
                        whileHover={{ scale: 1 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full h-full object-cover transition-opacity duration-700 group-hover:opacity-90"
                        src={product.image_url || 'https://images.unsplash.com/photo-1583316174775-bd6dc0e9f298?q=80&w=1000&auto=format&fit=crop'}
                        alt={product.name}
                    />

                    {/* Hover Overlay with Gradient Depth */}
                    <div className="absolute inset-0 grad-maroon-gold opacity-0 group-hover:opacity-10 transition-opacity duration-700"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                    <div className="absolute inset-x-4 bottom-6 overflow-hidden">
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            whileHover={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="glass py-3 text-primary font-bold text-[10px] uppercase tracking-[0.3em] text-center shadow-2xl"
                        >
                            Explore Detail
                        </motion.div>
                    </div>

                    {isOutOfStock && (
                        <span className="absolute top-4 left-4 glass px-3 py-1.5 text-primary text-[9px] font-bold uppercase tracking-widest border border-primary/10">
                            Closed Atelier
                        </span>
                    )}
                    {product.is_new && !isOutOfStock && (
                        <span className="absolute top-4 left-4 grad-maroon-gold text-white text-[9px] px-3 py-1.5 font-bold uppercase tracking-widest shadow-lg">
                            New In
                        </span>
                    )}
                </div>

                <div className="pt-8 pb-4 space-y-3 text-center">
                    <h5 className="serif-font text-xl text-primary leading-snug group-hover:italic transition-all duration-500">{product.name}</h5>
                    <div className="flex flex-col items-center gap-3">
                        <p className="text-primary/40 text-[9px] uppercase tracking-[0.5em] font-bold">{product.category}</p>
                        <div className="w-8 h-[1px] bg-accent-gold/20 group-hover:w-20 group-hover:bg-accent-gold transition-all duration-700"></div>
                        <p className="font-bold text-primary tracking-[0.2em] text-sm">₹{(product.price || 0).toLocaleString('en-IN')}</p>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default ProductCard;
