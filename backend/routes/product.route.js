import express from "express";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controller/product.controller.js";

const router = express.Router();

// Route: GET all products
router.get("/", getProducts);

// Route: Create a new product
router.post("/", createProduct);

// Route: Update a product by ID
router.put("/:id", updateProduct);

// Route: Delete a product by ID
router.delete("/:id", deleteProduct);

export default router;
