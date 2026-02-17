import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-primary/5 pt-24 pb-12 mt-auto">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
                {/* Brand & Mission */}
                <div className="space-y-8">
                    <h2 className="text-3xl serif-font text-primary tracking-widest font-bold">BASTRIKA</h2>
                    <p className="text-[12px] text-primary/60 leading-relaxed max-w-[280px] italic serif-font">
                        Preserving the soul of Bengali textile art through modern luxury design.
                    </p>
                    <div className="flex gap-6 text-primary/30">
                        <span className="material-symbols-outlined text-2xl hover:text-accent-gold transition-colors cursor-default">public</span>
                        <span className="material-symbols-outlined text-2xl hover:text-accent-gold transition-colors cursor-default">eco</span>
                        <span className="material-symbols-outlined text-2xl hover:text-accent-gold transition-colors cursor-default">location_on</span>
                    </div>
                </div>

                {/* Collections */}
                <div>
                    <h6 className="font-bold text-primary uppercase tracking-[0.3em] text-[10px] mb-10">Collections</h6>
                    <ul className="space-y-6 text-[11px] uppercase tracking-widest text-primary/60">
                        <li><Link to="/collections/womens-couture" className="hover:text-primary transition-colors hover:translate-x-1 inline-block transform duration-300">Women's Couture</Link></li>
                        <li><Link to="/collections/mens-aristocracy" className="hover:text-primary transition-colors hover:translate-x-1 inline-block transform duration-300">Men's Aristocracy</Link></li>
                        <li><Link to="/collections/handloom-silks" className="hover:text-primary transition-colors hover:translate-x-1 inline-block transform duration-300">Handloom Silks</Link></li>
                        <li><Link to="/collections/heritage-wraps" className="hover:text-primary transition-colors hover:translate-x-1 inline-block transform duration-300">Heritage Wraps</Link></li>
                    </ul>
                </div>

                {/* Social Feed */}
                <div>
                    <h6 className="font-bold text-primary uppercase tracking-[0.3em] text-[10px] mb-10">Social Feed</h6>
                    <div className="flex gap-4">
                        <a href="#" className="w-10 h-10 rounded-full border border-primary/10 flex items-center justify-center text-primary/40 hover:text-primary hover:border-primary transition-all">
                            <span className="text-[10px] font-bold">IG</span>
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full border border-primary/10 flex items-center justify-center text-primary/40 hover:text-primary hover:border-primary transition-all">
                            <span className="text-[10px] font-bold">FB</span>
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full border border-primary/10 flex items-center justify-center text-primary/40 hover:text-primary hover:border-primary transition-all">
                            <span className="text-[10px] font-bold">YT</span>
                        </a>
                    </div>
                </div>

                {/* Newsletter */}
                <div className="space-y-8">
                    <div>
                        <h6 className="font-bold text-primary uppercase tracking-[0.3em] text-[10px] mb-4">Stay Connected</h6>
                        <p className="text-[11px] text-primary/40 tracking-widest">Join the Circle for private previews.</p>
                    </div>
                    <form className="relative group">
                        <input
                            type="email"
                            placeholder="EMAIL ADDRESS"
                            className="w-full bg-transparent border-b border-primary/10 py-3 text-[10px] tracking-[0.4em] outline-none focus:border-primary transition-colors placeholder:text-primary/20"
                        />
                        <button className="absolute right-0 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-primary transition-colors">
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </button>
                    </form>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pt-12 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-8">
                <p className="text-[9px] text-primary/30 uppercase tracking-[0.3em] font-bold">© 2026 Bastrika Luxury. All Rights Reserved.</p>
                <div className="flex gap-12 text-[9px] text-primary/30 uppercase tracking-[0.3em] font-bold">
                    <Link to="/privacy" className="hover:text-primary transition-colors underline-offset-4 hover:underline">Privacy</Link>
                    <Link to="/terms" className="hover:text-primary transition-colors underline-offset-4 hover:underline">Terms</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
