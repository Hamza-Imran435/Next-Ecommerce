const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const ProductModel = require("./models/Product");



const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/Crud");

app.get("/getProduct", (req, res) => {
  ProductModel.find({})
    .then((products) => {
      res.json({
        success: true,
        message: "Products retrieved successfully",
        data: products,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve products",
        error: err.message,
      });
    });
});

app.post("/createProduct", (req, res) => {
  ProductModel.create(req.body)
    .then((products) => {
      res.json({
        success: true,
        message: "Products retrieved successfully",
        data: products,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve products",
        error: err.message,
      });
    });
});







app.listen(3001, () => {
  console.log("runsing");
});

app.post("/deleteProduct", (req, res) => {
  const productId = req.body.productId; // Assuming the ID is sent in the request body

  ProductModel.findByIdAndDelete(productId)
    .then((deletedProduct) => {
      if (!deletedProduct) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
      res.json({
        success: true,
        message: "Product deleted successfully",
        data: deletedProduct,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Failed to delete product",
        error: err.message,
      });
    });
});
app.post("/updateProduct", (req, res) => {
  const { productId, name, color, weight, category } = req.body; // Destructure properties from the request body

  // Check if productId is provided
  if (!productId) {
    return res.status(400).json({
      success: false,
      message: "Product ID is required",
    });
  }

  // Find the product by its ID and update its properties
  ProductModel.findByIdAndUpdate(
    productId,
    { name, color, weight, category },
    { new: true } // Return the updated product
  )
    .then((updatedProduct) => {
      // Check if the product was found and updated successfully
      if (!updatedProduct) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
      // Send a success response with the updated product
      res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: updatedProduct,
      });
    })
    .catch((err) => {
      // Handle errors
      res.status(500).json({
        success: false,
        message: "Failed to update product",
        error: err.message,
      });
    });
});






const ITEMS_PER_PAGE = 10; // Number of items per page

app.post("/get_USER_PAGINATION", async (req, res) => {
  const page = req.body.page || 1; // Default to page 1 if not provided

  try {
    const products = await ProductModel.find()
      .skip((page - 1) * ITEMS_PER_PAGE) // Skip records based on the page number
      .limit(ITEMS_PER_PAGE); // Limit records to the specified number per page

    const totalItems = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    res.json({
      success: true,
      message: "Products retrieved successfully",
      data: products,
      pagination: {
        totalItems: totalItems,
        totalPages: totalPages,
        currentPage: page
      }
    });
  } catch (error) {
    console.error("Failed to retrieve products:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve products",
      error: error.message
    });
  }
});