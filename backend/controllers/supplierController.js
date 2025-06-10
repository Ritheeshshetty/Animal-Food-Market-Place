import Product from '../models/Product.js';
import Order from '../models/Order.js';
import mongoose from 'mongoose';

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
    
    // const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    // let monthlySales = 0;

    // allOrders.forEach(order => {
  
    //   if (order.status === 'delivered' && new Date(order.createdAt) >= startOfMonth) {
    //     order.items.forEach(item => {
    //       if (supplierProductIds.includes(item.product.toString())) {
    //         monthlySales += item.price * item.quantity;
    //       }
    //     });
    //   }
    // });

    // Get the first day of the previous month
const now = new Date();
const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

// Get end of today
const endOfToday = new Date();
endOfToday.setHours(23, 59, 59, 999);

let monthlySales = 0;

allOrders.forEach(order => {
  const orderDate = new Date(order.createdAt);

  if (
    order.status === 'delivered' &&
    orderDate >= startOfLastMonth &&
    orderDate <= endOfToday
  ) {
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
console.log('Monthly sales calculated:', monthlySales);

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

export const getAllSupplierOrders = async (req, res) => {
  const orders = await Order.find().populate("customer items.product");
  res.json(orders);
};

export const deleteSupplierOrder = async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ message: "Order deleted" });
};

export const updateSupplierOrderStatus = async (req, res) => {
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




export const getSupplierProducts = async (req, res) => {
  const products = await Product.find().populate("supplier");
  res.json(products);
};



export const updateSupplierProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const supplierId = req.user._id;

    // Validate product ID format
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: 'Invalid product ID format' });
    }

    // Find existing product
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Verify product ownership
    if (existingProduct.supplier.toString() !== supplierId.toString()) {
      return res.status(403).json({ error: 'Unauthorized to edit this product' });
    }

    // Prepare update data
    const updates = {
      name: req.body.name,
      category: req.body.category,
      animalType: req.body.animalType,
      nutritionalInfo: req.body.nutritionalInfo,
      ingredients: req.body.ingredients,
      quantityOptions: req.body.quantityOptions
    };

    // Validate enum values
    const validCategories = ['pet', 'livestock'];
    const validAnimalTypes = ['dog', 'cat', 'bird', 'cow', 'goat', 'poultry'];
    
    if (updates.category && !validCategories.includes(updates.category)) {
      return res.status(400).json({ error: 'Invalid product category' });
    }

    if (updates.animalType && !validAnimalTypes.includes(updates.animalType)) {
      return res.status(400).json({ error: 'Invalid animal type' });
    }

    // Process ingredients array
    if (updates.ingredients && typeof updates.ingredients === 'string') {
      updates.ingredients = updates.ingredients
        .split(',')
        .map(ingredient => ingredient.trim())
        .filter(ingredient => ingredient.length > 0);
    }

    // Validate quantity options structure
    if (updates.quantityOptions) {
      if (!Array.isArray(updates.quantityOptions)) {
        return res.status(400).json({ error: 'Quantity options must be an array' });
      }

      for (const option of updates.quantityOptions) {
        if (!option.label || !option.price || option.stock === undefined) {
          return res.status(400).json({ 
            error: 'Each quantity option must have label, price, and stock'
          });
        }
      }
    }

    // Perform update
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: 'Product updated successfully',
      product: updatedProduct
    });

  } catch (error) {
    console.error('Update product error:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ error: errors.join(', ') });
    }

    // Handle cast errors
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid data format' });
    }

    res.status(500).json({ error: 'Server error updating product' });
  }
};

export const getSupplierProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      supplier: req.user._id
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({
      ...product._doc,
      ingredients: product.ingredients.join(', '),
    });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ error: 'Server error fetching product' });
  }
};



export const deleteSupplierProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
};



export const getProductByIdForSupplier = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Ensure only the supplier who owns the product can access it
    if (product.supplier.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch product' });
  }
};


export const updateProductStock = async (req, res) => {
  const { productId } = req.params;
  const updateData = req.body;

  try {
    const product = await Product.findByIdAndUpdate(productId, updateData, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update product' });
  }
};

