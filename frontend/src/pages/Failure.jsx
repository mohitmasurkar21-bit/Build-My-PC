import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Failure = () => {
    const navigate = useNavigate();

    return (
        <div className="pt-24 pb-20 px-4 flex flex-col items-center justify-center min-h-screen">
            <div className="fixed inset-0 -z-10 bg-[#030303]">
                <div className="absolute inset-0 bg-gradient-to-b from-red-900/5 to-transparent" />
            </div>

            <motion.div
                initial={{ scale: 0.85, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 100 }}
                className="max-w-lg w-full glass-card p-10 text-center"
            >
                {/* Animated X icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 120, delay: 0.2 }}
                    className="relative w-28 h-28 mx-auto mb-6"
                >
                    <div className="w-28 h-28 rounded-full bg-red-500/10 border-2 border-red-500/30 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center">
                            <svg className="w-10 h-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <motion.path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 0.5, delay: 0.5 }}
                                />
                            </svg>
                        </div>
                    </div>
                    <motion.div
                        className="absolute inset-0 rounded-full border-2 border-red-500/30"
                        animate={{ scale: [1, 1.4, 1.7], opacity: [0.4, 0.2, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                    />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="text-4xl font-black mb-3 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent"
                >
                    Payment Failed!
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="text-gray-400 mb-8"
                >
                    We couldn't process your payment. Your account has <strong className="text-white">not been charged</strong>. Please try again.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-4 mb-8 text-left space-y-2"
                >
                    <p className="text-sm font-bold text-orange-300 mb-2">Common Reasons:</p>
                    {[
                        'Insufficient funds in your account',
                        'Incorrect card details entered',
                        'Bank declined the transaction',
                        'Network timeout during payment',
                    ].map(reason => (
                        <div key={reason} className="flex items-start gap-2 text-sm text-gray-400">
                            <span className="text-orange-400 mt-0.5">›</span>
                            <span>{reason}</span>
                        </div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                    className="flex flex-col sm:flex-row gap-3 justify-center"
                >
                    <button
                        onClick={() => navigate('/payment')}
                        className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white px-8 py-3.5 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-red-500/20"
                    >
                        🔄 Retry Payment
                    </button>
                    <Link
                        to="/cart"
                        className="bg-white/5 hover:bg-white/10 text-white px-8 py-3.5 rounded-xl font-bold transition-all border border-white/10 text-center"
                    >
                        Back to Cart
                    </Link>
                </motion.div>

                <p className="mt-6 text-sm text-gray-500">
                    Need help?{' '}
                    <a href="mailto:support@buildmypc.com" className="text-blue-400 hover:text-blue-300 transition-colors">
                        Contact Support
                    </a>
                </p>
            </motion.div>
        </div>
    );
};

export default Failure;
