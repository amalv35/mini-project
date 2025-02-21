import express from "express";
import Dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import productRoutes from "./routes/product.route.js";

Dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON data
app.use(express.json()); // Allows us to accept JSON data in the body

// Updated route mounting to match the frontend endpoint
app.use("/api/products", productRoutes);

// Log MongoDB connection string for debugging
console.log("MongoDB URI:", process.env.MONGO_URI);

// Start the server and connect to the database
app.listen(PORT, async () => {
  await connectDB();
  console.log("Server started at http://localhost:" + PORT);
});
