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
}, { timestamps: true });

export default mongoose.model('User', userSchema);
