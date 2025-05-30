import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import adminMiddleware from '../middlewares/adminMiddleware.js';
import {
  getAllUsers,
  deleteUser,
  getAllProducts,
  deleteProduct,
  getAllOrders,
  deleteOrder,
  updateOrderStatus,
  approveSupplier,
  getAnalytics,
} from '../controllers/adminController.js';

const router = express.Router();

// User routes
router.get('/users', authMiddleware, adminMiddleware, getAllUsers);
router.delete('/users/:id', authMiddleware, adminMiddleware, deleteUser);

// Product routes
router.get('/products', authMiddleware, adminMiddleware, getAllProducts);
router.delete('/products/:id', authMiddleware, adminMiddleware, deleteProduct);

// Order routes
router.get('/orders', authMiddleware, adminMiddleware, getAllOrders);
router.delete('/orders/:id', authMiddleware, adminMiddleware, deleteOrder);


router.put('/orders/:id/status', authMiddleware, adminMiddleware, updateOrderStatus);


router.put('/suppliers/approve/:id', authMiddleware, adminMiddleware, approveSupplier);



// Analytics route
router.get('/analytics', authMiddleware, adminMiddleware, getAnalytics);
export default router;
