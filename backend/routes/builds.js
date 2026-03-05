import express from 'express';
import {
    saveBuild,
    getUserBuilds,
    getBuild,
    deleteBuild,
    checkBuildCompatibility
} from '../controllers/buildController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticate, saveBuild);
router.get('/user/:userId', authenticate, getUserBuilds);
router.get('/:id', authenticate, getBuild);
router.delete('/:id', authenticate, deleteBuild);
router.post('/check-compatibility', checkBuildCompatibility);

export default router;
