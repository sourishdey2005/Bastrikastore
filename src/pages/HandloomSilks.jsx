import React from 'react';
import { motion } from 'framer-motion';

const HandloomSilks = () => {
    return (
        <div className="bg-[#f8f6f6] min-h-screen pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-8 mb-20"
                >
                    <span className="text-primary/40 uppercase tracking-[0.5em] text-[10px] font-bold block">Artisanal Craft</span>
                    <h1 className="text-5xl md:text-7xl serif-font text-primary italic font-light">Handloom Silks</h1>
                    <div className="w-20 h-px bg-primary/10 mx-auto"></div>
                    <p className="max-w-2xl mx-auto text-primary/60 text-lg serif-font leading-relaxed">
                        The rhythmic beat of the loom. Our handloom silks are woven with devotion, preserving centuries-old techniques that produce the world's most exquisite fabrics.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: "Mulberry Silk", img: "https://imgs.search.brave.com/jzxIiDNPPdgNF9v_fizS2ChD-1tSvFABpRY0ulxQgE4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/cGFuYXNoaW5kaWEu/Y29tL21lZGlhL2hv/bWUvd2VicC9zaG9w/LWhlYXZ5LWJvcmRl/ci1zYXJlZXMtMzAw/MTI2LndlYnA" },
                        { title: "Tussar Silk", img: "https://imgs.search.brave.com/ei975Nf21wYxkpLmllRtokvU8Jo47vLVftye2PChw5c/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzU2LzJi/LzAyLzU2MmIwMjE5/ZDJlOGFiZDFhY2Rl/NDdlY2I5YWE0NTYz/LmpwZw" },
                        { title: "Garad Silk", img: "https://imgs.search.brave.com/ic_jp7urEjJ-j9-LYRQa5IgTC5LsqDaK67RH-OJUBTI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9saXR0/bGVtdWZmZXQuaW4v/Y2RuL3Nob3AvZmls/ZXMvMjk5MjItMS0x/NzU1ODY4MjczLmpw/Zz92PTE3NjkyNTgz/MTImd2lkdGg9MTIw/MA" }
                    ].map((item, idx) => (
                        <div key={idx} className="space-y-6">
                            <div className="aspect-[3/4] overflow-hidden rounded-sm bg-ivory group">
                                <img src={item.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt={item.title} />
                            </div>
                            <h3 className="text-xl serif-font text-primary">{item.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HandloomSilks;
