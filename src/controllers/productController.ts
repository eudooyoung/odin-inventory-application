import type types = require("../utils/types");
import db = require("../db/queries");
import links = require("../utils/links");
import vr = require("../utils/validator");
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

const newProductPostMiddleware: types.Middleware = async (
  req,
  res,
) => {
  const errors = v.validationResult(req);
  if (!errors.isEmpty()) {
    const categories = await db.getAllCategories();
    const products = await db.getAllProducts();
    return res.status(400).render("product", {
      links: links,
      products: products,
      categories: categories,
      productErrors: errors.array(),
      prev: req.body,
    });
  }
  const data = v.matchedData(req);
  const coverted = jsConvert.camelKeys(data) as types.ProductInput;
  await db.insertProduct(coverted);
  res.redirect("/product");
};

const newProductPost = [...vr.validateProduct, newProductPostMiddleware];

const productDetailGet: types.Middleware = async (req, res) => {
  const products = await db.getAllProducts();
  const productId = Number(req.params.productId);
  const productWithCategoryName =
    await db.getProductWithCategoryNameByProductId(productId);
  const options = await db.getOptionsByProductId(productId);
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
  const productWithCategoryName =
    await db.getProductWithCategoryNameByProductId(productId);
  const options = await db.getOptionsByProductId(productId);
  res.render("product", {
    route: "update",
    links: links,
    products: products,
    productWithCategoryName: jsConvert.camelKeys(productWithCategoryName),
    options: options,
  });
};

export = { productGet, newProductPost, productDetailGet, updateProductGet };
