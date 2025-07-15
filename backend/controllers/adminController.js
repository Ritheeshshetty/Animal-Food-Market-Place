import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

// Users
export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};

// Products
export const getAllProducts = async (req, res) => {
  const products = await Product.find().populate("supplier");
  res.json(products);
};

export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
};

// Orders
export const getAllOrders = async (req, res) => {
  const orders = await Order.find().populate("customer items.product");
  res.json(orders);
};

export const deleteOrder = async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ message: "Order deleted" });
};

export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const allowedStatuses = ["pending", "shipped", "delivered"];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const updated = await Order.findByIdAndUpdate(id, { status }, { new: true });
  if (!updated) return res.status(404).json({ message: "Order not found" });
  res.json(updated);
};

export const approveSupplier = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user || user.role !== "supplier") {
    return res.status(404).json({ message: "Supplier not found" });
  }

  user.isApproved = true;
  await user.save();

  res.json({ message: "Supplier approved successfully" });
};

// Analytics
export const getAnalytics = async (req, res) => {
  try {
    const orders = await Order.find({ status: "delivered" });
    const totalSales = orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );

    const activeUsers = await User.countDocuments({ role: "customer" });
    const activeSuppliers = await User.countDocuments({
      role: "supplier",
      isApproved: true,
    });

    const productStats = {};

    for (const order of orders) {
      for (const item of order.items) {
        const productId = item.product.toString();
        productStats[productId] =
          (productStats[productId] || 0) + item.quantity;
      }
    }
    // console.log("Product Stats:", productStats);

    const topProducts = await Promise.all(
      Object.entries(productStats)
        .sort((a, b) => b[1] - a[1]) // sort by count descending
        .slice(0, 5)
        .map(async ([productId, count]) => {
          const product = await Product.findById(productId);
          return {
            name: product?.name || "Unknown Product",
            salesCount: count,
          };
        })
    );

    const now = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 30);

    const recentOrders = await Order.find({
      status: "delivered",
      createdAt: { $gte: sevenDaysAgo },
    });

    const dailySalesMap = {};
    recentOrders.forEach((order) => {
      const date = order.createdAt.toISOString().split("T")[0];
      dailySalesMap[date] = (dailySalesMap[date] || 0) + order.totalAmount;
    });

    const salesTrends = Object.entries(dailySalesMap).map(([date, amount]) => ({
      date,
      amount,
    }));

    const lowStockProducts = await Product.find({ stock: { $lt: 10 } });

    const supplierStats = {};
    for (const order of orders) {
      for (const item of order.items) {
        const product = await Product.findById(item.product);
        if (product && product.supplier) {
          const supplierId = product.supplier.toString();
          supplierStats[supplierId] =
            (supplierStats[supplierId] || 0) + item.quantity;
        }
      }
    }
    const supplierIds = Object.keys(supplierStats);
    const suppliers = await User.find({ _id: { $in: supplierIds } });

    const supplierPerformance = suppliers.map((supplier) => ({
      name: supplier.name,
      rating: supplier.rating || 3,
      orders: supplierStats[supplier._id.toString()] || 0,
    }));

    res.json({
      totalSales,
      activeUsers,
      activeSuppliers,
      topProducts,
      salesTrends,
      lowStockProducts,
      supplierStats,
      supplierPerformance,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch analytics" });
  }
};
