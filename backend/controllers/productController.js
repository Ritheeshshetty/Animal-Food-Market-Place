import Product from '../models/Product.js';

export const createProduct = async (req, res) => {
  try {
    const product = new Product({ ...req.body, supplier: req.user.id });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


export const getAllProducts = async (req, res) => {
  try {
    const { search, category, animalType } = req.query;

    const query = {};

    if (search) {
      query.name = { $regex: search, $options: 'i' }; // case-insensitive search
    }

    if (category) {
      query.category = category;
    }

    if (animalType) {
      query.animalType = animalType;
    }

    const products = await Product.find(query).populate('supplier', 'name');
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const updateProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);

    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Only supplier who created it can update
    if (product.supplier.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to update this product' });
    }

    // Update fields
    Object.assign(product, req.body);
    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getSupplierProducts = async (req, res) => {
  try {
    const products = await Product.find({ supplier: req.user.id });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('supplier', 'name');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
