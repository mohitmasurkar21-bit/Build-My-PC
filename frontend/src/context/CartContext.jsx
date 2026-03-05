import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { cartAPI } from '../services/api';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const { user, isAuthenticated } = useAuth();
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(false);
    const [itemCount, setItemCount] = useState(0);

    const updateLocalCart = (cartData) => {
        try {
            const data = cartData || { items: [], totalPrice: 0 };
            setCart(data);
            const count = data.items?.reduce((total, item) => {
                const qty = Number(item.quantity) || 0;
                // Return total if product is missing, but log it
                if (!item.product) {
                    console.warn('Cart item missing product data:', item);
                    return total + qty;
                }
                return total + qty;
            }, 0) || 0;
            setItemCount(count);
            console.log('Cart updated locally. Item count:', count);
        } catch (error) {
            console.error('Error updating local cart state:', error);
        }
    };

    const fetchCart = useCallback(async () => {
        if (!isAuthenticated || !user) {
            setCart(null);
            setItemCount(0);
            return;
        }

        try {
            setLoading(true);
            const response = await cartAPI.get(user.id);
            if (response.data?.success) {
                updateLocalCart(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
            // Don't clear cart on transient network errors if we have local state
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated, user]);

    // Re-fetch cart when authentication status changes
    useEffect(() => {
        if (isAuthenticated) {
            fetchCart();
        } else {
            setCart(null);
            setItemCount(0);
        }
    }, [isAuthenticated, fetchCart]);

    const addToCart = async (productData) => {
        if (!isAuthenticated || !user) {
            toast.error('Your session may have expired. Please login again.');
            return null;
        }

        try {
            setLoading(true);

            // Standardize payload construction
            const payload = {
                userId: user.id,
                quantity: Number(productData.quantity) || 1
            };

            if (productData.productIds && Array.isArray(productData.productIds)) {
                payload.productIds = productData.productIds;
            } else {
                // Handle different ID naming conventions
                const productId = productData.id || productData._id || productData.productId;
                if (!productId) {
                    throw new Error('Missing Product ID');
                }
                payload.productId = productId;
            }

            console.log('Sending AddToCart request:', payload);
            const response = await cartAPI.add(payload);

            if (response.data && response.data.success) {
                const updatedCart = response.data.data;
                updateLocalCart(updatedCart);
                toast.success(response.data.message || 'Item added to cart!');
                return updatedCart;
            } else {
                const errorMsg = response.data?.error || 'Failed to add item to cart';
                throw new Error(errorMsg);
            }
        } catch (error) {
            console.error('AddToCart Operation Failed:', error);

            // Special handling for auth errors
            if (error.response?.status === 401) {
                toast.error('Session expired. Redirecting to login...');
                // Optional: trigger logout/redirect
            } else {
                const message = error.response?.data?.error || error.message || 'Error connecting to cart service';
                toast.error(message);
            }
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = async (productId, quantity) => {
        if (!user) return;
        try {
            const response = await cartAPI.update(
                user.id,
                productId,
                Number(quantity)
            );
            if (response.data.success) {
                updateLocalCart(response.data.data);
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
            toast.error('Failed to update quantity');
        }
    };

    const removeFromCart = async (productId) => {
        if (!isAuthenticated || !user) return;
        try {
            const response = await cartAPI.remove(user.id, productId);
            // Update state DIRECTLY from response
            if (response.data.data) {
                updateLocalCart(response.data.data);
            } else {
                await fetchCart();
            }
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };

    const clearCart = async () => {
        if (!isAuthenticated || !user) return;
        try {
            await cartAPI.clear(user.id);
            updateLocalCart(null);
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    };

    const value = useMemo(() => ({
        cart,
        loading,
        itemCount,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        fetchCart
    }), [cart, loading, itemCount, addToCart, updateQuantity, removeFromCart, clearCart, fetchCart]);

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
