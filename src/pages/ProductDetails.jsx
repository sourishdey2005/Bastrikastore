import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/product.service';
import { useCart } from '../context/CartContext';
import Loader from '../components/ui/Loader';
import { Minus, Plus, ShoppingBag, ArrowLeft, Heart, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductById(id);
                setProduct(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <Loader fullScreen />;

    if (!product) return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-6">
            <h2 className="text-3xl serif-font text-primary">The piece you seek is not here</h2>
            <Link to="/products" className="bg-primary text-white px-8 py-3 rounded-lg font-bold uppercase tracking-widest text-xs transition-all shadow-lg hover:shadow-xl">Explore Collection</Link>
        </div>
    );

    const isOutOfStock = product.stock <= 0;

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) addToCart(product);
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    return (
        <div className="bg-[#f8f6f6] min-h-screen pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                <Link to="/products" className="inline-flex items-center gap-2 text-primary/60 hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest mb-12">
                    <ArrowLeft size={14} /> Back to Collection
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Product Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-white shadow-xl"
                    >
                        <img
                            src={product.image_url || 'https://images.unsplash.com/photo-1583316174775-bd6dc0e9f298?q=80&w=1200&auto=format&fit=crop'}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                        {isOutOfStock && (
                            <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] flex items-center justify-center">
                                <span className="bg-primary text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm shadow-2xl">Currently Unavailable</span>
                            </div>
                        )}
                    </motion.div>

                    {/* Product Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col justify-center space-y-8"
                    >
                        <div className="space-y-4">
                            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent-gold block">{product.category}</span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold serif-font text-primary leading-tight">{product.name}</h1>
                            <div className="flex items-center gap-4 py-2 border-b border-primary/10">
                                <p className="text-3xl font-bold text-primary">₹{product.price}</p>
                                {!isOutOfStock && <span className="text-[10px] text-primary/40 font-bold uppercase tracking-widest">{product.stock} in stock</span>}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-xs uppercase tracking-widest font-bold text-primary/80">Description</h4>
                            <p className="text-primary/70 leading-relaxed font-light text-lg">
                                {product.description || 'Our traditional garments are crafted with the highest quality materials and centuries-old techniques. Each piece is a masterpiece of Bengali craftsmanship, reimagined for the modern connoisseur.'}
                            </p>
                        </div>

                        {!isOutOfStock && (
                            <div className="space-y-10 pt-4">
                                <div className="flex items-center gap-8">
                                    <div className="flex flex-col gap-2">
                                        <span className="text-[10px] uppercase tracking-widest font-bold text-primary/40">Quantity</span>
                                        <div className="flex items-center bg-white border border-primary/10 rounded-xl overflow-hidden shadow-sm">
                                            <button
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                className="px-4 py-3 hover:bg-primary/5 transition-colors text-primary"
                                            >
                                                <Minus size={18} />
                                            </button>
                                            <span className="px-6 font-bold text-primary">{quantity}</span>
                                            <button
                                                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                                className="px-4 py-3 hover:bg-primary/5 transition-colors text-primary"
                                            >
                                                <Plus size={18} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 self-end pb-1">
                                        <button className="w-12 h-12 rounded-xl bg-white border border-primary/10 flex items-center justify-center text-primary hover:bg-primary/5 transition-all shadow-sm">
                                            <Heart size={20} />
                                        </button>
                                        <button className="w-12 h-12 rounded-xl bg-white border border-primary/10 flex items-center justify-center text-primary hover:bg-primary/5 transition-all shadow-sm">
                                            <Share2 size={20} />
                                        </button>
                                    </div>
                                </div>

                                <button
                                    className={`relative w-full py-5 rounded-xl font-bold uppercase tracking-[0.2em] transition-all overflow-hidden flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl ${addedToCart ? 'bg-green-600 text-white' : 'bg-primary text-white'}`}
                                    onClick={handleAddToCart}
                                >
                                    <AnimatePresence mode="wait">
                                        {addedToCart ? (
                                            <motion.span
                                                key="added"
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                className="flex items-center gap-2"
                                            >
                                                Added to Bag
                                            </motion.span>
                                        ) : (
                                            <motion.span
                                                key="add"
                                                initial={{ y: -20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                className="flex items-center gap-3"
                                            >
                                                <ShoppingBag size={20} /> Add to Bag
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </button>
                            </div>
                        )}

                        {isOutOfStock && (
                            <button disabled className="w-full py-5 rounded-xl bg-primary/20 text-primary/40 font-bold uppercase tracking-[0.2em] border border-primary/10 transition-all cursor-not-allowed">
                                Piece Unavailable
                            </button>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
