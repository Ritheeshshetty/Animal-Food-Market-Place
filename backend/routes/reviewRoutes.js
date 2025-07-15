import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { addOrderReview, addReview,createOrUpdateOrderReview,getCustomerOrderReviews,getOrderReview,getSupplierReviews,getUserReview } from "../controllers/reviewController.js";


const router = express.Router();

router.post("/:productId", authMiddleware, addReview); // POST /api/reviews/:productId
// router.post("/reviews/:productId", authMiddleware, createReview); // POST /api/reviews/:productId
// router.get("/product/:productId", authMiddleware, getUserProductReview);
router.get("/:productId/user-review", authMiddleware, getUserReview);
// router.get("/customer/reviews", authMiddleware, getCustomerReviews);
router.get("/customer/order-reviews", authMiddleware, getCustomerOrderReviews);
router.get("/supplier/reviews", authMiddleware, getSupplierReviews); 
router.get("/order/:orderId", authMiddleware, getOrderReview);     // Get order review
router.post("/order/:orderId", authMiddleware, addOrderReview); // POST /api/reviews/order/:orderId
router.post("/order/:orderId", authMiddleware, createOrUpdateOrderReview); // Add/update order review




export default router;
