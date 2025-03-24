import Product from '../models/Product.js';
import Category from '../models/Category.js';

export const addProducts = async (products) => {
    const savedProducts = [];
  
    for (const productData of products) {
      const { name, categoryName, price, image, description } = productData;
  
      // Find the category by name
      const category = await Category.findOne({ name: categoryName });
      if (!category) throw new Error(`Category ${categoryName} not found`);
  
      // Create a new product instance
      const product = new Product({
        name,
        category: category._id,
        price,
        image,
        description,
      });
  
      // Save the product and add it to the savedProducts array
      const savedProduct = await product.save();
      savedProducts.push(savedProduct);
    }
  
    return { message: "Products added successfully!", products: savedProducts };
  };

export const getProductsByCategory = async (categoryName) => {

    const category = await Category.findOne({ name: categoryName });
      if (!category) throw new Error(`Category ${categoryName} not found`);

  if (!category) throw new Error("Category not found");

  return await Product.find({ category: category._id });
};

export const getProductsByWishlist = async (wishlist) => {
  try {
    const products = await Product.find({ _id: { $in: wishlist } });
    return products;
  } catch (error) {
    throw new Error("Error fetching wishlist products: " + error.message);
  }
};
