import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { paymentAPI } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

// ─── Indian Banks List ────────────────────────────────────────────────────────
const BANKS = [
    { id: 'hdfc', name: 'HDFC Bank', logo: '🏦' },
    { id: 'icici', name: 'ICICI Bank', logo: '🏛️' },
    { id: 'sbi', name: 'State Bank of India (SBI)', logo: '🏧' },
    { id: 'axis', name: 'Axis Bank', logo: '🏪' },
    { id: 'kotak', name: 'Kotak Mahindra Bank', logo: '💼' },
    { id: 'bob', name: 'Bank of Baroda', logo: '🏦' },
    { id: 'pnb', name: 'Punjab National Bank', logo: '🏛️' },
    { id: 'canara', name: 'Canara Bank', logo: '🏧' },
    { id: 'union', name: 'Union Bank of India', logo: '🏪' },
    { id: 'yes', name: 'Yes Bank', logo: '💳' },
    { id: 'indusind', name: 'IndusInd Bank', logo: '💼' },
    { id: 'idbi', name: 'IDBI Bank', logo: '🏦' },
    { id: 'federal', name: 'Federal Bank', logo: '🏛️' },
    { id: 'rbl', name: 'RBL Bank', logo: '🏧' },
];

// ─── Card Type Detection ──────────────────────────────────────────────────────
const detectCardType = (number) => {
    const cleaned = number.replace(/\s/g, '');
    if (/^4/.test(cleaned)) return { type: 'visa', label: 'VISA', color: '#1a1f71', gradient: 'from-blue-900 to-blue-700' };
    if (/^5[1-5]/.test(cleaned) || /^2[2-7]/.test(cleaned)) return { type: 'mastercard', label: 'MasterCard', color: '#eb001b', gradient: 'from-red-900 to-orange-600' };
    if (/^6[0-9]/.test(cleaned)) return { type: 'rupay', label: 'RuPay', color: '#097c20', gradient: 'from-green-900 to-green-600' };
    if (/^3[47]/.test(cleaned)) return { type: 'amex', label: 'Amex', color: '#2e77bc', gradient: 'from-sky-900 to-sky-600' };
    return { type: 'unknown', label: '', color: '#1e293b', gradient: 'from-slate-900 to-slate-700' };
};

const formatCardNumber = (value) => {
    const cleaned = value.replace(/\D/g, '').substring(0, 16);
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ') : cleaned;
};

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const LockIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);
const ShieldIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
);
const ChevronIcon = ({ open }) => (
    <svg className={`w-4 h-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);

// ─── Coupon Codes ─────────────────────────────────────────────────────────────
const COUPONS = {
    'BUILDPC10': { discount: 10, type: 'percent', label: '10% OFF' },
    'SAVE500': { discount: 500, type: 'flat', label: '₹500 OFF' },
    'NEWUSER': { discount: 15, type: 'percent', label: '15% OFF' },
    'PC2024': { discount: 1000, type: 'flat', label: '₹1000 OFF' },
};

// ─── Animated Card Preview Component ─────────────────────────────────────────
const CardPreview = ({ cardData, focusCVV }) => {
    const { number, name, expiry, cvv } = cardData;
    const cardType = detectCardType(number);

    return (
        <div className="perspective-1000 w-full max-w-sm mx-auto mb-6">
            <motion.div
                className={`relative w-full h-48 rounded-2xl bg-gradient-to-br ${cardType.gradient} shadow-2xl text-white`}
                animate={{ rotateY: focusCVV ? 180 : 0 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 80 }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Front */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between" style={{ backfaceVisibility: 'hidden' }}>
                    <div className="flex justify-between items-start">
                        <div className="flex gap-1">
                            <div className="w-8 h-8 rounded-full bg-yellow-400/80 -mr-3" />
                            <div className="w-8 h-8 rounded-full bg-orange-500/80" />
                        </div>
                        {cardType.label && (
                            <span className="text-lg font-black tracking-widest font-mono">{cardType.label}</span>
                        )}
                    </div>
                    <div>
                        <div className="font-mono text-xl tracking-widest mb-3 drop-shadow">
                            {number || '•••• •••• •••• ••••'}
                        </div>
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-white/50 text-xs uppercase tracking-wider mb-0.5">Card Holder</p>
                                <p className="font-semibold tracking-wide uppercase text-sm truncate max-w-[160px]">
                                    {name || 'YOUR NAME'}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-white/50 text-xs uppercase tracking-wider mb-0.5">Expires</p>
                                <p className="font-semibold font-mono">{expiry || 'MM/YY'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Back */}
                <div
                    className="absolute inset-0 rounded-2xl flex flex-col justify-center"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                    <div className="w-full h-10 bg-black/50 mb-4" />
                    <div className="px-6 flex justify-end items-center">
                        <div className="bg-white/90 px-4 py-2 rounded text-black font-mono font-bold w-24 text-center">
                            {cvv ? '•'.repeat(cvv.length) : '•••'}
                        </div>
                        <span className="ml-2 text-xs text-white/60">CVV</span>
                    </div>
                </div>

                {/* Shimmer overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
            </motion.div>
        </div>
    );
};

// ─── OTP Modal ────────────────────────────────────────────────────────────────
const OTPModal = ({ onVerify, onClose, phone }) => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(30);
    const [resendable, setResendable] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const inputs = useRef([]);

    useEffect(() => {
        if (timer > 0) {
            const t = setTimeout(() => setTimer(t => t - 1), 1000);
            return () => clearTimeout(t);
        } else {
            setResendable(true);
        }
    }, [timer]);

    const handleChange = (i, val) => {
        if (!/^\d?$/.test(val)) return;
        const newOtp = [...otp];
        newOtp[i] = val;
        setOtp(newOtp);
        if (val && i < 5) inputs.current[i + 1]?.focus();
    };

    const handleKeyDown = (i, e) => {
        if (e.key === 'Backspace' && !otp[i] && i > 0) {
            inputs.current[i - 1]?.focus();
        }
    };

    const handleVerify = async () => {
        const code = otp.join('');
        if (code.length < 6) { toast.error('Please enter 6-digit OTP'); return; }
        setVerifying(true);
        // Simulate OTP verification (accept any 6-digit code)
        await new Promise(r => setTimeout(r, 1500));
        setVerifying(false);
        onVerify();
    };

    const handleResend = () => {
        setTimer(30);
        setResendable(false);
        setOtp(['', '', '', '', '', '']);
        toast.success('OTP resent!');
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md px-4"
        >
            <motion.div
                initial={{ scale: 0.85, opacity: 0, y: 40 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 120 }}
                className="bg-[#0e0e0e] border border-white/10 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl"
            >
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold mb-1">OTP Verification</h3>
                <p className="text-gray-400 text-sm mb-6">
                    A 6-digit OTP has been sent to<br />
                    <span className="text-white font-bold">+91 ••••••{phone?.slice(-4) || '0000'}</span>
                </p>

                <div className="flex gap-2 justify-center mb-6">
                    {otp.map((digit, i) => (
                        <input
                            key={i}
                            ref={el => inputs.current[i] = el}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={e => handleChange(i, e.target.value)}
                            onKeyDown={e => handleKeyDown(i, e)}
                            className="w-11 h-12 text-center text-xl font-bold bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
                        />
                    ))}
                </div>

                <button
                    onClick={handleVerify}
                    disabled={verifying}
                    className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-60 transition-all flex items-center justify-center gap-2 mb-4"
                >
                    {verifying ? (
                        <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Verifying...</>
                    ) : 'Verify & Pay'}
                </button>

                <div className="text-sm text-gray-400">
                    {resendable ? (
                        <button onClick={handleResend} className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                            Resend OTP
                        </button>
                    ) : (
                        <>Resend OTP in <span className="text-white font-bold">{timer}s</span></>
                    )}
                </div>

                <button onClick={onClose} className="mt-4 text-xs text-gray-500 hover:text-gray-300 transition-colors">
                    Cancel
                </button>
            </motion.div>
        </motion.div>
    );
};

// ─── Processing Modal ─────────────────────────────────────────────────────────
const ProcessingModal = ({ message }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
    >
        <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="bg-[#0e0e0e] border border-white/10 rounded-3xl p-10 text-center max-w-xs shadow-2xl"
        >
            <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full border-4 border-blue-500/20" />
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 animate-spin" />
                <div className="absolute inset-3 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <LockIcon />
                </div>
            </div>
            <h3 className="text-lg font-bold mb-2">Processing Payment</h3>
            <p className="text-gray-400 text-sm">{message || 'Please wait, do not refresh...'}</p>
            <div className="mt-4 flex gap-1 justify-center">
                {[0, 1, 2].map(i => (
                    <div key={i} className="w-2 h-2 rounded-full bg-blue-500" style={{ animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                ))}
            </div>
        </motion.div>
    </motion.div>
);

// ─── Main Payment Component ───────────────────────────────────────────────────
const Payment = () => {
    const navigate = useNavigate();
    const { cart, clearCart } = useCart();
    const { user } = useAuth();

    const [loading, setLoading] = useState(false);
    const [processingMsg, setProcessingMsg] = useState('');
    const [showOTP, setShowOTP] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('Card');
    const [couponCode, setCouponCode] = useState('');
    const [couponApplied, setCouponApplied] = useState(null);
    const [couponError, setCouponError] = useState('');
    const [bankSearch, setBankSearch] = useState('');
    const [selectedBank, setSelectedBank] = useState(null);
    const [bankDropdownOpen, setBankDropdownOpen] = useState(false);
    const [bankLoading, setBankLoading] = useState(false);
    const [focusCVV, setFocusCVV] = useState(false);
    const [cardErrors, setCardErrors] = useState({});

    const [formData, setFormData] = useState({
        fullName: user?.username || '',
        email: user?.email || '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
    });

    const [cardData, setCardData] = useState({
        number: '',
        name: '',
        expiry: '',
        cvv: '',
    });

    // Calculations
    const subtotal = cart?.totalPrice || 0;
    const gst = subtotal * 0.18;
    const deliveryCharges = subtotal > 50000 ? 0 : 500;
    const couponDiscount = couponApplied
        ? couponApplied.type === 'percent'
            ? Math.round(subtotal * couponApplied.discount / 100)
            : couponApplied.discount
        : 0;
    const totalAmount = subtotal + gst + deliveryCharges - couponDiscount;

    const filteredBanks = BANKS.filter(b => b.name.toLowerCase().includes(bankSearch.toLowerCase()));

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCardChange = (e) => {
        let { name, value } = e.target;
        if (name === 'number') value = formatCardNumber(value);
        if (name === 'expiry') {
            value = value.replace(/\D/g, '').substring(0, 4);
            if (value.length >= 3) value = value.substring(0, 2) + '/' + value.substring(2);
        }
        if (name === 'cvv') value = value.replace(/\D/g, '').substring(0, 4);
        setCardData({ ...cardData, [name]: value });
        if (cardErrors[name]) setCardErrors({ ...cardErrors, [name]: '' });
    };

    const validateCard = () => {
        const errors = {};
        const num = cardData.number.replace(/\s/g, '');
        if (num.length < 16) errors.number = 'Card number must be 16 digits';
        if (!/^\d{2}\/\d{2}$/.test(cardData.expiry)) errors.expiry = 'Enter valid expiry (MM/YY)';
        else {
            const [mm, yy] = cardData.expiry.split('/');
            const now = new Date();
            const cardDate = new Date(2000 + parseInt(yy), parseInt(mm) - 1);
            if (cardDate < now) errors.expiry = 'Card has expired';
        }
        if (cardData.cvv.length < 3) errors.cvv = 'Enter valid CVV';
        if (!cardData.name.trim()) errors.name = 'Card holder name required';
        setCardErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const applyCoupon = () => {
        const code = couponCode.toUpperCase().trim();
        if (COUPONS[code]) {
            setCouponApplied(COUPONS[code]);
            setCouponError('');
            toast.success(`Coupon applied! ${COUPONS[code].label}`);
        } else {
            setCouponApplied(null);
            setCouponError('Invalid coupon code');
        }
    };

    const removeCoupon = () => {
        setCouponApplied(null);
        setCouponCode('');
        setCouponError('');
    };

    const handleNetBankingProceed = async () => {
        if (!selectedBank) { toast.error('Please select a bank'); return; }
        if (!formData.phone || !formData.address || !formData.city || !formData.pincode) {
            toast.error('Please fill all shipping details'); return;
        }
        setBankLoading(true);
        setProcessingMsg(`Redirecting to ${selectedBank.name}...`);
        setLoading(true);
        await new Promise(r => setTimeout(r, 2500));
        setBankLoading(false);
        // Simulate bank redirect + OTP
        setLoading(false);
        setShowOTP(true);
    };

    const handleCardPay = async () => {
        if (!validateCard()) return;
        if (!formData.phone || !formData.address || !formData.city || !formData.pincode) {
            toast.error('Please fill all shipping details'); return;
        }
        setShowOTP(true);
    };

    const handleCODOrder = async () => {
        if (!formData.phone || !formData.address || !formData.city || !formData.pincode) {
            toast.error('Please fill all shipping details'); return;
        }
        setLoading(true);
        setProcessingMsg('Placing your order...');
        try {
            const orderItems = cart.items.map(item => ({
                product: item.product.id,
                quantity: item.quantity,
                price: item.product.price,
            }));
            const orderData = {
                userId: user.id,
                items: orderItems,
                subtotal,
                gst,
                deliveryCharges,
                totalAmount,
                shippingAddress: formData,
                paymentMethod: 'COD',
            };
            const response = await paymentAPI.createOrder(orderData);
            await clearCart();
            toast.success('Order placed successfully!');
            navigate('/success', { state: { order: response.data.order } });
        } catch (err) {
            toast.error(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
            setProcessingMsg('');
        }
    };

    const handleOTPVerified = async () => {
        setShowOTP(false);
        setLoading(true);
        setProcessingMsg('Verifying payment & securing order...');
        try {
            await new Promise(r => setTimeout(r, 2000));
            const orderItems = cart.items.map(item => ({
                product: item.product.id,
                quantity: item.quantity,
                price: item.product.price,
            }));
            const orderData = {
                userId: user.id,
                items: orderItems,
                subtotal,
                gst,
                deliveryCharges,
                totalAmount,
                shippingAddress: formData,
                paymentMethod,
            };
            const response = await paymentAPI.createOrder(orderData);
            await clearCart();
            toast.success('Payment Successful! 🎉');
            navigate('/success', { state: { order: response.data.order } });
        } catch (err) {
            toast.error(err.response?.data?.message || 'Payment failed');
            navigate('/failure');
        } finally {
            setLoading(false);
            setProcessingMsg('');
        }
    };

    if (!cart?.items?.length) {
        return (
            <div className="pt-32 pb-20 px-4 text-center">
                <div className="text-6xl mb-4">🛒</div>
                <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
                <p className="text-gray-400 mb-8">Add some PC components to proceed to payment</p>
                <button onClick={() => navigate('/build')} className="btn-primary">
                    Start Building
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20 pb-16 px-4 md:px-6">
            {/* Background */}
            <div className="fixed inset-0 -z-10 bg-[#030303]">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl" />
            </div>

            <AnimatePresence>
                {loading && <ProcessingModal message={processingMsg} />}
                {showOTP && (
                    <OTPModal
                        phone={formData.phone}
                        onVerify={handleOTPVerified}
                        onClose={() => setShowOTP(false)}
                    />
                )}
            </AnimatePresence>

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <LockIcon />
                        </div>
                        <h1 className="text-2xl md:text-3xl font-black gradient-text">Secure Checkout</h1>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1.5 bg-green-500/10 text-green-400 px-3 py-1.5 rounded-full border border-green-500/20">
                            <ShieldIcon /> 256-bit SSL Encrypted
                        </span>
                        <span className="flex items-center gap-1.5 bg-blue-500/10 text-blue-400 px-3 py-1.5 rounded-full border border-blue-500/20">
                            <LockIcon /> 100% Secure Payments
                        </span>
                        <span className="flex items-center gap-1.5 bg-purple-500/10 text-purple-400 px-3 py-1.5 rounded-full border border-purple-500/20">
                            🔐 No Card Details Stored
                        </span>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* ── Left: Payment Forms ─────────────────────────────────────── */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Shipping Details */}
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="glass-card">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-sm">📦</div>
                                <h2 className="text-lg font-bold">Shipping Details</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { name: 'fullName', label: 'Full Name', placeholder: 'John Doe', type: 'text', col: 1 },
                                    { name: 'email', label: 'Email Address', placeholder: 'john@example.com', type: 'email', col: 1 },
                                    { name: 'phone', label: 'Mobile Number', placeholder: '+91 XXXXX XXXXX', type: 'tel', col: 1 },
                                ].map(({ name, label, placeholder, type, col }) => (
                                    <div key={name} className={`space-y-1 ${col === 2 ? 'md:col-span-2' : ''}`}>
                                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</label>
                                        <input
                                            type={type}
                                            name={name}
                                            value={formData[name]}
                                            onChange={handleInputChange}
                                            placeholder={placeholder}
                                            className="input-field w-full"
                                            required
                                        />
                                    </div>
                                ))}
                                <div className="space-y-1 md:col-span-2">
                                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Address</label>
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="Flat No, Building, Street, Area"
                                        className="input-field w-full min-h-[80px] resize-none"
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">City</label>
                                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="Mumbai" className="input-field w-full" required />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">State</label>
                                    <select name="state" value={formData.state} onChange={handleInputChange} className="input-field w-full bg-[#111]" required>
                                        <option value="">Select State</option>
                                        {['Andhra Pradesh', 'Delhi', 'Gujarat', 'Haryana', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal'].map(s => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Pincode</label>
                                    <input type="text" name="pincode" value={formData.pincode} onChange={e => { if (/^\d{0,6}$/.test(e.target.value)) handleInputChange(e); }} placeholder="400001" className="input-field w-full" required />
                                </div>
                            </div>
                        </motion.div>

                        {/* Payment Method Selector */}
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="glass-card">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-sm">💳</div>
                                <h2 className="text-lg font-bold">Payment Method</h2>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                                {[
                                    { id: 'Card', label: 'Card', icon: '💳', desc: 'Visa, MC, RuPay' },
                                    { id: 'NetBanking', label: 'Net Banking', icon: '🏦', desc: 'All major banks' },
                                    { id: 'UPI', label: 'UPI', icon: '📱', desc: 'GPay, PhonePe+' },
                                    { id: 'COD', label: 'Cash on Delivery', icon: '💵', desc: 'Pay on arrival' },
                                ].map((method) => (
                                    <button
                                        key={method.id}
                                        onClick={() => setPaymentMethod(method.id)}
                                        className={`relative p-3 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-1.5 group ${paymentMethod === method.id
                                                ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/10'
                                                : 'border-white/5 bg-white/3 hover:border-white/20 hover:bg-white/5'
                                            }`}
                                    >
                                        {paymentMethod === method.id && (
                                            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </span>
                                        )}
                                        <span className="text-2xl">{method.icon}</span>
                                        <span className="text-xs font-bold text-center leading-tight">{method.label}</span>
                                        <span className="text-[10px] text-gray-500 text-center hidden md:block">{method.desc}</span>
                                    </button>
                                ))}
                            </div>

                            <AnimatePresence mode="wait">
                                {/* Card Payment */}
                                {paymentMethod === 'Card' && (
                                    <motion.div key="card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                                        <CardPreview cardData={cardData} focusCVV={focusCVV} />
                                        <div className="space-y-4">
                                            <div>
                                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Card Number</label>
                                                <div className="relative mt-1">
                                                    <input
                                                        type="text"
                                                        name="number"
                                                        value={cardData.number}
                                                        onChange={handleCardChange}
                                                        placeholder="1234 5678 9012 3456"
                                                        maxLength={19}
                                                        className={`input-field w-full pr-20 font-mono tracking-widest ${cardErrors.number ? 'border-red-500 focus:ring-red-500/50' : ''}`}
                                                    />
                                                    {cardData.number && (
                                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold px-2 py-0.5 rounded bg-white/10">
                                                            {detectCardType(cardData.number).label || '?'}
                                                        </span>
                                                    )}
                                                </div>
                                                {cardErrors.number && <p className="text-red-400 text-xs mt-1">{cardErrors.number}</p>}
                                            </div>
                                            <div>
                                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Card Holder Name</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={cardData.name}
                                                    onChange={handleCardChange}
                                                    placeholder="Name as on card"
                                                    className={`input-field w-full mt-1 uppercase ${cardErrors.name ? 'border-red-500' : ''}`}
                                                />
                                                {cardErrors.name && <p className="text-red-400 text-xs mt-1">{cardErrors.name}</p>}
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Expiry Date</label>
                                                    <input
                                                        type="text"
                                                        name="expiry"
                                                        value={cardData.expiry}
                                                        onChange={handleCardChange}
                                                        placeholder="MM/YY"
                                                        maxLength={5}
                                                        className={`input-field w-full mt-1 font-mono tracking-widest ${cardErrors.expiry ? 'border-red-500' : ''}`}
                                                    />
                                                    {cardErrors.expiry && <p className="text-red-400 text-xs mt-1">{cardErrors.expiry}</p>}
                                                </div>
                                                <div>
                                                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">CVV</label>
                                                    <input
                                                        type="password"
                                                        name="cvv"
                                                        value={cardData.cvv}
                                                        onChange={handleCardChange}
                                                        onFocus={() => setFocusCVV(true)}
                                                        onBlur={() => setFocusCVV(false)}
                                                        placeholder="•••"
                                                        maxLength={4}
                                                        className={`input-field w-full mt-1 font-mono tracking-widest ${cardErrors.cvv ? 'border-red-500' : ''}`}
                                                    />
                                                    {cardErrors.cvv && <p className="text-red-400 text-xs mt-1">{cardErrors.cvv}</p>}
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleCardPay}
                                            className="w-full mt-6 py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
                                        >
                                            <LockIcon />
                                            Pay ₹{Math.round(totalAmount).toLocaleString()}
                                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </button>
                                    </motion.div>
                                )}

                                {/* Net Banking */}
                                {paymentMethod === 'NetBanking' && (
                                    <motion.div key="netbanking" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                                        <div className="mb-4">
                                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Select Your Bank</label>
                                            <div className="relative">
                                                <button
                                                    onClick={() => setBankDropdownOpen(!bankDropdownOpen)}
                                                    className="w-full input-field flex items-center justify-between text-left"
                                                >
                                                    {selectedBank ? (
                                                        <span className="flex items-center gap-2">
                                                            <span>{selectedBank.logo}</span>
                                                            <span className="font-semibold">{selectedBank.name}</span>
                                                        </span>
                                                    ) : (
                                                        <span className="text-gray-500">Choose your bank...</span>
                                                    )}
                                                    <ChevronIcon open={bankDropdownOpen} />
                                                </button>
                                                <AnimatePresence>
                                                    {bankDropdownOpen && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: -10, scale: 0.97 }}
                                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                                            exit={{ opacity: 0, y: -10, scale: 0.97 }}
                                                            className="absolute z-20 w-full mt-2 bg-[#111] border border-white/10 rounded-xl shadow-2xl overflow-hidden"
                                                        >
                                                            <div className="p-2 border-b border-white/5">
                                                                <input
                                                                    type="text"
                                                                    placeholder="🔍 Search banks..."
                                                                    value={bankSearch}
                                                                    onChange={e => setBankSearch(e.target.value)}
                                                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                                                                    autoFocus
                                                                />
                                                            </div>
                                                            <div className="max-h-52 overflow-y-auto custom-scrollbar">
                                                                {filteredBanks.length === 0 ? (
                                                                    <p className="text-center text-gray-500 py-4 text-sm">No banks found</p>
                                                                ) : filteredBanks.map(bank => (
                                                                    <button
                                                                        key={bank.id}
                                                                        onClick={() => { setSelectedBank(bank); setBankDropdownOpen(false); setBankSearch(''); }}
                                                                        className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/5 transition-colors ${selectedBank?.id === bank.id ? 'bg-blue-500/10 text-blue-400' : ''}`}
                                                                    >
                                                                        <span className="text-lg">{bank.logo}</span>
                                                                        <span className="text-sm font-medium">{bank.name}</span>
                                                                        {selectedBank?.id === bank.id && (
                                                                            <span className="ml-auto text-blue-400">✓</span>
                                                                        )}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </div>

                                        {selectedBank && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4 mb-4"
                                            >
                                                <p className="text-sm text-gray-400">
                                                    You will be securely redirected to <strong className="text-white">{selectedBank.name}</strong>'s
                                                    internet banking portal to complete the payment.
                                                </p>
                                                <div className="flex items-center gap-2 mt-2 text-green-400 text-xs">
                                                    <ShieldIcon /> <span>End-to-end encrypted transfer</span>
                                                </div>
                                            </motion.div>
                                        )}

                                        <button
                                            onClick={handleNetBankingProceed}
                                            disabled={bankLoading}
                                            className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                                        >
                                            <LockIcon />
                                            {bankLoading ? (
                                                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Redirecting to Bank...</>
                                            ) : `Proceed to ${selectedBank?.name || 'Bank'}`}
                                        </button>
                                    </motion.div>
                                )}

                                {/* UPI */}
                                {paymentMethod === 'UPI' && (
                                    <motion.div key="upi" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                                        <div className="flex flex-col items-center p-6 bg-white/3 rounded-2xl border border-white/10">
                                            <div className="p-4 bg-white rounded-2xl mb-4 shadow-xl hover:scale-105 transition-transform duration-300">
                                                <img
                                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=buildmypc@okaxis&pn=Build%20My%20PC&am=${Math.round(totalAmount)}&cu=INR`}
                                                    alt="UPI QR Code"
                                                    className="w-44 h-44 object-contain"
                                                />
                                            </div>
                                            <p className="font-bold text-lg">Build My PC</p>
                                            <p className="text-gray-400 text-sm font-mono bg-black/40 px-3 py-1 rounded-lg mt-1">buildmypc@okaxis</p>
                                            <p className="text-blue-400 text-xs mt-3 animate-pulse">📱 Scan with any UPI app</p>
                                            <div className="flex gap-3 mt-4 text-xs text-gray-500">
                                                {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map(app => (
                                                    <span key={app} className="bg-white/5 px-2 py-1 rounded-lg">{app}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setShowOTP(true)}
                                            className="w-full mt-4 py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                        >
                                            <LockIcon /> I've Paid — Verify
                                        </button>
                                    </motion.div>
                                )}

                                {/* COD */}
                                {paymentMethod === 'COD' && (
                                    <motion.div key="cod" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                                        <div className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-5 mb-4">
                                            <div className="flex items-start gap-3">
                                                <span className="text-2xl">💵</span>
                                                <div>
                                                    <p className="font-semibold text-orange-300 mb-1">Cash on Delivery</p>
                                                    <p className="text-sm text-gray-400">Pay ₹{Math.round(totalAmount).toLocaleString()} in cash when your order arrives. Our delivery partner will carry a receipt for you.</p>
                                                    <p className="text-xs text-orange-400 mt-2">⚠️ Handling charges of ₹50 may apply for COD orders.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleCODOrder}
                                            className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white shadow-lg shadow-orange-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                        >
                                            📦 Place Order (COD)
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* Security Footer */}
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex flex-wrap gap-3 justify-center text-xs text-gray-500">
                            <span className="flex items-center gap-1">🔒 PCI DSS Compliant</span>
                            <span className="flex items-center gap-1">🛡️ RBI Compliant</span>
                            <span className="flex items-center gap-1">✅ 3D Secure Enabled</span>
                            <span className="flex items-center gap-1">💳 Encrypted Payments</span>
                        </motion.div>
                    </div>

                    {/* ── Right: Order Summary ────────────────────────────────────── */}
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="lg:col-span-1">
                        <div className="glass-card sticky top-24">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-xs">🛍️</div>
                                <h2 className="text-lg font-bold">Order Summary</h2>
                            </div>

                            {/* Items */}
                            <div className="space-y-3 mb-4 max-h-[320px] overflow-y-auto pr-1 custom-scrollbar">
                                {cart.items.map((item) => (
                                    <div key={item.product.id} className="flex gap-3 p-2 rounded-xl bg-white/3 hover:bg-white/5 transition-colors">
                                        <div className="w-14 h-14 rounded-lg bg-white/5 p-1.5 shrink-0 border border-white/5">
                                            <img
                                                src={item.product.image?.includes('http') ? item.product.image : `http://localhost:5000${item.product.image}`}
                                                alt={item.product.name}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold truncate">{item.product.name}</p>
                                            <p className="text-xs text-gray-500 mb-0.5">Qty: {item.quantity}</p>
                                            <p className="text-blue-400 font-bold text-sm">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Coupon */}
                            <div className="pt-3 border-t border-white/5 mb-3">
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Promo Code</label>
                                <div className="flex gap-2 mt-1">
                                    <input
                                        type="text"
                                        placeholder="BUILDPC10"
                                        value={couponCode}
                                        onChange={(e) => { setCouponCode(e.target.value); setCouponError(''); }}
                                        disabled={!!couponApplied}
                                        className="flex-1 input-field py-2 text-sm disabled:opacity-50"
                                    />
                                    {couponApplied ? (
                                        <button onClick={removeCoupon} className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-3 rounded-xl text-sm font-semibold transition-colors">
                                            ✕
                                        </button>
                                    ) : (
                                        <button onClick={applyCoupon} className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-3 rounded-xl text-sm font-semibold transition-colors">
                                            Apply
                                        </button>
                                    )}
                                </div>
                                {couponError && <p className="text-red-400 text-xs mt-1">{couponError}</p>}
                                {couponApplied && (
                                    <p className="text-green-400 text-xs mt-1 flex items-center gap-1">
                                        ✅ {couponApplied.label} applied!
                                    </p>
                                )}
                            </div>

                            {/* Price Breakdown */}
                            <div className="space-y-2.5 pt-3 border-t border-white/5">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Subtotal ({cart.items.length} items)</span>
                                    <span>₹{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">GST (18%)</span>
                                    <span>₹{Math.round(gst).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Delivery</span>
                                    <span className={deliveryCharges === 0 ? 'text-green-400 font-semibold' : ''}>
                                        {deliveryCharges === 0 ? '🎉 FREE' : `₹${deliveryCharges}`}
                                    </span>
                                </div>
                                {couponApplied && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-green-400">Coupon Discount</span>
                                        <span className="text-green-400 font-semibold">−₹{couponDiscount.toLocaleString()}</span>
                                    </div>
                                )}
                                {deliveryCharges === 0 && (
                                    <p className="text-xs text-green-400/70">Free delivery on orders above ₹50,000!</p>
                                )}
                            </div>

                            <div className="flex justify-between items-center pt-4 mt-2 border-t border-white/10">
                                <span className="text-base font-black">Grand Total</span>
                                <div className="text-right">
                                    <p className="text-2xl font-black text-blue-400">₹{Math.round(totalAmount).toLocaleString()}</p>
                                    <p className="text-xs text-gray-500">Incl. all taxes</p>
                                </div>
                            </div>

                            {/* Trust badges */}
                            <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-3 gap-2 text-center">
                                {[
                                    { icon: '🔒', label: 'SSL Secure' },
                                    { icon: '↩️', label: 'Easy Returns' },
                                    { icon: '📞', label: '24/7 Support' },
                                ].map(b => (
                                    <div key={b.label} className="bg-white/3 rounded-lg p-2">
                                        <div className="text-lg mb-0.5">{b.icon}</div>
                                        <div className="text-[10px] text-gray-500">{b.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(-6px); opacity: 1; }
        }
        .perspective-1000 { perspective: 1000px; }
      `}</style>
        </div>
    );
};

export default Payment;
