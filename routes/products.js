const {
  createproduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../contollers/products");

const express = require("express");
const product = express.Router();
product.route("/").get(getAllProducts).post(createproduct);

product
  .route("/:id")
  .get(getSingleProduct)
  .patch(updateProduct)
  .delete(deleteProduct);
module.exports = product;
