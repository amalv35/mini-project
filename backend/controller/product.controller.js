import Product from "../models/product.model.js";
import mongoose from "mongoose";


export const getProducts =  async (req, res) => {
    try {
      const products = await Product.find({});
      res.status(200).json({ success: true, data: products });
    } catch (error) {
      console.error("Error in fetching products:", error.message);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }

  export const createProduct =  async (req, res) => {
    const product = req.body;
  
    // Validate required fields
    if (!product.name || !product.price || !product.image) {
      return res.status(400).json({ success: false, message: "Please provide all fields" });
    }
  
    try {
      const newProduct = new Product(product);
      await newProduct.save();
      res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
      console.error("Error in creating product:", error.message);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }

  export const updateProduct =async (req, res) => {
    const { id } = req.params;
    const product = req.body;
  
    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, message: "Invalid ID" });
    }
  
    try {
      const updatedProduct = await Product.findByIdAndUpdate(id, product, {
        new: true,
        runValidators: true,
      });
      if (!updatedProduct) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }
      res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
      console.error("Error in updating product:", error.message);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }

  export const deleteProduct = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid product ID" });
    }
  
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error in deleting product:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
  };
  