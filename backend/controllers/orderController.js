import Order from '../models/Order.js';
import Product from '../models/Product.js';

export const placeOrder = async (req, res) => {
  const { items, shippingAddress } = req.body;

  try {
    let totalAmount = 0;

    // Calculate total and validate products
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) return res.status(404).json({ message: 'Product not found' });

      const option = product.quantityOptions.find(opt => opt.label === item.quantityLabel);
      if (!option || option.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${item.quantityLabel}` });
      }

      totalAmount += item.quantity * option.price;
    }

    // Create order
    const order = new Order({
      customer: req.user.id,
      items,
      shippingAddress,
      totalAmount,
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user.id }).populate('items.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



export const getSupplierOrders = async (req, res) => {
  try {
    // Find products created by the supplier
    const supplierProducts = await Product.find({ supplier: req.user.id }).select('_id');

    const supplierProductIds = supplierProducts.map(p => p._id.toString());

    // Find orders where any item contains those products
    const orders = await Order.find({
      'items.product': { $in: supplierProductIds }
    }).populate('customer items.product');

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
