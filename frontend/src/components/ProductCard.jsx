import React, { useState } from 'react';
import { isProductRecommended } from '../utils/personaLogic';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const ProductCard = ({ product, onAdd, onRemove, isSelected, activePersona, compatibility }) => {
    const { addToCart } = useCart();
    const [showPreview, setShowPreview] = useState(false);
    const API_URL = 'http://localhost:5000';
    const isRecommended = isProductRecommended(product, activePersona);

    const imageUrl = product.image?.startsWith('/uploads') ? `${API_URL}${product.image}` : product.image;

    const isCompatible = compatibility?.compatible !== false;
    const warning = compatibility?.warning;
    const reason = compatibility?.reason;

    const handleDirectAddToCart = async (e) => {
        e.stopPropagation();
        try {
            await addToCart(product);
        } catch (error) {
            console.error('Failed to add individual product to cart:', error);
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`glass-card relative group transition-all duration-300 ${isSelected ? 'ring-2 ring-purple-500 shadow-neon-sm' : ''
                    } ${!isCompatible ? 'opacity-50 grayscale select-none pointer-events-none' : 'hover:scale-[1.02] shadow-xl'}`}
            >
                {/* Compatibility Warning Badge */}
                {!isCompatible && (
                    <div className="absolute inset-0 z-40 bg-black/60 rounded-xl flex items-center justify-center p-4 text-center">
                        <div className="bg-red-500/10 border border-red-500/50 backdrop-blur-md px-4 py-2 rounded-lg">
                            <p className="text-red-500 font-bold text-xs uppercase mb-1">Incompatible</p>
                            <p className="text-white text-[10px] leading-tight">{reason}</p>
                        </div>
                    </div>
                )}

                {/* Recommendation Badge */}
                {isRecommended && isCompatible && (
                    <div className="absolute -top-2 -right-2 z-10 bg-gradient-neon px-3 py-1 rounded-full text-[10px] font-bold text-white shadow-neon-sm animate-pulse">
                        RECOMMENDED
                    </div>
                )}

                {/* Product Image */}
                <div
                    className="relative h-48 mb-4 rounded-lg overflow-hidden bg-dark-hover cursor-zoom-in group"
                    onClick={() => isCompatible && setShowPreview(true)}
                >
                    <img
                        src={imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://placehold.co/300x200/1a1a1a/purple?text=BuildMyPC';
                        }}
                    />

                    {/* Hover Overlay */}
                    {isCompatible && (
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/30">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                </svg>
                            </div>
                        </div>
                    )}

                    {product.stock === 0 && (
                        <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                            <span className="text-red-500 font-bold">Out of Stock</span>
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="space-y-2">
                    <div className="flex justify-between items-start gap-2">
                        <h3 className="font-semibold text-lg text-white truncate flex-1">
                            {product.name}
                        </h3>
                        {warning && isCompatible && (
                            <span className="text-[10px] bg-yellow-500/20 text-yellow-500 border border-yellow-500/30 px-2 py-0.5 rounded italic whitespace-nowrap">
                                {warning}
                            </span>
                        )}
                    </div>

                    <div className="flex justify-between items-center text-sm">
                        <p className="text-gray-400 font-medium">
                            {product.brand}
                        </p>
                        {/* Dynamic Category Specific Badge */}
                        {(product.category === 'CPU' || product.category === 'Motherboard') && product.specs?.socket && (
                            <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded font-black tracking-tighter uppercase">
                                {product.specs.socket}
                            </span>
                        )}
                        {(product.category === 'PSU' || product.category === 'GPU') && product.specs?.wattage && (
                            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-black tracking-tighter uppercase">
                                {product.specs.wattage}W
                            </span>
                        )}
                    </div>

                    {/* Key Specs */}
                    <div className="text-xs text-gray-500 space-y-1">
                        {product.category === 'CPU' && product.specs?.cores && (
                            <p>Cores: {product.specs.cores} | Threads: {product.specs.threads}</p>
                        )}
                        {product.category === 'GPU' && product.specs?.vram && (
                            <p>VRAM: {product.specs.vram}GB DDR6X</p>
                        )}
                        {product.category === 'RAM' && product.specs?.capacity && (
                            <p>{product.specs.capacity}GB {product.specs.ramType} {product.specs.speed ? `@ ${product.specs.speed}MHz` : ''}</p>
                        )}
                        {product.category === 'Storage' && product.specs?.capacity && (
                            <p>{product.specs.capacity}GB {product.specs.storageType} {product.specs.speed ? `(${product.specs.speed}MB/s)` : ''}</p>
                        )}
                        {product.category === 'PSU' && product.specs?.efficiency && (
                            <p>{product.specs.efficiency} Efficiency Rating</p>
                        )}
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between pt-2">
                        <span className="text-2xl font-bold gradient-text">
                            ₹{product.price.toLocaleString()}
                        </span>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                            {/* Direct Add to Cart Button */}
                            {isCompatible && product.stock > 0 && (
                                <button
                                    onClick={handleDirectAddToCart}
                                    className="p-2 bg-white/5 hover:bg-white/10 text-purple-400 rounded-lg border border-white/5 transition-all"
                                    title="Add directly to cart"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </button>
                            )}

                            {isSelected ? (
                                <button
                                    onClick={() => onRemove(product)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-red-500/20"
                                >
                                    Remove
                                </button>
                            ) : (
                                <button
                                    onClick={() => onAdd(product)}
                                    disabled={product.stock === 0 || !isCompatible}
                                    className={`btn-primary py-2 px-4 text-sm transition-all ${!isCompatible ? 'opacity-0' : 'opacity-100 shadow-neon-sm'
                                        }`}
                                >
                                    Select
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Image Preview Modal */}
                {showPreview && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-in fade-in duration-300"
                        onClick={() => setShowPreview(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="relative max-w-5xl w-full flex flex-col items-center justify-center"
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                className="absolute -top-12 right-0 text-white hover:text-purple-400 transition-colors p-2"
                                onClick={() => setShowPreview(false)}
                            >
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <div className="w-full aspect-video glass-card !p-4 flex items-center justify-center bg-dark-bg/50 overflow-hidden rounded-2xl border-white/10 ring-1 ring-white/20">
                                <img
                                    src={imageUrl}
                                    alt={product.name}
                                    className="max-w-full max-h-full object-contain"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://placehold.co/800x600/1a1a1a/purple?text=BuildMyPC';
                                    }}
                                />
                            </div>

                            <div className="mt-6 text-center">
                                <h2 className="text-3xl font-bold text-white mb-2">{product.name}</h2>
                                <p className="text-purple-400 text-lg uppercase tracking-widest">{product.category} | {product.brand}</p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </motion.div>
        </AnimatePresence>
    );
};

export default ProductCard;
