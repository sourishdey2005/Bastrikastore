import React from 'react';
import { motion } from 'framer-motion';

const Privacy = () => {
    return (
        <div className="bg-[#f8f6f6] min-h-screen pt-32 pb-20">
            <div className="max-w-3xl mx-auto px-6 space-y-12">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                >
                    <h1 className="text-4xl serif-font text-primary">Privacy Policy</h1>
                    <p className="text-[10px] uppercase tracking-widest text-primary/40 font-bold">Last Updated: October 2026</p>
                </motion.div>

                <div className="prose prose-primary serif-font text-primary/70 leading-relaxed space-y-8">
                    <p>At Bastrika Luxury, we value the trust you place in our brand. This Privacy Policy describes how we collect, use, and protect your personal information when you interact with our digital house.</p>

                    <section className="space-y-4">
                        <h2 className="text-2xl text-primary uppercase tracking-widest text-sm font-bold">Data Collection</h2>
                        <p>We collect information that helps us provide a personalized experience, including your name, contact details, and browsing preferences. This data allows us to refine our collections and offer exclusive previews.</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl text-primary uppercase tracking-widest text-sm font-bold">Security</h2>
                        <p>Your data is protected with industry-standard encryption. We never share your personal information with third parties for marketing purposes without your explicit consent.</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
