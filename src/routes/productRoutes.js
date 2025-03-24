import express from "express";
import Product from "../models/Product.js";
import { addProducts, getProductsByCategory, getProductsByWishlist } from "../services/productService.js";

const router = express.Router();

// Add products (existing)
router.post("/", async (req, res) => {
  try {
    const products = req.body;
    const response = await addProducts(products);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch products by category (existing)
router.get("/:categoryName", async (req, res) => {
  try {
    const products = await getProductsByCategory(req.params.categoryName);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch products from wishlist (existing)
router.post("/wishlist", async (req, res) => {
  try {
    const { wishlist } = req.body;
    if (!wishlist || !Array.isArray(wishlist)) {
      return res.status(400).json({ error: "Invalid wishlist data" });
    }
    const products = await getProductsByWishlist(wishlist);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Increment product views when a product is clicked
router.put("/view/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } }, // Increment view count
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error updating product views" });
  }
});

router.get("/", async (req, res) => {
  try {
    const popularProducts = await Product.find().sort({ views: -1 }).limit(10);
    res.json(popularProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


export default router;
