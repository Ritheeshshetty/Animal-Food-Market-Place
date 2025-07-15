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




export const getRecommendedProducts = async (req, res) => {
  try {

    const products = await Product.find()
      .lean()
      .exec();

    products.forEach(product => {
      product.avgRating = product.ratings.length
        ? product.ratings.reduce((acc, r) => acc + r, 0) / product.ratings.length
        : 0;
    });

    products.sort((a, b) => b.avgRating - a.avgRating);


    res.json(products.slice(0, 10));
  } catch (error) {
    console.error('Failed to get recommended products:', error);
    res.status(500).json({ message: 'Server error fetching recommended products' });
  }
};


export const getFeaturedProducts = async (req, res) => {
  try {
    // Top selling products (based on salesCount)
    const topSelling = await Product.find()
      .sort({ salesCount: -1 })
      .limit(4)
      .lean();

    // Top rated products (based on average rating)
    const topRated = await Product.aggregate([
      {
        $addFields: {
          avgRating: {
            $cond: {
              if: { $gt: [{ $size: "$ratings" }, 0] },
              then: { $avg: "$ratings" },
              else: 0
            }
          }
        }
      },
      { $sort: { avgRating: -1 } },
      { $limit: 4 }
    ]);

    // Function to split products by quantity options
    const splitProductsByOptions = (products) => {
      return products.flatMap(product => {
        if (!product.quantityOptions || product.quantityOptions.length === 0) {
          return [{ ...product, isOption: false }];
        }
        
        return product.quantityOptions.map(option => ({
          ...product,
          _id: `${product._id}-${option.label}`, // Unique ID for each option
          quantityOption: option,
          isOption: true
        }));
      });
    };

    res.json({
      topSelling: splitProductsByOptions(topSelling),
      topRated: splitProductsByOptions(topRated)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// productController.js


export const rateProduct = async (req, res) => {
  const { productId } = req.params;
  const { rating } = req.body;

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ error: "Invalid rating value" });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    product.ratings.push(rating);
    await product.save();

    res.json({ message: "Rating added", averageRating: product.ratings.reduce((a, b) => a + b, 0) / product.ratings.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error adding rating" });
  }
};
