import Product from '../models/Product.js';
import Order from '../models/Order.js';

export const getSupplierDashboard = async (req, res) => {
  try {
    const supplierId = req.user.id;

    // 1. Total Products
    const totalProducts = await Product.countDocuments({ supplier: supplierId });

    // 2. Low Stock Items
    const products = await Product.find({ supplier: supplierId });
    let lowStockItems = 0;
    products.forEach(product => {
      product.quantityOptions.forEach(opt => {
        if (opt.stock < 5) lowStockItems++; // You can adjust this threshold
      });
    });

    // 3. Orders containing supplier's products
    const supplierProductIds = products.map(p => p._id.toString());
    const allOrders = await Order.find({ 'items.product': { $in: supplierProductIds } });

    // 4. Pending Orders
    const pendingOrders = allOrders.filter(order =>
      order.items.some(item => supplierProductIds.includes(item.product.toString())) &&
      order.status === 'pending'
    ).length;

    // 5. Monthly Sales (from delivered orders in the current month)
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    let monthlySales = 0;

    allOrders.forEach(order => {
      if (order.status === 'delivered' && new Date(order.createdAt) >= startOfMonth) {
        order.items.forEach(item => {
          if (supplierProductIds.includes(item.product.toString())) {
            monthlySales += item.price * item.quantity;
          }
        });
      }
    });

    // 6. Recent Orders (last 5 for this supplier)
    const recentOrders = await Order.find({ 'items.product': { $in: supplierProductIds } })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('customer', 'name')
      .populate('items.product', 'name');

    const formattedRecentOrders = recentOrders.map(order => ({
      id: order._id,
      customerName: order.customer?.name || 'Unknown',
      date: order.createdAt,
      amount: order.totalAmount,
      status: order.status,
    }));

    res.json({
      totalProducts,
      pendingOrders,
      lowStockItems,
      monthlySales,
      recentOrders: formattedRecentOrders,
    });
  } catch (err) {
    console.error('Dashboard Error:', err);
    res.status(500).json({ message: 'Server error fetching dashboard data.' });
  }
};
