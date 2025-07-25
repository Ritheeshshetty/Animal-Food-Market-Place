import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ["pet", "livestock"],
      required: true,
    },
    animalType: {
      type: String,
      enum: ["dog", "cat", "bird", "cow", "goat", "poultry"],
      required: true,
    },
    ingredients: [String],
    nutritionalInfo: String,
    quantityOptions: [
      {
        label: String, // e.g., '1kg', '5kg'
        price: Number,
        stock: Number,
      },
    ],
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ratings: {
      type: [Number], // Users can submit 1-5 ratings
      default: [],
    },
    image: {
      type: String, // Store image URL or filename
      default: "", // Optional default value
    },
     salesCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
