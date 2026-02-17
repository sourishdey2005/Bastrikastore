import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts, getCategories } from '../services/product.service';
import ProductCard from '../components/product/ProductCard';
import Loader from '../components/ui/Loader';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ChevronDown } from 'lucide-react';

const ProductListing = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const category = searchParams.get('category') || '';
    const sortBy = searchParams.get('sortBy') || 'price';
    const order = searchParams.get('order') || 'asc';

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const cats = await getCategories();
                setCategories(cats);
            } catch (err) {
                console.error('Error fetching categories:', err);
            }
        };
        fetchInitialData();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const data = await getProducts(category || null, sortBy, order);
                setProducts(data);
                setError(null);
            } catch (err) {
                setError('Failed to load products. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [category, sortBy, order]);

    const handleFilterChange = (cat) => {
        const params = new URLSearchParams(searchParams);
        if (cat) params.set('category', cat);
        else params.delete('category');
        setSearchParams(params);
    };

    const handleSortChange = (value) => {
        const [newSort, newOrder] = value.split('-');
        const params = new URLSearchParams(searchParams);
        params.set('sortBy', newSort);
        params.set('order', newOrder);
        setSearchParams(params);
    };

    return (
        <div className="bg-[#f8f6f6] min-h-screen">
            <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 mt-16">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
                    <div className="space-y-4">
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-4xl md:text-5xl font-bold serif-font text-primary"
                        >
                            {category ? category : 'All Collections'}
                        </motion.h1>
                        <p className="text-primary/60 text-sm max-w-md">Browse our curated selection of heritage garments, each woven with tradition and modern sensibilities.</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
                        <div className="relative group min-w-[160px]">
                            <select
                                value={category}
                                onChange={(e) => handleFilterChange(e.target.value)}
                                className="appearance-none bg-white border border-primary/10 rounded-lg px-6 py-3 pr-10 text-xs font-bold uppercase tracking-widest text-primary focus:ring-1 focus:ring-primary w-full transition-all"
                            >
                                <option value="">All Categories</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40 pointer-events-none" />
                        </div>

                        <div className="relative group min-w-[200px]">
                            <select
                                value={`${sortBy}-${order}`}
                                onChange={(e) => handleSortChange(e.target.value)}
                                className="appearance-none bg-white border border-primary/10 rounded-lg px-6 py-3 pr-10 text-xs font-bold uppercase tracking-widest text-primary focus:ring-1 focus:ring-primary w-full transition-all"
                            >
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="created_at-desc">Newest First</option>
                            </select>
                            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-100 text-red-600 px-6 py-4 rounded-xl text-sm serif-font text-center">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="flex justify-center py-40"><Loader /></div>
                ) : (
                    <AnimatePresence mode="wait">
                        {products.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-40 space-y-4"
                            >
                                <div className="text-primary/20 text-6xl material-symbols-outlined">inventory_2</div>
                                <h3 className="text-xl serif-font text-primary/60">No products found in this category</h3>
                                <button onClick={() => handleFilterChange('')} className="text-xs font-bold uppercase tracking-widest text-primary border-b border-primary pb-1">Reset Filters</button>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12"
                            >
                                {products.map((product, idx) => (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
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

export default ProductListing;
