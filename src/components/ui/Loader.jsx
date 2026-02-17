import React from 'react';
import { motion } from 'framer-motion';

const Loader = ({ fullScreen }) => {
    return (
        <div className={fullScreen ? "fixed inset-0 z-[9999] bg-ivory flex items-center justify-center" : "inline-flex items-center justify-center p-4"}>
            <div className="relative flex items-center justify-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 rounded-full border-t-2 border-primary/10 border-r-2 border-primary/50"
                />
                <motion.div
                    initial={{ opacity: 0.5, scale: 0.8 }}
                    animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute font-bold text-primary serif-font text-xs uppercase tracking-tighter"
                >
                    Bastrika
                </motion.div>
            </div>
        </div>
    );
};

export default Loader;
