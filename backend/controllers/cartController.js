// import Product from '../models/Product.js';
// import User from '../models/User.js';

// const populateCart = async (userId) => {
//   return await User.findById(userId)
//     .populate('cart.product', 'name image animalType category quantityOptions')
//     .then(user => user.cart);
// };

// // GET /api/cart
// export const getCart = async (req, res) => {
//   try {
//     const cart = await populateCart(req.user.id);
//     res.json(cart);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // POST /api/cart
// export const updateCart = async (req, res) => {
//   const { product, quantityLabel, quantity } = req.body;

//   try {
//     const user = await User.findById(req.user.id);
//     const productDoc = await Product.findById(product);

//     if (!user || !productDoc) {
//       return res.status(404).json({ message: 'User or product not found' });
//     }

//     const option = productDoc.quantityOptions.find(opt => opt.label === quantityLabel);
//     if (!option) return res.status(400).json({ message: 'Invalid quantity label' });

//     const existingIndex = user.cart.findIndex(
//       item => item.product.toString() === product && item.quantityLabel === quantityLabel
//     );

//     if (existingIndex !== -1) {
//       user.cart[existingIndex].quantity = quantity;
//       user.cart[existingIndex].price = option.price;
//     } else {
//       user.cart.push({
//         product,
//         quantityLabel,
//         quantity,
//         price: option.price,
//       });
//     }

//     await user.save();
//     const updatedCart = await populateCart(req.user.id);
//     res.status(200).json(updatedCart);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // DELETE /api/cart/:productId
// export const removeItem = async (req, res) => {
//   const { productId } = req.params;

//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     user.cart = user.cart.filter(item => item.product.toString() !== productId);
//     await user.save();

//     const updatedCart = await populateCart(req.user.id);
//     res.status(200).json(updatedCart);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // DELETE /api/cart
// export const clearCart = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     user.cart = [];
//     await user.save();

//     res.status(200).json([]);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// import Product from "../models/Product.js";
// import User from "../models/User.js";

// // Util: Populate and sanitize cart
// const populateCart = async (userId) => {
//   const user = await User.findById(userId).exec();
//   await user.populate({
//     path: "cart.product",
//     select: "name image animalType category quantityOptions",
//   });

//   // Remove items with missing products (e.g., deleted from DB)
//   user.cart = user.cart.filter((item) => item.product !== null);
//   await user.save();

//   return user.cart;
// };

// // GET /api/cart
// export const getCart = async (req, res) => {
//   try {
//     const cart = await populateCart(req.user.id);
//     res.json(cart);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // POST /api/cart/
// export const updateCart = async (req, res) => {
//   const { product, quantityLabel, quantity } = req.body;

//   try {
//     const user = await User.findById(req.user.id);
//     const productDoc = await Product.findById(product);

//     if (!user || !productDoc) {
//       return res.status(404).json({ message: "User or product not found" });
//     }

//     const option = productDoc.quantityOptions.find(
//       (opt) => opt.label === quantityLabel
//     );
//     if (!option)
//       return res.status(400).json({ message: "Invalid quantity label" });

//     const existingIndex = user.cart.findIndex(
//       (item) =>
//         item.product.toString() === product &&
//         item.quantityLabel === quantityLabel
//     );

//     if (existingIndex !== -1) {
//       user.cart[existingIndex].quantity = quantity;
//       user.cart[existingIndex].price = option.price;
//     } else {
//       user.cart.push({
//         product,
//         quantityLabel,
//         quantity,
//         price: option.price,
//       });
//     }

//     await user.save();
//     const updatedCart = await populateCart(req.user.id);
//     res.status(200).json(updatedCart);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // DELETE /api/cart/:productId
// export const removeItem = async (req, res) => {
//   const { productId } = req.params;
//   const { quantityLabel } = req.query;

//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     user.cart = user.cart.filter(
//       (item) =>
//         !(
//           item.product.toString() === productId &&
//           item.quantityLabel === quantityLabel
//         )
//     );

//     await user.save();
//     const updatedCart = await populateCart(req.user.id);
//     res.status(200).json(updatedCart);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // DELETE /api/cart
// export const clearCart = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     user.cart = [];
//     await user.save();

//     res.status(200).json([]);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


import Product from "../models/Product.js";
import User from "../models/User.js";

const populateCart = async (userId) => {
  const user = await User.findById(userId).exec();
  await user.populate({
    path: "cart.product",
    select: "name image animalType category quantityOptions",
  });
  user.cart = user.cart.filter((item) => item.product !== null);
  await user.save();
  return user.cart;
};

export const getCart = async (req, res) => {
  try {
    const cart = await populateCart(req.user.id);
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateCart = async (req, res) => {
  const { product, quantityLabel, quantity } = req.body;

  try {
    const user = await User.findById(req.user.id);
    const productDoc = await Product.findById(product);

    if (!user || !productDoc) {
      return res.status(404).json({ message: "User or product not found" });
    }

    const option = productDoc.quantityOptions.find(
      (opt) => opt.label === quantityLabel
    );
    if (!option)
      return res.status(400).json({ message: "Invalid quantity label" });

    const existingIndex = user.cart.findIndex(
      (item) =>
        item.product.toString() === product &&
        item.quantityLabel === quantityLabel
    );

    if (existingIndex !== -1) {
      user.cart[existingIndex].quantity = quantity;
      user.cart[existingIndex].price = option.price;
    } else {
      user.cart.push({ product, quantityLabel, quantity, price: option.price });
    }

    await user.save();
    const updatedCart = await populateCart(req.user.id);
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const removeItem = async (req, res) => {
  const { productId } = req.params;
  const { quantityLabel } = req.query;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.cart = user.cart.filter(
      (item) =>
        !(item.product.toString() === productId && item.quantityLabel === quantityLabel)
    );

    await user.save();
    const updatedCart = await populateCart(req.user.id);
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.cart = [];
    await user.save();
    res.status(200).json([]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};