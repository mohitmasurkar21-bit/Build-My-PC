import express from 'express';
import { createOrder, verifyPayment, getMyOrders } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/create', createOrder);
router.post('/verify', verifyPayment);
router.get('/user/:userId', getMyOrders);

export default router;
