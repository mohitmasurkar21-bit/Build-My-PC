import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const { itemCount } = useCart();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="glass sticky top-0 z-50 border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gradient-neon rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">PC</span>
                        </div>
                        <span className="text-xl font-bold gradient-text hidden sm:block">
                            Build My PC
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                            Home
                        </Link>
                        <Link to="/build" className="text-gray-300 hover:text-white transition-colors">
                            Build PC
                        </Link>
                        {isAuthenticated && (
                            <Link to="/my-builds" className="text-gray-300 hover:text-white transition-colors">
                                My Builds
                            </Link>
                        )}
                        <Link to="/cart" className="text-gray-300 hover:text-white transition-colors relative">
                            Cart
                            {itemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {itemCount}
                                </span>
                            )}
                        </Link>

                        {isAuthenticated ? (
                            <>
                                {user?.isAdmin && (
                                    <Link to="/admin" className="text-gray-300 hover:text-white transition-colors">
                                        Admin
                                    </Link>
                                )}
                                <div className="flex items-center space-x-4">
                                    <span className="text-sm text-gray-400">
                                        Welcome, {user?.username}
                                    </span>
                                    <button
                                        onClick={handleLogout}
                                        className="btn-secondary py-2 px-4 text-sm"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <Link to="/auth" className="btn-primary py-2 px-6 text-sm">
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden text-white p-2"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 space-y-4 animate-fade-in">
                        <Link to="/" className="block text-gray-300 hover:text-white transition-colors">
                            Home
                        </Link>
                        <Link to="/build" className="block text-gray-300 hover:text-white transition-colors">
                            Build PC
                        </Link>
                        <Link to="/cart" className="flex items-center justify-between text-gray-300 hover:text-white transition-colors">
                            <span>Cart</span>
                            {itemCount > 0 && (
                                <span className="bg-purple-500 text-white text-xs rounded-full px-2 py-0.5">
                                    {itemCount}
                                </span>
                            )}
                        </Link>
                        {isAuthenticated ? (
                            <>
                                {user?.isAdmin && (
                                    <Link to="/admin" className="block text-gray-300 hover:text-white transition-colors">
                                        Admin
                                    </Link>
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left text-gray-300 hover:text-white transition-colors"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link to="/auth" className="block text-gray-300 hover:text-white transition-colors">
                                Login
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
