import Review from "../models/Review.js";
import Product from "../models/Product.js";
import mongoose from "mongoose";

export const addReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const { rating, feedback } = req.body;
    const customerId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }

    // Save review
    const newReview = await Review.create({
      customer: customerId,
      product: productId,
      rating: Math.round(rating),
      feedback,
    });

    // Add rating to Product's ratings array
    await Product.findByIdAndUpdate(
      productId,
      { $push: { ratings: Math.round(rating) } },
      { new: true }
    );

    res.status(201).json({ message: "Review added successfully", review: newReview });
  } catch (err) {
    console.error("Add Review Error:", err);
    res.status(500).json({ error: "Server error adding review" });
  }
};


// Get a customer's review for a product
export const getUserReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const customerId = req.user.id;

    const existingReview = await Review.findOne({
      product: productId,
      customer: customerId,
    });

    if (!existingReview) {
      return res.json({ hasRated: false });
    }

    res.json({
      hasRated: true,
      rating: existingReview.rating,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch review" });
  }
};







// order review controller
export const addOrderReview = async (req, res) => {
  const { orderId } = req.params;
  const { rating, feedback } = req.body;

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ error: "Rating must be between 1 and 5" });
  }

  try {
    let review = await Review.findOne({ customer: req.user.id, order: orderId });

    if (review) {
      // Update existing review
      review.rating = Math.round(rating);
      review.feedback = feedback;
      await review.save();
      res.json({ message: "Review updated successfully", review });
    } else {
      // Create new review
      review = await Review.create({
        customer: req.user.id,
        order: orderId,
        rating: Math.round(rating),
        feedback,
      });
      res.status(201).json({ message: "Review created successfully", review });
    }
  } catch (err) {
    console.error("Order Review Error:", err);
    res.status(500).json({ error: "Server error processing order review" });
  }
};




// Get order review for logged-in user
export const getOrderReview = async (req, res) => {
  try {
    const review = await Review.findOne({
      customer: req.user.id,
      order: req.params.orderId,
    });
    if (!review) return res.status(404).json({ message: "No review found" });
    res.json({ review });
  } catch (err) {
    res.status(500).json({ error: "Server error fetching order review" });
  }
};

// Create or Update order review
export const createOrUpdateOrderReview = async (req, res) => {
  try {
    const { rating, feedback } = req.body;
    const { orderId } = req.params;

    let review = await Review.findOne({
      customer: req.user.id,
      order: orderId,
    });

    if (review) {
      review.rating = rating;
      review.feedback = feedback;
      await review.save();
      return res.json({ message: "Order review updated", review });
    }

    review = await Review.create({
      customer: req.user.id,
      order: orderId,
      rating,
      feedback,
    });

    res.status(201).json({ message: "Order review created", review });
  } catch (err) {
    res.status(500).json({ error: "Failed to submit order review" });
  }
};








// Get all reviews by logged-in customer
// export const getCustomerReviews = async (req, res) => {
//   try {
//     const reviews = await Review.find({ customer: req.user.id, product: { $ne: null } })
//       .populate("product", "name") // only get product name
//       .sort({ createdAt: -1 });

//     res.json({ reviews });
//   } catch (err) {
//     console.error("Error fetching customer reviews:", err);
//     res.status(500).json({ error: "Server error fetching reviews" });
//   }
// };

// Get all order reviews by the customer
export const getCustomerOrderReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ customer: req.user.id, order: { $ne: null } })
      .populate({
        path: "order",
        populate: {
          path: "items.product",
          select: "name image", // assuming `image` exists in Product model
        },
      })
      .sort({ createdAt: -1 });

    res.json({ reviews });
  } catch (err) {
    console.error("Error fetching order reviews:", err);
    res.status(500).json({ error: "Server error fetching reviews" });
  }
};



export const getSupplierReviews = async (req, res) => {
  try {
    const supplierId = req.user.id;

    // Fetch all products by this supplier
    const products = await Product.find({ supplier: supplierId }).select("_id");

    const productIds = products.map((p) => p._id);

    // Fetch reviews of these products, populate customer and product details
    const reviews = await Review.find({
      product: { $in: productIds },
    })
      .populate("customer", "name")
      .populate("product", "name image");

    res.json({ reviews });
  } catch (err) {
    console.error("Error fetching supplier reviews:", err);
    res.status(500).json({ error: "Failed to load reviews" });
  }
};


// export const createReview = async (req, res) => {
//   const { productId } = req.params;
//   const { rating, feedback } = req.body;

//   if (!rating || rating < 1 || rating > 5) {
//     return res.status(400).json({ error: "Invalid rating" });
//   }

//   try {
//     const review = await Review.create({
//       customer: req.user.id,
//       product: productId,
//       rating,
//       feedback,
//     });

//     res.json({ message: "Review submitted", review });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to submit review" });
//   }
// };



// export const getUserProductReview = async (req, res) => {
//   const { productId } = req.params;
//   try {
//     const review = await Review.findOne({
//       product: productId,
//       customer: req.user.id,
//     });

//     if (!review) return res.json({ hasRated: false });
//     res.json({ hasRated: true, rating: review.rating });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Error checking review" });
//   }
// };
