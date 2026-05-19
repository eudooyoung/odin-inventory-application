import type types = require("../utils/types");
import db = require("../db/queries");
import vr = require("../utils/validate-rules");
import v = require("express-validator");
import jsConvert = require("js-convert-case");
import converter = require("../utils/case-converter");

const productGet: types.Middleware = async (req, res) => {
  const categories = await db.getAllCategories();
  const products = await db.getAllProducts();
  const options = await db.getAllOptions();
  res.render("index", {
    products: products,
    categories: categories,
    options: options,
  });
};

const newProductPostMiddleware: types.Middleware = async (req, res) => {
  const errors = v.validationResult(req);
  if (!errors.isEmpty()) {
    const categories = await db.getAllCategories();
    const products = await db.getAllProducts();
    const options = await db.getAllOptions();
    return res.status(400).render("index", {
      products: products,
      categories: categories,
      options: options,
      productErrors: errors.array(),
      prev: converter.prevBodyCaseConverter(req.body),
    });
  }
  let data = v.matchedData(req) as types.ProductInput;
  data = {
    ...data,
    productPrice: Number(data.productPrice),
  };
  await db.insertProduct(data);
  res.redirect("/product");
};

const newProductPost = [...vr.validateNewProduct, newProductPostMiddleware];

const productDetailGet: types.Middleware = async (req, res) => {
  const products = await db.getAllProducts();
  const productId = Number(req.params.productId);
  const productWithCategoryName =
    await db.getProductWithCategoryNameByProductId(productId);
  const options = await db.getOptionsByProductId(productId);
  res.render("index", {
    route: { ...res.locals.route, to: "detail" },
    products: products,
    productWithCategoryName: jsConvert.camelKeys(productWithCategoryName),
    options: options,
  });
};

const updateProductGet: types.Middleware = async (req, res) => {
  const products = await db.getAllProducts();
  const productId = Number(req.params.productId);
  const product = await db.getProductById(productId);
  const categories = await db.getAllCategories();
  const options = await db.getAllOptions();
  const productOptions = await db.getOptionsByProductId(productId);
  const productOptionIds = productOptions.map(
    (option: { optionId: string }) => option.optionId,
  );
  res.render("index", {
    route: { ...res.locals.route, to: "update" },
    products: products,
    product: product,
    categories: categories,
    options: options,
    productOptionIds: productOptionIds,
  });
};

const updateProductMiddleware: types.Middleware = async (req, res) => {
  const productId = Number(req.params.productId);
  const errors = v.validationResult(req);
  if (!errors.isEmpty()) {
    const products = await db.getAllProducts();
    const product = await db.getProductById(productId);
    const categories = await db.getAllCategories();
    const options = await db.getAllOptions();
    const productOptions = await db.getOptionsByProductId(productId);
    const productOptionIds = productOptions.map(
      (option: { optionId: string }) => option.optionId,
    );
    return res.status(400).render("index", {
      route: { ...res.locals.route, to: "update" },
      products: products,
      product: product,
      categories: categories,
      options: options,
      productOptionIds: productOptionIds,
      productErrors: errors.array(),
    });
  }
  let data = v.matchedData(req) as types.ProductInput;
  data = { ...data, productPrice: Number(data.productPrice) };
  await db.updateProductById(data, productId);
  res.redirect(`/product/${productId}`);
};

const updateProductPost = [
  ...vr.validateUpdateProduct,
  updateProductMiddleware,
];

const deleteProductPost: types.Middleware = async (req, res) => {
  const productId = Number(req.params.productId);
  await db.deleteProductById(productId);
  res.redirect("/product");
};

export = {
  productGet,
  newProductPost,
  productDetailGet,
  updateProductGet,
  updateProductPost,
  deleteProductPost,
};
