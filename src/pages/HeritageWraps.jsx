import React from 'react';
import { motion } from 'framer-motion';

const HeritageWraps = () => {
    return (
        <div className="bg-[#f8f6f6] min-h-screen pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-8 mb-20"
                >
                    <span className="text-primary/40 uppercase tracking-[0.5em] text-[10px] font-bold block">Legacy Accessories</span>
                    <h1 className="text-5xl md:text-7xl serif-font text-primary italic font-light">Heritage Wraps</h1>
                    <div className="w-20 h-px bg-primary/10 mx-auto"></div>
                    <p className="max-w-2xl mx-auto text-primary/60 text-lg serif-font leading-relaxed">
                        Layering tradition. Our collection of wraps and shawls features the finest pashmina and hand-embroidered textiles, designed to be passed down through generations.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="aspect-[4/5] bg-ivory overflow-hidden rounded-sm group">
                            <img src={`https://imgs.search.brave.com/MjcZdy2kfnmiF2WGhiR-HtVlhnQBxt7-5S1RFNDLGTs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAyLzkzLzIxLzI4/LzM2MF9GXzI5MzIx/MjgxNl9IWVVUQzla/SWtEVE56T05FeUFV/TUR6T3R1QnhQak9I/cS5qcGc`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Heritage Wrap" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HeritageWraps;
