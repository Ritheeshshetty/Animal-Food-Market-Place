import express from 'express';
const router = express.Router();
import authMiddleware from '../middlewares/authMiddleware.js';
import { clearCart, getCart, removeItem, updateCart } from '../controllers/cartController.js';

router.get('/', authMiddleware, getCart);
router.post('/', authMiddleware, updateCart);
router.delete('/:productId', authMiddleware,removeItem);
router.delete('/', authMiddleware, clearCart);

export default router;
