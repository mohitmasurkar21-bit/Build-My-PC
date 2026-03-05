import express from 'express';
import {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/productController.js';
import { authenticate, isAdmin } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', authenticate, isAdmin, upload.single('image'), createProduct);
router.put('/:id', authenticate, isAdmin, upload.single('image'), updateProduct);
router.delete('/:id', authenticate, isAdmin, deleteProduct);

export default router;
