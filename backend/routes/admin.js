import express from 'express';
import {
    getStats,
    getAllUsers,
    getAllBuilds,
    getAllOrders,
    updateOrderStatus,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/adminController.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Apply auth and admin middleware to all routes
router.use(authenticate);
router.use(isAdmin);

router.get('/stats', getStats);
router.get('/users', getAllUsers);
router.get('/builds', getAllBuilds);
router.get('/orders', getAllOrders);
router.put('/orders/:id/status', updateOrderStatus);

// Product management
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;
