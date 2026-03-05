import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import BuildPC from './pages/BuildPC';
import Cart from './pages/Cart';
import Auth from './pages/Auth';
import Admin from './pages/Admin';
import MyBuilds from './pages/MyBuilds';
import Payment from './pages/Payment';
import Success from './pages/Success';
import Failure from './pages/Failure';
import CompareBuilds from './pages/CompareBuilds';
import { Toaster } from 'react-hot-toast';

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <Toaster
                        position="top-right"
                        toastOptions={{
                            className: 'glass-card text-white border border-white/10',
                            style: {
                                background: 'rgba(10, 10, 10, 0.9)',
                                backdropFilter: 'blur(12px)',
                                color: '#fff',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '1rem',
                                padding: '1rem 1.5rem',
                                fontWeight: '600'
                            }
                        }}
                    />
                    <div className="min-h-screen bg-[#030303] text-gray-200">
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/build" element={<BuildPC />} />
                            <Route path="/my-builds" element={<MyBuilds />} />
                            <Route path="/compare" element={<CompareBuilds />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/payment" element={<Payment />} />
                            <Route path="/success" element={<Success />} />
                            <Route path="/failure" element={<Failure />} />
                            <Route path="/auth" element={<Auth />} />
                            <Route path="/admin" element={<Admin />} />
                        </Routes>
                    </div>
                </Router>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;
