const mongoose = require("mongoose");
const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide a product name"],
    maxLength: 50,
  },
  category: {
    type: String,
    required: [true, "please enter a category"],
    maxLength: 50,
  },
  price: {
    type: Number,
    required: [true, "please enter a price for the product"],
  },

  model: {
    type: String,
    default: "no model",
    maxLength: 50,
  },
  colour: {
    type: String,
    default: "no colour",
  },
  numberOfProduct: {
    type: Number,
  },
  productDescription: {
    type: String,
  },
  productImgUrl: {
    type: String,
  },
});

module.exports = mongoose.model("Product", productsSchema);
