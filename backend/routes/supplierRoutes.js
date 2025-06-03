import express from 'express';
import { getSupplierDashboard } from '../controllers/supplierController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.get('/dashboard', authMiddleware, roleMiddleware('supplier'), getSupplierDashboard);

export default router;
