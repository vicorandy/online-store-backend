const ProductModel = require("../models/productsModel");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors/index");

const createproduct = async function (req, res) {
  const product = await ProductModel.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async function (req, res) {
  const { query } = req.query;
  const search = {};
  if (query) {
    const productByName = await ProductModel.find({
      name: { $regex: query, $options: "i" },
    });
    const productByModel = await ProductModel.find({
      model: { $regex: query, $options: "i" },
    });
    const productByCategory = await ProductModel.find({
      category: { $regex: query, $options: "i" },
    });

    search.name = productByName;
    search.model = productByModel;
    search.category = productByCategory;

    const products = [...search.name, ...search.model, ...search.category];
    if (products.length === 0) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "sorry we could not find such product." });
      return;
    }
    res
      .status(StatusCodes.OK)
      .json({ nunmberofprod: products.length, products });
  }
  if (!query) {
    const products = await ProductModel.find({});

    res
      .status(StatusCodes.OK)
      .json({ nunmberofprod: products.length, products });
  }
};

const getSingleProduct = async function (req, res) {
  const { id } = req.params;
  const product = await ProductModel.findOne({ _id: id });
  if (!product) {
    throw new NotFoundError(
      "sorry we could not find that product with that Id"
    );
  }
  res.status(StatusCodes.OK).json({ product });
};

const updateProduct = async function (req, res) {
  const { id } = req.params;
  const { numberOfProduct } = req.body;
  if (numberOfProduct === "") {
    throw new BadRequestError("please provide the new number of products");
  }
  const product = await ProductModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    throw new NotFoundError(`sorry there is no ptoduct with id:${id}`);
  }
  res.status(StatusCodes.OK).json({ product });
};

const deleteProduct = async function (req, res) {
  const { id } = req.params;
  const product = await ProductModel.findOneAndDelete({ _id: id });
  if (!product) {
    throw new NotFoundError(`No product found with the id:${id}`);
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: "product deleted sucessfully", product });
};

module.exports = {
  createproduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
