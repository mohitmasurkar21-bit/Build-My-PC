import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import GlassCard from '../components/GlassCard';
import toast from 'react-hot-toast';

const Cart = () => {
    const { user, isAuthenticated, loading: authLoading } = useAuth();
    const { cart, loading: cartLoading, updateQuantity, removeFromCart, clearCart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            navigate('/auth');
        }
    }, [isAuthenticated, authLoading, navigate]);

    // Loading priority: Auth must load first, then Cart
    const isLoading = authLoading || cartLoading;

    const handleUpdateQuantity = async (productId, quantity) => {
        if (quantity < 1) return;
        try {
            await updateQuantity(productId, quantity);
        } catch (error) {
            toast.error('Failed to update quantity');
        }
    };

    const handleRemoveItem = async (productId) => {
        try {
            await removeFromCart(productId);
            toast.success('Item removed');
        } catch (error) {
            toast.error('Failed to remove item');
        }
    };

    const handleClearCart = async () => {
        if (window.confirm('Are you sure you want to clear your entire cart?')) {
            try {
                await clearCart();
                toast.success('Cart cleared');
            } catch (error) {
                toast.error('Failed to clear cart');
            }
        }
    };

    const handleCheckout = () => {
        navigate('/payment');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-mesh flex items-center justify-center">
                <div className="spinner" />
            </div>
        );
    }

    const cartItems = cart?.items?.filter(item => item.product) || [];

    // Calculate total price locally for 100% accuracy and instant feedback
    const totalPrice = useMemo(() => {
        return cartItems.reduce((sum, item) => {
            const price = Number(item.product?.price) || 0;
            const quantity = Number(item.quantity) || 0;
            return sum + (price * quantity);
        }, 0);
    }, [cartItems]);

    return (
        <div className="min-h-screen bg-mesh py-12">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                    <div>
                        <h1 className="text-5xl font-black tracking-tighter mb-2">
                            SHOPPING <span className="text-purple-500">CART</span>
                        </h1>
                        <p className="text-gray-400">Review your select hardware before checkout.</p>
                    </div>
                    {cartItems.length > 0 && (
                        <button
                            onClick={handleClearCart}
                            className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all"
                        >
                            Reset Cart
                        </button>
                    )}
                </div>

                {cartItems.length === 0 ? (
                    <GlassCard className="text-center py-20">
                        <div className="text-8xl mb-8">🛠️</div>
                        <h2 className="text-3xl font-bold mb-4">Your Arsenal is Empty</h2>
                        <p className="text-gray-400 mb-10 max-w-md mx-auto">Looks like you haven't selected any components for your custom build yet.</p>
                        <button
                            onClick={() => navigate('/build')}
                            className="btn-primary shadow-neon-lg px-12"
                        >
                            Start Building Now
                        </button>
                    </GlassCard>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-6">
                            {cartItems.map((item) => {
                                const API_URL = 'http://localhost:5000';
                                const imageUrl = item.product.image?.startsWith('/uploads') ? `${API_URL}${item.product.image}` : item.product.image;

                                return (
                                    <GlassCard key={item.product.id} className="group hover:border-white/20 transition-all">
                                        <div className="flex flex-col sm:flex-row gap-6">
                                            <div className="w-full sm:w-32 h-32 bg-dark-hover rounded-2xl overflow-hidden border border-white/5 ring-1 ring-white/10">
                                                <img
                                                    src={imageUrl}
                                                    alt={item.product.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    onError={(e) => {
                                                        e.target.src = 'https://placehold.co/200x200/1a1a1a/purple?text=Hardware';
                                                    }}
                                                />
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <span className="text-[10px] font-black text-purple-500 uppercase tracking-widest">{item.product.category}</span>
                                                        <h3 className="font-bold text-xl text-white truncate">{item.product.name}</h3>
                                                        <p className="text-sm text-gray-500">{item.product.brand}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => handleRemoveItem(item.product.id)}
                                                        className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                                                        title="Remove from cart"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>

                                                <div className="flex items-center justify-between mt-6">
                                                    <div className="flex items-center bg-white/5 rounded-xl border border-white/10 p-1">
                                                        <button
                                                            onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                                                            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                                                        <button
                                                            onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                                                            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <p className="text-2xl font-black gradient-text">
                                                        ₹{(item.product.price * item.quantity).toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </GlassCard>
                                );
                            })}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <GlassCard className="sticky top-24 border-purple-500/20 shadow-neon-sm overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
                                <h2 className="text-2xl font-black mb-8">Summary</h2>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-400 font-bold uppercase tracking-wider">Subtotal</span>
                                        <span className="text-white font-bold">₹{totalPrice.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-400 font-bold uppercase tracking-wider">Shipping</span>
                                        <span className="text-emerald-500 font-black">COMPLIMENTARY</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-400 font-bold uppercase tracking-wider">GST (Included)</span>
                                        <span className="text-white font-bold">18%</span>
                                    </div>

                                    <div className="pt-6 border-t border-white/10">
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <p className="text-[10px] font-black text-purple-500 uppercase tracking-widest mb-1">Total Amount</p>
                                                <p className="text-4xl font-black gradient-text">₹{totalPrice.toLocaleString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    className="w-full btn-primary py-4 shadow-neon-lg font-black tracking-widest uppercase text-xs"
                                >
                                    Proceed to Checkout
                                </button>

                                <p className="text-[10px] text-center text-gray-500 mt-6 uppercase font-bold tracking-widest">
                                    Secure Transaction Powered by BuiltMyPC Pay
                                </p>
                            </GlassCard>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
