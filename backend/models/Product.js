import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: String,
    enum: ['pet', 'livestock'],
    required: true,
  },
  animalType: {
    type: String,
    enum: ['dog', 'cat', 'bird', 'cow', 'goat', 'poultry'],
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
    ref: 'User',
    required: true,
  },
  ratings: {
    type: [Number], // Users can submit 1-5 ratings
    default: [],
  },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;
