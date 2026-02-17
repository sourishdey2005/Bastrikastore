import React from 'react';
import { motion } from 'framer-motion';

const MensAristocracy = () => {
    return (
        <div className="bg-[#f8f6f6] min-h-screen pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-8 mb-20"
                >
                    <span className="text-primary/40 uppercase tracking-[0.5em] text-[10px] font-bold block">Heritage Collection</span>
                    <h1 className="text-5xl md:text-7xl serif-font text-primary italic font-light">Men's Aristocracy</h1>
                    <div className="w-20 h-px bg-primary/10 mx-auto"></div>
                    <p className="max-w-2xl mx-auto text-primary/60 text-lg serif-font leading-relaxed">
                        Regal silhouettes and timeless tailoring. A tribute to the heritage of the Bengali gentleman, refined for the contemporary world.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="flex flex-col justify-center space-y-8 order-2 md:order-1">
                        <h2 className="text-3xl serif-font text-primary">The Royal Heritage</h2>
                        <p className="text-primary/60 leading-relaxed font-light">
                            Our menswear collection focuses on structure, fabric, and the subtle details that define luxury. From ceremonial Sherwanis to tailored Kurtas, every stitch tells a story of prestige.
                        </p>
                        <button className="self-start text-[11px] font-bold uppercase tracking-[0.3em] text-primary border-b border-primary/20 pb-1 hover:border-primary transition-all">Explore Collection</button>
                    </div>
                    <div className="aspect-[4/5] bg-ivory overflow-hidden rounded-sm group order-1 md:order-2">
                        <img src="https://imgs.search.brave.com/bMVjG__-T5GDEUOsDmePUwcoY1C03OsbqiultXjkbOc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/bWVuc3dlYXJzdHls/ZS5jby51ay9jb250/ZW50//YmxvZ3MvOWZlYzcz/NjEtZWI0MC00N2Rm/LWI2Y2EtNWEyMGI5/OTgwODg3X2Jsb2df/bG5fLmpwZw" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Menswear Piece" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MensAristocracy;
