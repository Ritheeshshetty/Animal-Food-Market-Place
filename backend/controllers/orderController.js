// import Order from '../models/Order.js';
// import Product from '../models/Product.js';

// // PLACE ORDER (with stock deduction)
// export const placeOrder = async (req, res) => {
//   const { items, shippingAddress } = req.body;

//   try {
//     let totalAmount = 0;
//     const processedItems = [];

//     for (const item of items) {
//       const product = await Product.findById(item.product);
//       if (!product) return res.status(404).json({ message: 'Product not found' });

//       const optionIndex = product.quantityOptions.findIndex(opt => opt.label === item.quantityLabel);
//       if (optionIndex === -1) {
//         return res.status(400).json({ message: `Invalid quantity option for ${product.name}` });
//       }

//       const option = product.quantityOptions[optionIndex];

//       if (option.stock < item.quantity) {
//         return res.status(400).json({ message: `Insufficient stock for ${product.name} (${item.quantityLabel})` });
//       }

//       // Deduct stock
//       product.quantityOptions[optionIndex].stock -= item.quantity;
//       await product.save();

//       const price = option.price;
//       totalAmount += item.quantity * price;

//       processedItems.push({
//         product: product._id,
//         quantityLabel: item.quantityLabel,
//         quantity: item.quantity,
//         price,
//       });
//     }

//     const order = new Order({
//       customer: req.user.id,
//       items: processedItems,
//       shippingAddress,
//       totalAmount,
//     });

//     await order.save();
//     res.status(201).json(order);
//   } catch (err) {
//     console.error('Order Placement Error:', err);
//     res.status(500).json({ message: 'Server error while placing order' });
//   }
// };

// // GET MY ORDERS (Customer)
// export const getMyOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({ customer: req.user.id })
//       .sort({ createdAt: -1 })
//       .populate('items.product', 'name animalType category image');

//     res.json(orders);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // GET SUPPLIER ORDERS
// export const getSupplierOrders = async (req, res) => {
//   try {
//     const supplierProducts = await Product.find({ supplier: req.user.id }).select('_id');
//     const supplierProductIds = supplierProducts.map(p => p._id);

//     const orders = await Order.find({
//       'items.product': { $in: supplierProductIds }
//     })
//       .sort({ createdAt: -1 })
//       .populate('customer', 'name email')
//       .populate('items.product', 'name quantityOptions image');

//     res.json(orders);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };



import Order from '../models/Order.js';
import Product from '../models/Product.js';

// PLACE ORDER (with stock deduction and sales tracking)
export const placeOrder = async (req, res) => {
  const { items, shippingAddress } = req.body;

  try {
    let totalAmount = 0;
    const processedItems = [];
    const productUpdates = [];

    // Process each item in the order
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Product ${item.product} not found` });
      }

      const optionIndex = product.quantityOptions.findIndex(
        opt => opt.label === item.quantityLabel
      );
      
      if (optionIndex === -1) {
        return res.status(400).json({ 
          message: `Invalid quantity option (${item.quantityLabel}) for ${product.name}` 
        });
      }

      const option = product.quantityOptions[optionIndex];

      if (option.stock < item.quantity) {
        return res.status(400).json({ 
          message: `Insufficient stock for ${product.name} (${item.quantityLabel})` 
        });
      }

      // Prepare updates
      product.quantityOptions[optionIndex].stock -= item.quantity;
      product.salesCount = (product.salesCount || 0) + item.quantity;
      
      productUpdates.push({
        updateOne: {
          filter: { _id: product._id },
          update: {
            $set: {
              'quantityOptions.$[elem].stock': product.quantityOptions[optionIndex].stock,
              salesCount: product.salesCount
            }
          },
          arrayFilters: [{ 'elem.label': item.quantityLabel }]
        }
      });

      // Add to processed items
      processedItems.push({
        product: product._id,
        quantityLabel: item.quantityLabel,
        quantity: item.quantity,
        price: option.price
      });

      totalAmount += item.quantity * option.price;
    }

    // Save all product updates in bulk
    if (productUpdates.length > 0) {
      await Product.bulkWrite(productUpdates);
    }

    // Create order
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
      .populate({
        path: 'items.product',
        select: 'name animalType category image supplier',
        populate: {
          path: 'supplier',
          select: 'name'
        }
      });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SUPPLIER ORDERS
export const getSupplierOrders = async (req, res) => {
  try {
    const orders = await Order.aggregate([
      // Unwind items array to match products
      { $unwind: "$items" },
      // Lookup product details
      {
        $lookup: {
          from: "products",
          localField: "items.product",
          foreignField: "_id",
          as: "items.product"
        }
      },
      { $unwind: "$items.product" },
      // Match only products from this supplier
      {
        $match: {
          "items.product.supplier": req.user.id
        }
      },
      // Group back into orders
      {
        $group: {
          _id: "$_id",
          customer: { $first: "$customer" },
          items: { $push: "$items" },
          shippingAddress: { $first: "$shippingAddress" },
          totalAmount: { $first: "$totalAmount" },
          status: { $first: "$status" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" }
        }
      },
      // Lookup customer details
      {
        $lookup: {
          from: "users",
          localField: "customer",
          foreignField: "_id",
          as: "customer"
        }
      },
      { $unwind: "$customer" },
      // Project final fields
      {
        $project: {
          "customer.password": 0,
          "customer.role": 0,
          "customer.cart": 0
        }
      },
      // Sort by latest
      { $sort: { createdAt: -1 } }
    ]);

    res.json(orders);
  } catch (err) {
    console.error('Supplier Orders Error:', err);
    res.status(500).json({ message: err.message });
  }
};





export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("customer", "name email") // optional
      .populate("items.product", "name"); // get product name

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};