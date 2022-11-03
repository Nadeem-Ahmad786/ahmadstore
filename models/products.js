const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: String,
  productDescription: String,
  productImage: String,
  productPrice: Number,
  productFeatures: Array,
  productColors: Array,
})
const Product = new mongoose.model("Product", productSchema);

module.exports = Product;