import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getProducts } from '../services/product.service';
import ProductCard from '../components/product/ProductCard';
import Loader from '../components/ui/Loader';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            title: "Where Tradition Meets Modern Commerce",
            subtitle: "The Autumn Anthology",
            desc: "Discover the Elegant Serif collection of luxury Bengali-inspired fashion.",
            image: "https://images.unsplash.com/photo-1583316174775-bd6dc0e9f298?q=80&w=2070&auto=format&fit=crop",
            cta: "Shop Collection"
        },
        {
            title: "Legacy in Every Stitch",
            subtitle: "Artisan Heritage",
            desc: "Handcrafted masterpieces passed down through generations of master weavers.",
            image: "https://imgs.search.brave.com/B9EJfj8Ub47zRgzjYqA9S3tMnWcjxbVM-7ZelkkPanM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWct/Y2RuLnB1YmxpdmUu/b25saW5lL2ZpdC1p/bi8xMjgweDk2MC9m/aWx0ZXJzOmZvcm1h/dCh3ZWJwKS8zMC1z/dGFkZXMvbWVkaWEv/cG9zdF9iYW5uZXJz/L0ZpR2RQcEpCelJk/aFAwazh3NW9qLmpw/Zw",
            cta: "Explore Heritage"
        },
        {
            title: "The New Generation",
            subtitle: "Kids Collection",
            desc: "Passing on the elegance of our roots to the ones who carry it forward.",
            image: "https://imgs.search.brave.com/ic_jp7urEjJ-j9-LYRQa5IgTC5LsqDaK67RH-OJUBTI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9saXR0/bGVtdWZmZXQuaW4v/Y2RuL3Nob3AvZmls/ZXMvMjk5MjItMS0x/NzU1ODY4MjczLmpw/Zz92PTE3NjkyNTgz/MTImd2lkdGg9MTIw/MA",
            cta: "Shop Junior"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const data = await getProducts(null, 'created_at', 'desc');
                setFeaturedProducts(data.slice(0, 4));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchFeatured();
    }, []);

    return (
        <div className="bg-[#f8f6f6] overflow-x-hidden">
            {/* Hero Carousel */}
            <section className="relative h-[90vh] overflow-hidden bg-black">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, scale: 1.2 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5)), url('${slides[currentSlide].image}')`
                        }}
                    >
                        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
                            <motion.div
                                initial={{ opacity: 0, y: 50, letterSpacing: '0.1em' }}
                                animate={{ opacity: 1, y: 0, letterSpacing: 'normal' }}
                                transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className="max-w-4xl space-y-8"
                            >
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                    className="text-white/80 uppercase tracking-[0.6em] text-[10px] font-bold block"
                                >
                                    {slides[currentSlide].subtitle}
                                </motion.span>
                                <h2 className="text-5xl md:text-7xl lg:text-9xl text-white serif-font font-light italic leading-tight">
                                    {slides[currentSlide].title}
                                </h2>
                                <Link to="/products" className="inline-block relative group">
                                    <span className="text-white py-2 uppercase tracking-[0.4em] text-[11px] font-bold block transition-transform duration-500 group-hover:-translate-y-1">Explore Collection</span>
                                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white transform origin-right scale-x-0 transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100"></span>
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Indicators */}
                <div className="absolute border-t border-white/10 bottom-0 left-0 w-full h-24 flex items-center justify-center gap-12 z-10 glass-dark">
                    {slides.map((s, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className="group flex flex-col items-center gap-2"
                        >
                            <span className={`text-[9px] font-bold uppercase tracking-widest transition-colors duration-500 ${currentSlide === idx ? 'text-white' : 'text-white/30'}`}>0{idx + 1}</span>
                            <div className={`h-[1px] transition-all duration-700 ease-in-out ${currentSlide === idx ? 'w-24 bg-accent-gold' : 'w-12 bg-white/20 group-hover:bg-white/40'}`} />
                        </button>
                    ))}
                </div>
            </section>

            {/* 25 Years Section */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5 }}
                className="py-40 px-6 text-center bg-white"
            >
                <div className="max-w-3xl mx-auto space-y-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        <h3 className="text-4xl serif-font uppercase tracking-[0.3em] text-primary mb-2">25 Years Bastrika</h3>
                        <p className="text-[10px] text-primary/40 uppercase tracking-[0.5em] font-bold">The Golden Jubilee of Craft</p>
                    </motion.div>

                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="aspect-video bg-ivory relative group cursor-pointer overflow-hidden rounded-sm shadow-[0_30px_60px_-15px_rgba(108,30,30,0.1)]"
                    >
                        <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1976" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-[2s] ease-out" />
                        {/* Video Layer removed play button */}
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="text-3xl italic serif-font text-primary/80 pt-10 leading-relaxed px-10"
                    >
                        â€œFor culture to be relevant, it needs to be dynamic. At Bastrika, we don't just preserve the past; we breathe new life into heritage weaves.â€
                    </motion.p>
                </div>
            </motion.section>

            {/* Major Sections Grid */}
            <section className="px-6 py-32 bg-ivory/30">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-primary/5 px-4 lg:px-20">
                    {[
                        { title: "Evening Collection", img: "https://imgs.search.brave.com/doN7kHPDXIJ6d4oBlAeOt5Z23T3cb1tJrCTvHpSQawI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9iZWF1/dGlmdWwtc2V4eS13/b21hbi1jbG90aGVz/LWNvbGxlY3Rpb24t/ZHJlc3MtZ2lybC1i/b2R5LXNoYXBlLXlv/dW5nLWJ1c2luZXNz/LXdvbWVuLWhhaXIt/ZXZlbmluZy1tYWtl/dXAtd2VhcmluZy1z/dWl0LXRvcC1oaWdo/LWhlZWxzLTYwNjg2/NjMwLmpwZw", delay: 0 },
                        { title: "Autumn / Winter 2025", img: "https://imgs.search.brave.com/MjcZdy2kfnmiF2WGhiR-HtVlhnQBxt7-5S1RFNDLGTs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAyLzkzLzIxLzI4/LzM2MF9GXzI5MzIx/MjgxNl9IWVVUQzla/SWtEVE56T05FeUFV/TUR6T3R1QnhQak9I/cS5qcGc", delay: 0.2 },
                        { title: "Heritage Menswear", img: "https://imgs.search.brave.com/bMVjG__-T5GDEUOsDmePUwcoY1C03OsbqiultXjkbOc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/bWVuc3dlYXJzdHls/ZS5jby51ay9jb250/ZW50L2Jsb2dzLzlm/ZWM3MzYxLWViNDAt/NDdkZi1iNmNhLTVh/MjBiOTk4MDg4N19i/bG9nX2xuXy5qcGc", delay: 0.1 },
                        { title: "Bastrika Luxury", img: "https://imgs.search.brave.com/FOiLkscJKN6DCgK2ZXmlxolvolSG2X7lZcBdKGy_AfE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjMv/NTgxLzI1Ny9zbWFs/bC9iZWF1dGlmdWwt/aW5kaWFuLWFudGlx/dWUtZ29sZGVuLXBh/aXItb2YtZWFycmlu/Z3MtbHV4dXJ5LWZl/bWFsZS1qZXdlbHJ5/LWluZGlhbi10cmFk/aXRpb25hbC1qZXdl/bGxlcnktaW5kaWFu/LWpld2VscnktYnJp/ZGFsLWVhcnJpbmdz/LXdlZGRpbmctamV3/ZWxsZXJ5LWhlYXZ5/LXBhcnR5LWVhcnJp/bmdzLWdlbmVyYXRp/dmUtYWktcGhvdG8u/anBn", delay: 0.3 }
                    ].map((sec, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 1.05 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: sec.delay, ease: [0.16, 1, 0.3, 1] }}
                            className="relative h-[800px] group overflow-hidden bg-black"
                        >
                            <img src={sec.img} className="w-full h-full object-cover transition-transform duration-[3s] ease-out group-hover:scale-110 opacity-70 group-hover:opacity-100" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-1000"></div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white space-y-8">
                                <motion.h4
                                    whileHover={{ y: -5 }}
                                    className="text-4xl serif-font uppercase tracking-widest text-center px-10 leading-tight"
                                >
                                    {sec.title}
                                </motion.h4>
                                <Link to="/products" className="text-[11px] font-bold uppercase tracking-[0.5em] border-b border-white/30 hover:border-white transition-all pb-1">Explore</Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* The Artisanal Process */}
            <section className="py-40 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-32 space-y-4"
                    >
                        <span className="text-primary/30 uppercase tracking-[0.6em] text-[10px] font-bold">The Soul of the Weave</span>
                        <h2 className="text-5xl md:text-7xl serif-font text-primary italic font-light">Artisanal Process</h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { step: "01", title: "Hand Spun", desc: "The finest silk threads, spun by hand to ensure a tactile soul in every garment.", img: "https://www.freepik.com/free-photo/line-reels-warm-colors-yarn_4886858.htm#fromView=search&page=1&position=20&uuid=5a74db4a-0c37-42b1-90b3-daa5cdbe0091&query=spun++images" },
                            { step: "02", title: "Deep Dyed", desc: "Using organic minerals to achieve the signature Bastrika Maroon—a color that lives and breathes.", img: "https://as1.ftcdn.net/v2/jpg/09/97/38/62/1000_F_997386299_0dbc5XhibnmUt2MHfa6sgjbCK3gszpPM.jpg" },
                            { step: "03", title: "The Loom", desc: "Weeks of rhythmic precision on traditional handlooms, where heritage meets the modern eye.", img: "https://images.unsplash.com/photo-1564656622440-e6206eb5ee63?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, delay: idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
                                className="group relative overflow-hidden rounded-sm"
                            >
                                <div className="aspect-[3/4] overflow-hidden">
                                    <img src={item.img} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" alt={item.title} />
                                    <div className="absolute inset-0 grad-overlay opacity-60 group-hover:opacity-40 transition-opacity duration-1000"></div>
                                </div>
                                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                                    <span className="text-accent-gold font-bold text-lg mb-4 opacity-50">{item.step}</span>
                                    <h4 className="text-2xl serif-font mb-4 italic">{item.title}</h4>
                                    <p className="text-[11px] text-white/70 uppercase tracking-widest leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                                        {item.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Client Heritage (Testimonials) */}
            <section className="py-40 bg-ivory/20 relative">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-12"
                        >
                            <span className="text-primary/30 uppercase tracking-[0.5em] text-[10px] font-bold">The Patronage</span>
                            <h2 className="text-4xl md:text-5xl serif-font text-primary leading-tight italic">
                                "A Bastrika sari isn't just clothing; it's a conversation with my roots."
                            </h2>
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-px bg-accent-gold"></div>
                                <span className="text-[12px] uppercase tracking-[0.3em] font-bold text-primary">Malini Roy, Art Collector</span>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="aspect-square rounded-full overflow-hidden border-8 border-white shadow-2xl">
                                <img src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=2080&auto=format&fit=crop" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" alt="Client Patron" />
                            </div>
                            <div className="absolute -top-10 -right-10 w-40 h-40 grad-maroon-gold rounded-full opacity-10 animate-pulse"></div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* The Calcutta Atelier */}
            <section className="h-screen relative flex items-center justify-center overflow-hidden">
                <motion.div
                    initial={{ scale: 1.5 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 4, ease: "easeOut" }}
                    className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1616194477691-f5c87bb33219?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center"
                />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>

                <div className="relative z-10 text-center space-y-16 px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <span className="text-accent-gold/60 uppercase tracking-[1em] text-[10px] font-bold">The Sanctuary</span>
                        <h2 className="text-6xl md:text-9xl text-white serif-font italic font-light">The Atelier</h2>
                    </motion.div>

                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "120px" }}
                        viewport={{ once: true }}
                        className="h-px bg-accent-gold/40 mx-auto"
                    />

                    <p className="max-w-2xl mx-auto text-white/70 text-lg serif-font italic leading-relaxed">
                        "For culture to be relevant, it needs to be dynamic. At Bastrika, we don't just preserve the past; we breathe new life into heritage weaves."
                    </p>

                    <button className="glass-dark px-12 py-5 text-white text-[11px] uppercase tracking-[0.5em] font-bold hover:bg-white hover:text-black transition-all">
                        Request a Tour
                    </button>
                </div>
            </section>

            {/* Visual Mosaic */}
            <section className="bg-white py-40 px-4 md:px-20 overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-32 text-center"
                >
                    <h5 className="text-5xl md:text-6xl serif-font text-primary mb-10 italic font-light">A Calcutta Summer Feast</h5>
                    <div className="flex justify-center mb-20">
                        <Link to="/products" className="text-[11px] font-bold uppercase tracking-[0.4em] text-primary border-b border-primary/10 hover:border-primary transition-all pb-2">View Full Series</Link>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, scale: 1.1, y: 100 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full h-[700px] bg-ivory rounded-sm overflow-hidden shadow-[0_50px_100px_-20px_rgba(108,30,30,0.15)] group relative"
                    >
                        <img src="https://imgs.search.brave.com/ei975Nf21wYxkpLmllRtokvU8Jo47vLVftye2PChw5c/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzU2LzJi/LzAyLzU2MmIwMjE5/ZDJlOGFiZDFhY2Rl/NDdlY2I5YWE0NTYz/LmpwZw" className="w-full h-full object-cover transition-transform duration-[5s] group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-1000"></div>
                    </motion.div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                    {[
                        { title: 'High Jewellery', img: 'https://imgs.search.brave.com/2c-RLgTWeQ2Iqftwi91ZfaUz38sYDYp0NGSyc9HQHKg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/aHVtYmVydG93bmpl/d2VsbGVycy5jb20v/cHVibGljLzEuMC91/cGxvYWRzL3NvdXJj/ZS9ibG9ncy91bmRl/cnN0YW5kaW5nLWhp/Z2gtamV3ZWxsZXJ5/LzIybW9iaWxlLndl/YnA' },
                        { title: 'Bridal Couture', img: 'https://imgs.search.brave.com/-QMxzI6S3cfqur7-wTnN6uF70y4RviuZFJdbuE7olfY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMucHJpc21pYy5p/by9tZW1vcmllc2Rl/c2lnbmVyLzU4MGM4/NTkxLTE5ZTItNDAy/Mi1iNmFjLTMzYzc0/MmE1NzM3Zl81LnBu/Zz9hdXRvPWNvbXBy/ZXNzLGZvcm1hdCZy/ZWN0PTAsMCwxNDk5/LDEwMDAmdz00MDAw/Jmg9NjY3' },
                        { title: 'Craft Revival', img: 'https://imgs.search.brave.com/JD7EgzRqXR4FCvd8wb2gzmpQ3LGEwqwrc6oy2KTw2as/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzQ0LzIx/LzU2LzQ0MjE1Njhj/NDY0MzhmN2E2MDQ1/YTUwYzczNDUyNDhi/LmpwZw' },
                        { title: 'Accessories', img: 'https://imgs.search.brave.com/XPC6Db8l7huuOR9Y4XkocadBh3YCpAlGXm4NVxW8klo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/LzE5OTk5NjYzL2Mv/MTQ4MS8xMTc3LzE1/OC80ODcvaWwvZTcy/ZmMxLzM1NDM0Mjgy/MDkvaWxfMzQweDI3/MC4zNTQzNDI4MjA5/X2x0aXEuanBn' },
                        { title: 'Weddings', img: 'https://imgs.search.brave.com/jzxIiDNPPdgNF9v_fizS2ChD-1tSvFABpRY0ulxQgE4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/cGFuYXNoaW5kaWEu/Y29tL21lZGlhL2hv/bWUvd2VicC9zaG9w/LWhlYXZ5LWJvcmRl/ci1zYXJlZXMtMzAw/MTI2LndlYnA' },
                        { title: 'Art of Retail', img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=2080&auto=format&fit=crop' }
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: idx * 0.1 }}
                            className="group cursor-pointer"
                        >
                            <div className="aspect-[3/4] overflow-hidden mb-10 bg-ivory rounded-sm shadow-lg group-hover:shadow-2xl transition-all duration-700">
                                <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out" />
                            </div>
                            <h6 className="text-[13px] uppercase tracking-[0.4em] text-primary font-bold mb-4 flex items-center gap-3">
                                {item.title}
                                <span className="w-0 group-hover:w-12 h-px bg-accent-gold transition-all duration-700"></span>
                            </h6>
                            <button className="text-[10px] uppercase tracking-[0.5em] text-primary/30 group-hover:text-primary transition-all duration-500 transform group-hover:translate-x-2">Discovery â†’</button>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Social Mosaic: Bastrika in the World */}
            <section className="py-40 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-32 space-y-6"
                    >
                        <span className="text-primary/30 uppercase tracking-[0.8em] text-[10px] font-bold block">Digital Vernacular</span>
                        <h2 className="text-5xl md:text-7xl serif-font text-primary italic font-light leading-tight">Bastrika in the World</h2>
                        <div className="w-20 h-px bg-accent-gold/20 mx-auto"></div>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                        {[
                            { img: "https://images.unsplash.com/photo-1583316174775-bd6dc0e9f298?q=80&w=1000", span: "md:col-span-2 md:row-span-2" },
                            { img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000", span: "" },
                            { img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000", span: "" },

                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: idx * 0.1 }}
                                className={`relative group overflow-hidden bg-ivory/20 rounded-sm cursor-pointer ${item.span}`}
                            >
                                <img src={item.img} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 grayscale hover:grayscale-0" />
                                <div className="absolute inset-0 grad-maroon-gold opacity-0 group-hover:opacity-20 transition-opacity duration-1000"></div>
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="glass w-12 h-12 rounded-full flex items-center justify-center group-hover:rotate-[360deg] transition-all duration-[1.5s]">
                                        <span className="material-symbols-outlined text-primary text-xl">favorite</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Narrative Quote */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2 }}
                className="py-60 px-6 bg-primary text-white text-center relative overflow-hidden"
            >
                {/* Subtle background grain or glow could go here */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>

                <div className="max-w-4xl mx-auto space-y-12 relative z-10">
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="text-2xl md:text-3xl lg:text-4xl serif-font font-light italic leading-relaxed"
                    >
                        "For culture to be relevant, it needs to be dynamic. At Bastrika, we don't just preserve the past; we breathe new life into heritage weaves."
                    </motion.p>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "64px" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 1 }}
                        className="h-px bg-accent-gold mx-auto"
                    ></motion.div>
                </div>
            </motion.section>
        </div>
    );
};

export default Home;
