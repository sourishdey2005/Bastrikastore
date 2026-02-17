import React from 'react';
import { motion } from 'framer-motion';

const WorldOfBastrika = () => {
    return (
        <div className="bg-[#f8f6f6] min-h-screen pt-32 pb-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center space-y-12 mb-32"
                >
                    <span className="text-primary/40 uppercase tracking-[0.6em] text-[12px] font-bold block">Since 1999</span>
                    <h1 className="text-6xl md:text-8xl serif-font text-primary italic font-light leading-tight">World of Bastrika</h1>
                    <div className="w-24 h-px bg-primary/10 mx-auto"></div>
                    <p className="max-w-3xl mx-auto text-primary/70 text-xl serif-font leading-relaxed italic">
                        "For culture to be relevant, it needs to be dynamic. At Bastrika, we don't just preserve the past; we breathe new life into heritage weaves."
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center mb-40">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-10 group"
                    >
                        <h2 className="text-4xl serif-font text-primary leading-tight group-hover:italic transition-all duration-700">The Art of the Handloom</h2>
                        <p className="text-primary/60 leading-relaxed text-lg font-light">
                            Every Bastrika garment begins at the rhythmic pulse of the handloom. We work with master weavers across Bengal, ensuring that the ancient language of silk and zari continues to speak in the modern world.
                        </p>
                        <div className="aspect-[4/5] bg-ivory rounded-sm overflow-hidden shadow-2xl relative">
                            <img src="https://imgs.search.brave.com/ic_jp7urEjJ-j9-LYRQa5IgTC5LsqDaK67RH-OJUBTI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9saXR0/bGVtdWZmZXQuaW4v/Y2RuL3Nob3AvZmls/ZXMvMjk5MjItMS0x/NzU1ODY4MjczLmpw/Zz92PTE3NjkyNTgz/MTImd2lkdGg9MTIw/MA" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s]" alt="Heritage Weaver" />
                            <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/0 transition-all duration-1000"></div>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-10 group"
                    >
                        <div className="aspect-[4/3] bg-ivory rounded-sm overflow-hidden shadow-2xl relative">
                            <img src="https://imgs.search.brave.com/JD7EgzRqXR4FCvd8wb2gzmpQ3LGEwqwrc6oy2KTw2as/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZ3MuY29tL29y/aWdpbmFscy80NC8y/MS81Ni80NDIxNTY4/YzQ2NDM4ZjdhNjA0/NWE1MGM3MzQ1MjQ4/Yi5qcGc" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s]" alt="Bengali Mansion" />
                            <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/0 transition-all duration-1000"></div>
                        </div>
                        <h2 className="text-4xl serif-font text-primary leading-tight group-hover:italic transition-all duration-700">Calcutta: Our Muse</h2>
                        <p className="text-primary/60 leading-relaxed text-lg font-light">
                            The soul of North Calcutta—its grandeur, its decay, and its nonchalant luxury—is woven into every collection. We celebrate the spiritual neglect of glamour that makes this city unforgettable.
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="py-40 border-t border-primary/5 text-center"
                >
                    <p className="text-primary/30 uppercase tracking-[0.4em] text-[10px] font-bold mb-10">Our Commitment</p>
                    <h3 className="text-3xl md:text-5xl serif-font text-primary italic leading-relaxed max-w-4xl mx-auto">
                        Preserving craftsmanship and fostering sustainability through direct artisanal partnerships.
                    </h3>
                </motion.div>
            </div>
        </div>
    );
};

export default WorldOfBastrika;
