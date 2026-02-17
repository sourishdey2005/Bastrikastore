import React from 'react';
import { motion } from 'framer-motion';

const WomensCouture = () => {
    return (
        <div className="bg-[#f8f6f6] min-h-screen pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-8 mb-20"
                >
                    <span className="text-primary/40 uppercase tracking-[0.5em] text-[10px] font-bold block">Heritage Collection</span>
                    <h1 className="text-5xl md:text-7xl serif-font text-primary italic font-light">Women's Couture</h1>
                    <div className="w-20 h-px bg-primary/10 mx-auto"></div>
                    <p className="max-w-2xl mx-auto text-primary/60 text-lg serif-font leading-relaxed">
                        Handcrafted elegance passed down through generations. Our couture collection reimagines traditional Bengali silhouettes for the modern connoisseur.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="aspect-[4/5] bg-ivory overflow-hidden rounded-sm group">
                        <img src="https://imgs.search.brave.com/doN7kHPDXIJ6d4oBlAeOt5Z23T3cb1tJrCTvHpSQawI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9iZWF1/dGlmdWwtc2V4eS13/b21hbi1jbG90aGVz/LWNvbGxlY3Rpb24t/ZHJlc3MtZ2lybC1i/b2R5LXNoYXBlLXlv/dW5nLWJ1c2luZXNz/LXdvbWVuLWhhaXIt/ZXZlbmluZy1tYWtl/dXAtd2VhcmluZy1z/dWl0LXRvcC1oaWdo/LWhlZWxzLTYwNjg2/NjMwLmpwZw" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Couture Piece" />
                    </div>
                    <div className="flex flex-col justify-center space-y-8">
                        <h2 className="text-3xl serif-font text-primary">The Evening Symphony</h2>
                        <p className="text-primary/60 leading-relaxed font-light">
                            Each piece in our Women's Couture line is a masterpiece of artisanal craftsmanship. From intricate zari work to the finest hand-woven silks, we dedicate hundreds of hours to a single garment.
                        </p>
                        <button className="self-start text-[11px] font-bold uppercase tracking-[0.3em] text-primary border-b border-primary/20 pb-1 hover:border-primary transition-all">Request Appointment</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WomensCouture;
