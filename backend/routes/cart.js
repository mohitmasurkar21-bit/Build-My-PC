import express from 'express';
import {
    getCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart
} from '../controllers/cartController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/:userId', authenticate, getCart);
router.post('/', authenticate, addToCart);
router.put('/:userId/item/:productId', authenticate, updateQuantity);
router.delete('/:userId/item/:productId', authenticate, removeFromCart);
router.delete('/:userId', authenticate, clearCart);

export default router;
