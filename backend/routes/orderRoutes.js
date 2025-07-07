import express from 'express';
import { placeOrder, getMyOrders, getSupplierOrders, getOrderById } from '../controllers/orderController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, placeOrder);
router.get('/my', authMiddleware, getMyOrders);
router.get('/supplier/my', authMiddleware,roleMiddleware('supplier'), getSupplierOrders);
router.get("/:id", authMiddleware, getOrderById);

export default router;
