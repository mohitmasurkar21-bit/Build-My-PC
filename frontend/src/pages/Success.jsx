import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import toast from 'react-hot-toast';

// ─── Confetti Particle ────────────────────────────────────────────────────────
const ConfettiParticle = ({ index }) => {
    const colors = ['#3b82f6', '#a855f7', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];
    const color = colors[index % colors.length];
    const size = Math.random() * 8 + 5;
    const x = Math.random() * 100;
    const delay = Math.random() * 1.5;
    const duration = Math.random() * 2 + 2;

    return (
        <motion.div
            className="absolute top-0 rounded-sm pointer-events-none"
            style={{ left: `${x}%`, width: size, height: size * 0.6, backgroundColor: color, borderRadius: 2 }}
            initial={{ y: -20, opacity: 1, rotate: 0 }}
            animate={{
                y: '110vh',
                opacity: [1, 1, 0],
                rotate: [0, 180, 360],
                x: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 200],
            }}
            transition={{ duration, delay, ease: 'linear' }}
        />
    );
};

// ─── Animated Checkmark ───────────────────────────────────────────────────────
const AnimatedCheck = () => (
    <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 120, delay: 0.3 }}
        className="relative"
    >
        <div className="w-28 h-28 rounded-full bg-green-500/10 border-2 border-green-500/30 flex items-center justify-center mx-auto mb-6">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.5 }}
                className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center"
            >
                <svg
                    className="w-10 h-10 text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                >
                    <motion.path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                    />
                </svg>
            </motion.div>
        </div>
        {/* Pulsing ring */}
        <motion.div
            className="absolute inset-0 rounded-full border-2 border-green-500/30"
            animate={{ scale: [1, 1.5, 1.8], opacity: [0.5, 0.2, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
        />
    </motion.div>
);

const Success = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [order, setOrder] = useState(location.state?.order || null);
    const orderId = location.state?.orderId;
    const [showConfetti, setShowConfetti] = useState(true);

    useEffect(() => {
        if (!order && !orderId) {
            navigate('/');
        }
        const t = setTimeout(() => setShowConfetti(false), 4000);
        return () => clearTimeout(t);
    }, [order, orderId, navigate]);

    const downloadInvoice = () => {
        const doc = new jsPDF();

        // Header gradient simulation
        doc.setFillColor(15, 23, 42);
        doc.rect(0, 0, 210, 45, 'F');
        doc.setFillColor(37, 99, 235);
        doc.rect(0, 40, 210, 3, 'F');

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(22);
        doc.setFont(undefined, 'bold');
        doc.text('BUILD MY PC', 20, 20);
        doc.setFontSize(11);
        doc.setFont(undefined, 'normal');
        doc.text('Premium PC Building Platform', 20, 28);
        doc.text('India\'s #1 Custom PC Store', 20, 35);

        // Right side company info
        doc.setFontSize(9);
        doc.setTextColor(180, 180, 180);
        doc.text('Build My PC Tech Solutions', 140, 18);
        doc.text('Mumbai, Maharashtra, India', 140, 24);
        doc.text('support@buildmypc.com', 140, 30);
        doc.text('+91 99999 00000', 140, 36);

        // Invoice badge
        doc.setFillColor(37, 99, 235);
        doc.roundedRect(155, 2, 45, 12, 2, 2, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.text('TAX INVOICE', 158, 10);

        // Order info box
        doc.setDrawColor(220, 220, 220);
        doc.setFillColor(248, 250, 252);
        doc.roundedRect(15, 52, 85, 35, 2, 2, 'FD');
        doc.setTextColor(100, 100, 100);
        doc.setFontSize(9);
        doc.setFont(undefined, 'normal');
        doc.text('ORDER DETAILS', 20, 60);
        doc.setTextColor(30, 30, 30);
        doc.setFont(undefined, 'bold');
        doc.text(`Order ID:`, 20, 68);
        doc.setFont(undefined, 'normal');
        doc.text(`${(order?.id || orderId || 'N/A').toString().substring(0, 24)}`, 20, 74);
        doc.text(`Date: ${new Date().toLocaleDateString('en-IN')}`, 20, 80);
        doc.text(`Status: PAID ✓`, 20, 83);

        // Customer info box
        doc.setFillColor(248, 250, 252);
        doc.roundedRect(110, 52, 85, 35, 2, 2, 'FD');
        doc.setTextColor(100, 100, 100);
        doc.setFontSize(9);
        doc.text('BILLED TO', 115, 60);
        doc.setTextColor(30, 30, 30);
        doc.setFont(undefined, 'bold');
        doc.text(`${order?.shippingAddress?.fullName || 'Customer'}`, 115, 68);
        doc.setFont(undefined, 'normal');
        doc.text(`${order?.shippingAddress?.email || ''}`, 115, 74);
        doc.text(`${order?.shippingAddress?.phone || ''}`, 115, 80);

        // Table
        const tableData = order?.items?.map(item => [
            item.product?.name || 'PC Component',
            item.quantity || 1,
            `INR ${Number(item.price || 0).toLocaleString('en-IN')}`,
            `INR ${Number((item.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}`
        ]) || [['PC Components Bundle', 1, `INR ${order?.totalPrice || 0}`, `INR ${order?.totalPrice || 0}`]];

        doc.autoTable({
            startY: 95,
            head: [['Component / Product', 'Qty', 'Unit Price', 'Total']],
            body: tableData,
            theme: 'grid',
            headStyles: { fillColor: [15, 23, 42], textColor: 255, fontStyle: 'bold', fontSize: 10 },
            bodyStyles: { fontSize: 9 },
            alternateRowStyles: { fillColor: [248, 250, 252] },
        });

        const finalY = doc.lastAutoTable.finalY + 12;

        // Totals box
        doc.setFillColor(248, 250, 252);
        doc.roundedRect(120, finalY, 75, 38, 2, 2, 'FD');
        doc.setFontSize(9);
        doc.setTextColor(80, 80, 80);
        doc.text(`Subtotal:`, 125, finalY + 8);
        doc.text(`GST (18%):`, 125, finalY + 15);
        doc.text(`Delivery:`, 125, finalY + 22);
        doc.setDrawColor(220, 220, 220);
        doc.line(125, finalY + 25, 190, finalY + 25);
        doc.setTextColor(15, 23, 42);
        doc.setFont(undefined, 'bold');
        doc.setFontSize(10);
        doc.text(`TOTAL: INR ${Number(order?.totalPrice || 0).toLocaleString('en-IN')}`, 125, finalY + 33);

        doc.setFont(undefined, 'normal');
        doc.text(`INR ${Number(order?.subtotal || 0).toLocaleString('en-IN')}`, 175, finalY + 8, { align: 'right' });
        doc.text(`INR ${Number(order?.gst || 0).toLocaleString('en-IN')}`, 175, finalY + 15, { align: 'right' });
        doc.text(`FREE`, 175, finalY + 22, { align: 'right' });

        // Footer
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text('This is a computer-generated invoice and does not require a physical signature.', 15, 282);
        doc.text('Thank you for shopping with Build My PC! | buildmypc.com', 15, 288);

        doc.save(`BuildMyPC_Invoice_${(order?.id || orderId || 'order').toString().substring(0, 8)}.pdf`);
        toast.success('Invoice downloaded!');
    };

    const paymentMethod = order?.paymentMethod || 'Online';
    const confirmationMsgs = {
        COD: "Your order has been placed! Our team will contact you before delivery.",
        Card: "Payment confirmed! A confirmation email has been sent.",
        NetBanking: "Net banking payment verified! Check your bank statement.",
        UPI: "UPI payment confirmed! Check your UPI app for receipt.",
    };

    return (
        <div className="pt-24 pb-20 px-4 flex flex-col items-center justify-center min-h-screen relative overflow-hidden">
            {/* Background */}
            <div className="fixed inset-0 -z-10 bg-[#030303]">
                <div className="absolute inset-0 bg-gradient-to-b from-green-900/5 to-transparent" />
            </div>

            {/* Confetti */}
            {showConfetti && (
                <div className="fixed inset-0 z-10 pointer-events-none overflow-hidden">
                    {Array.from({ length: 50 }).map((_, i) => (
                        <ConfettiParticle key={i} index={i} />
                    ))}
                </div>
            )}

            <motion.div
                initial={{ scale: 0.85, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 100 }}
                className="max-w-2xl w-full glass-card p-10 text-center relative z-20"
            >
                <AnimatedCheck />

                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="text-4xl font-black mb-3 bg-gradient-to-r from-green-400 via-emerald-400 to-blue-500 bg-clip-text text-transparent"
                >
                    Order Successful! 🎉
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-gray-400 text-base mb-8"
                >
                    {confirmationMsgs[paymentMethod] || confirmationMsgs.Card}
                </motion.p>

                {/* Order Details */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                    className="bg-white/3 border border-white/8 rounded-2xl p-5 mb-6 text-left space-y-3"
                >
                    <div className="flex justify-between items-center border-b border-white/8 pb-3">
                        <span className="text-gray-400 text-sm">Order ID</span>
                        <span className="font-mono text-blue-400 text-sm font-bold">{(order?.id || orderId || '').toString().substring(0, 16)}...</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/8 pb-3">
                        <span className="text-gray-400 text-sm">Amount Paid</span>
                        <span className="font-black text-lg text-white">₹{Number(order?.totalPrice || 0).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/8 pb-3">
                        <span className="text-gray-400 text-sm">Payment Method</span>
                        <span className="font-semibold bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-lg text-sm">{paymentMethod}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Order Date</span>
                        <span className="text-sm">{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                </motion.div>

                {/* Confirmation message simulation */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.3 }}
                    className="bg-green-500/5 border border-green-500/20 rounded-xl px-4 py-3 mb-6 flex items-center gap-3"
                >
                    <span className="text-green-400 text-xl">📧</span>
                    <p className="text-sm text-green-300">
                        Confirmation sent to <strong>{order?.shippingAddress?.email || user?.email || 'your email'}</strong>
                    </p>
                </motion.div>

                {/* Estimated Delivery */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                    className="bg-blue-500/5 border border-blue-500/20 rounded-xl px-4 py-3 mb-8 flex items-center gap-3"
                >
                    <span className="text-blue-400 text-xl">🚚</span>
                    <p className="text-sm text-blue-300">
                        Estimated delivery: <strong>5–7 business days</strong>
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <button
                        onClick={downloadInvoice}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-blue-500/20"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        Download Invoice
                    </button>
                    <Link
                        to="/build"
                        className="bg-white/5 hover:bg-white/10 text-white px-8 py-3.5 rounded-xl font-bold transition-all border border-white/10 text-center"
                    >
                        🖥️ Build Another PC
                    </Link>
                    <Link
                        to="/"
                        className="bg-white/3 hover:bg-white/8 text-gray-300 px-6 py-3.5 rounded-xl font-semibold transition-all text-center"
                    >
                        Home
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Success;
