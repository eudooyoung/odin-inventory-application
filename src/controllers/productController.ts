import type types = require("../utils/types");
import db = require("../db/queries");
import vr = require("../utils/validate-rules");
import v = require("express-validator");
import converter = require("../utils/case-converter");

const productGet: types.Middleware = async (req, res) => {
  const [categories, products, options] = await Promise.all([
    db.getAllCategories(),
    db.getAllProducts(),
    db.getAllOptions(),
  ]);
  res.render("index", {
    products: products,
    categories: categories,
    options: options,
  });
};

const newProductPostMiddleware: types.Middleware = async (req, res) => {
  const errors = v.validationResult(req);
  if (!errors.isEmpty()) {
    const [categories, products, options] = await Promise.all([
      db.getAllCategories(),
      db.getAllProducts(),
      db.getAllOptions(),
    ]);
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
  const productId = Number(req.params.productId);
  const [products, product, { categoryName }, options] = await Promise.all([
    db.getAllProducts(),
    db.getProductById(productId),
    (await db.getCategoryNameByProductId(productId)) as {
      categoryName: string;
    },
    db.getOptionsByProductId(productId),
  ]);
  res.render("index", {
    route: { ...res.locals.route, to: "detail" },
    products: products,
    product: product,
    categoryName: categoryName,
    options: options,
    adminPw: process.env.ADMIN_PW,
  });
};

const updateProductGet: types.Middleware = async (req, res) => {
  const productId = Number(req.params.productId);
  const [products, product, categories, options, productOptions] =
    await Promise.all([
      db.getAllProducts(),
      db.getProductById(productId),
      db.getAllCategories(),
      db.getAllOptions(),
      db.getOptionsByProductId(productId),
    ]);
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
    adminPw: process.env.ADMIN_PW,
  });
};

const updateProductMiddleware: types.Middleware = async (req, res) => {
  const productId = Number(req.params.productId);
  const errors = v.validationResult(req);
  if (!errors.isEmpty()) {
    const [products, product, categories, options, productOptions] =
      await Promise.all([
        db.getAllProducts(),
        db.getProductById(productId),
        db.getAllCategories(),
        db.getAllOptions(),
        db.getOptionsByProductId(productId),
      ]);
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
      adminPw: process.env.ADMIN_PW,
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
