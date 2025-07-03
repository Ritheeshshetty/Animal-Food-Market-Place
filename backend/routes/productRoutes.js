import express from "express";
import {
  createProduct,
  getAllProducts,
  getFeaturedProducts,
  getProductById,
  getRecommendedProducts,
  getSupplierProducts,
  updateProduct,
} from "../controllers/productController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/recommended", getRecommendedProducts);
router.get("/featured", getFeaturedProducts);
router.get("/my", authMiddleware,roleMiddleware("supplier"), getSupplierProducts);
router.get("/:id", getProductById);
router.post("/", authMiddleware, roleMiddleware("supplier"), createProduct);
router.put("/:id", authMiddleware, roleMiddleware("supplier"), updateProduct);
// router.get("/:id", authMiddleware, roleMiddleware("customer"), getProductById);

export default router;
