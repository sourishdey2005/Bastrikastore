import React from 'react';
import { motion } from 'framer-motion';

const Terms = () => {
    return (
        <div className="bg-[#f8f6f6] min-h-screen pt-32 pb-20">
            <div className="max-w-3xl mx-auto px-6 space-y-12">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                >
                    <h1 className="text-4xl serif-font text-primary">Terms & Conditions</h1>
                    <p className="text-[10px] uppercase tracking-widest text-primary/40 font-bold">Effective Date: October 2026</p>
                </motion.div>

                <div className="prose prose-primary serif-font text-primary/70 leading-relaxed space-y-8">
                    <p>Welcome to the digital residence of Bastrika Luxury. By accessing our website, you agree to comply with the following terms and conditions.</p>

                    <section className="space-y-4">
                        <h2 className="text-2xl text-primary uppercase tracking-widest text-sm font-bold">Intellectual Property</h2>
                        <p>All designs, imagery, and text on this website are the intellectual property of Bastrika Luxury. Reproduction or unauthorized use of these materials is strictly prohibited.</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl text-primary uppercase tracking-widest text-sm font-bold">Purchases</h2>
                        <p>All orders placed through our website are subject to availability. We reserve the right to refuse service or cancel orders at our discretion.</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Terms;
