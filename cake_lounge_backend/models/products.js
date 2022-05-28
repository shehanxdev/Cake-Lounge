const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  productType: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  productWeight: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  countInStock: {
    type: String,
    required: true,
  },
  image1: {
    type: String,
  },
  image2: {
    type: String,
  },
  image3: {
    type: String,
  },
  image4: {
    type: String,
  },
  image5: {
    type: String,
  },
});

const products = model("products", productSchema);
module.exports = products;
