import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

// Users
export const getAllUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
};

// Products
export const getAllProducts = async (req, res) => {
  const products = await Product.find().populate('supplier');
  res.json(products);
};

export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Product deleted' });
};

// Orders
export const getAllOrders = async (req, res) => {
  const orders = await Order.find().populate('customer items.product');
  res.json(orders);
};

export const deleteOrder = async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ message: 'Order deleted' });
};

// adminController.js
export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const allowedStatuses = ['pending', 'shipped', 'delivered'];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  const updated = await Order.findByIdAndUpdate(id, { status }, { new: true });
  if (!updated) return res.status(404).json({ message: 'Order not found' });
  res.json(updated);
};
