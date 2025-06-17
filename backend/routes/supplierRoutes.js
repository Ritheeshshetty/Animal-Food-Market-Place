import express from "express";
import {
  deleteSupplierProduct,
  getAllSupplierOrders,
  getProductByIdForSupplier,
  getSupplierDashboard,
  getSupplierProduct,
  getSupplierProducts,
  updateProductStock,
  updateSupplierOrderStatus,
  updateSupplierProduct,
} from "../controllers/supplierController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";


const router = express.Router();

router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("supplier"),
  getSupplierDashboard
);
router.get(
  "/orders",
  authMiddleware,
  roleMiddleware("supplier"),
  getAllSupplierOrders
);
router.put(
  "/orders/:id/status",
  authMiddleware,
  roleMiddleware("supplier"),
  updateSupplierOrderStatus
);
router.get(
  "/products",
  authMiddleware,
  roleMiddleware("supplier"),
  getSupplierProducts
);
router.get(
  "/products/:id/edit",
  authMiddleware,
  roleMiddleware("supplier"),
  getSupplierProduct
);
// router.patch(
//   "/products/:productId/edit",
//   authMiddleware,
//   roleMiddleware("supplier"),
//   updateSupplierProduct
// );
router.patch(
  "/products/:productId/edit",
  authMiddleware,
  roleMiddleware("supplier"),
  upload.single("image"), // <-- This enables image uploading
  updateSupplierProduct
);


router.delete(
  "/products/:id",
  authMiddleware,
  roleMiddleware("supplier"),
  deleteSupplierProduct
);


router.get(
  "/manage-stock/:productId",
  authMiddleware,
  roleMiddleware("supplier"),
  getProductByIdForSupplier
);
router.patch(
  "/manage-stock/:productId",
  authMiddleware,
  roleMiddleware("supplier"),
  updateProductStock
);
export default router;
