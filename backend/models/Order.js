import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantityLabel: String,  // e.g., '5kg'
      quantity: Number,
      price: Number,
    }
  ],
  totalAmount: Number,
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered'],
    default: 'pending',
  },
  shippingAddress: String,
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;
