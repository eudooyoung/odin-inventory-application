import type types = require("../utils/types");
import db = require("../db/queries");
import links = require("../utils/links");
import vr = require("../utils/validate-rules");
import v = require("express-validator");
import jsConvert = require("js-convert-case");

const productGet: types.Middleware = async (req, res) => {
  const categories = await db.getAllCategories();
  const products = await db.getAllProducts();
  const options = await db.getAllOptions();
  res.render("product", {
    links: links,
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
    return res.status(400).render("product", {
      links: links,
      products: products,
      categories: categories,
      options: options,
      productErrors: errors.array(),
      prev: req.body,
    });
  }
  const data = v.matchedData(req);
  const converted = jsConvert.camelKeys(data) as types.ProductInput;
  await db.insertProduct(converted);
  res.redirect("/product");
};

const newProductPost = [...vr.validateProduct, newProductPostMiddleware];

const productDetailGet: types.Middleware = async (req, res) => {
  const products = await db.getAllProducts();
  const productId = Number(req.params.productId);
  const productWithCategoryName =
    await db.getProductWithCategoryNameByProductId(productId);
  console.log(productWithCategoryName);
  const options = await db.getOptionsByProductId(productId);
  console.log(options);
  res.render("product", {
    route: "detail",
    links: links,
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
  res.render("product", {
    route: "update",
    links: links,
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
    return res.status(400).render("product", {
      route: "update",
      links: links,
      products: products,
      product: product,
      categories: categories,
      options: options,
      productOptionIds: productOptionIds,
      productErrors: errors.array(),
    });
  }
  const data = v.matchedData(req);
  const converted = jsConvert.camelKeys(data) as types.ProductInput;
  await db.updateProductById(converted, productId);
  res.redirect(`/product/${productId}`);
};

const updateProductPost = [...vr.validateProduct, updateProductMiddleware];

export = {
  productGet,
  newProductPost,
  productDetailGet,
  updateProductGet,
  updateProductPost,
};
