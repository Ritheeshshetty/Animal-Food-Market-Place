import Order from '../models/Order.js';
import Product from '../models/Product.js';

// PLACE ORDER (with stock deduction)
export const placeOrder = async (req, res) => {
  const { items, shippingAddress } = req.body;

  try {
    let totalAmount = 0;
    const processedItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) return res.status(404).json({ message: 'Product not found' });

      const optionIndex = product.quantityOptions.findIndex(opt => opt.label === item.quantityLabel);
      if (optionIndex === -1) {
        return res.status(400).json({ message: `Invalid quantity option for ${product.name}` });
      }

      const option = product.quantityOptions[optionIndex];

      if (option.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name} (${item.quantityLabel})` });
      }

      // Deduct stock
      product.quantityOptions[optionIndex].stock -= item.quantity;
      await product.save();

      const price = option.price;
      totalAmount += item.quantity * price;

      processedItems.push({
        product: product._id,
        quantityLabel: item.quantityLabel,
        quantity: item.quantity,
        price,
      });
    }

    const order = new Order({
      customer: req.user.id,
      items: processedItems,
      shippingAddress,
      totalAmount,
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.error('Order Placement Error:', err);
    res.status(500).json({ message: 'Server error while placing order' });
  }
};

// GET MY ORDERS (Customer)
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user.id })
      .sort({ createdAt: -1 })
      .populate('items.product', 'name animalType category image');

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SUPPLIER ORDERS
export const getSupplierOrders = async (req, res) => {
  try {
    const supplierProducts = await Product.find({ supplier: req.user.id }).select('_id');
    const supplierProductIds = supplierProducts.map(p => p._id);

    const orders = await Order.find({
      'items.product': { $in: supplierProductIds }
    })
      .sort({ createdAt: -1 })
      .populate('customer', 'name email')
      .populate('items.product', 'name quantityOptions image');

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
