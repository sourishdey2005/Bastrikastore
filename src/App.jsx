import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductListing from './pages/ProductListing';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import ProtectedRoute from './components/common/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// New Heritage Pages
import WomensCouture from './pages/WomensCouture';
import MensAristocracy from './pages/MensAristocracy';
import HandloomSilks from './pages/HandloomSilks';
import HeritageWraps from './pages/HeritageWraps';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

// Collection Expansion
import WhatsNew from './pages/WhatsNew';
import HighJewellery from './pages/HighJewellery';
import FineJewellery from './pages/FineJewellery';
import Womenswear from './pages/Womenswear';
import Menswear from './pages/Menswear';
import Weddings from './pages/Weddings';
import Accessories from './pages/Accessories';
import WorldOfBastrika from './pages/WorldOfBastrika';

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <div className="app-container">
                    <Navbar />
                    <main className="main-content">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/products" element={<ProductListing />} />
                            <Route path="/product/:id" element={<ProductDetails />} />
                            <Route path="/cart" element={<Cart />} />

                            {/* Heritage Collection Routes */}
                            <Route path="/collections/womens-couture" element={<WomensCouture />} />
                            <Route path="/collections/mens-aristocracy" element={<MensAristocracy />} />
                            <Route path="/collections/handloom-silks" element={<HandloomSilks />} />
                            <Route path="/collections/heritage-wraps" element={<HeritageWraps />} />

                            {/* Legal Routes */}
                            <Route path="/privacy" element={<Privacy />} />
                            <Route path="/terms" element={<Terms />} />

                            {/* Expanded Heritage Collection Routes */}
                            <Route path="/whats-new" element={<WhatsNew />} />
                            <Route path="/collections/high-jewellery" element={<HighJewellery />} />
                            <Route path="/collections/fine-jewellery" element={<FineJewellery />} />
                            <Route path="/collections/womenswear" element={<Womenswear />} />
                            <Route path="/collections/menswear" element={<Menswear />} />
                            <Route path="/collections/weddings" element={<Weddings />} />
                            <Route path="/collections/accessories" element={<Accessories />} />
                            <Route path="/world-of-bastrika" element={<WorldOfBastrika />} />

                            {/* Protected Routes */}
                            <Route element={<ProtectedRoute />}>
                                <Route path="/checkout" element={<Checkout />} />
                                <Route path="/orders" element={<Orders />} />
                            </Route>
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;
