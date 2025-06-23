import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ['customer', 'supplier', 'admin'],
    default: 'customer',
  },
  isApproved: {
    type: Boolean,
    default: function () {
      return this.role === 'supplier' ? false : true;
    },
  },
  // Add cart field
  cart: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    quantityLabel: String,
    quantity: Number,
    price: Number
  }]
}, { timestamps: true });

export default mongoose.model('User', userSchema);
