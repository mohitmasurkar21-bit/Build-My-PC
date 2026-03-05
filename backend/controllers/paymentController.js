import Razorpay from 'razorpay';
import crypto from 'crypto';
import { Order, Cart } from '../models/index.js';
import dotenv from 'dotenv';
import { sendOrderConfirmation } from '../utils/emailUtils.js';

dotenv.config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_dummy_key',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret'
});

// ─── Generate a unique order reference ─────────────────────────────────────
const generateOrderRef = () => {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `BMPC-${timestamp}-${random}`;
};

export const createOrder = async (req, res) => {
    try {
        const { userId, shippingAddress, paymentMethod, subtotal, gst, deliveryCharges, totalAmount, items, couponCode, bankName } = req.body;

        // Validate payment method
        const validMethods = ['Card', 'UPI', 'NetBanking', 'COD'];
        const method = validMethods.includes(paymentMethod) ? paymentMethod : 'Card';

        // For COD and simulated payment methods (Card/UPI/NetBanking) - create order directly
        if (method === 'COD' || method === 'Card' || method === 'UPI' || method === 'NetBanking') {
            const orderRef = generateOrderRef();

            const newOrder = await Order.create({
                userId,
                items,
                subtotal: subtotal || 0,
                gst: gst || 0,
                deliveryCharges: deliveryCharges || 0,
                totalPrice: totalAmount,
                shippingAddress,
                paymentMethod: method,
                paymentStatus: method === 'COD' ? 'Pending' : 'Paid',
                status: 'Processing',
                transactionId: method === 'COD' ? null : orderRef,
            });

            // Clear cart
            await Cart.update(
                { items: [], totalPrice: 0 },
                { where: { userId } }
            );

            // Try to send confirmation email
            try {
                await sendOrderConfirmation(newOrder);
            } catch (emailError) {
                console.error('Email error (non-critical):', emailError.message);
            }

            return res.json({
                success: true,
                order: newOrder,
                orderId: newOrder.id,
                orderRef,
                message: method === 'COD'
                    ? 'Order placed successfully (Cash on Delivery)'
                    : 'Payment successful! Order confirmed.'
            });
        }

        // ── Razorpay flow (for future integration) ───────────────────────
        const options = {
            amount: Math.round(totalAmount * 100),
            currency: 'INR',
            receipt: `rcpt_${Date.now()}`
        };

        const razorpayOrder = await razorpay.orders.create(options);

        const newOrder = await Order.create({
            userId,
            items,
            subtotal: subtotal || 0,
            gst: gst || 0,
            deliveryCharges: deliveryCharges || 0,
            totalPrice: totalAmount,
            shippingAddress,
            paymentMethod: method,
            razorpayOrderId: razorpayOrder.id,
            paymentStatus: 'Pending'
        });

        res.json({
            success: true,
            key: process.env.RAZORPAY_KEY_ID,
            order: razorpayOrder,
            dbOrder: newOrder
        });

    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        const body = razorpay_order_id + '|' + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'dummy_secret')
            .update(body.toString())
            .digest('hex');

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            const order = await Order.findOne({ where: { razorpayOrderId: razorpay_order_id } });
            if (!order) {
                return res.status(404).json({ success: false, message: 'Order not found' });
            }

            order.paymentStatus = 'Paid';
            order.razorpayPaymentId = razorpay_payment_id;
            order.razorpaySignature = razorpay_signature;
            order.status = 'Processing';
            order.transactionId = razorpay_payment_id;

            await order.save();

            await Cart.update(
                { items: [], totalPrice: 0 },
                { where: { userId: order.userId } }
            );

            try {
                await sendOrderConfirmation(order);
            } catch (emailError) {
                console.error('Email error:', emailError.message);
            }

            res.json({
                success: true,
                message: 'Payment verified successfully',
                orderId: order.id
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Invalid payment signature'
            });
        }
    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: { userId: req.params.userId },
            order: [['createdAt', 'DESC']]
        });
        res.json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
