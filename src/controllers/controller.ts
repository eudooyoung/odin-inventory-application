import type types = require("../utils/types");
import db = require("../db/queries");
import validateRule = require("../utils/validator");
import validator = require("express-validator");
import jsConvert = require("js-convert-case");
import links = require("../utils/links");
const { validateCategory, validateProduct } = validateRule;
const { validationResult, matchedData } = validator;

const homeGet: types.ControllerMiddleware = async (req, res) => {
  const categories = await db.getAllCategories();
  const products = await db.getAllProducts();
  const options = await db.getAllOptions();
  res.render("index", {
    links: links,
    categories: categories,
    products: products,
    options: options,
  });
};

const newGet: types.ControllerMiddleware = async (req, res) => {
  const categories = await db.getAllCategories();
  const products = await db.getAllProducts();
  res.render("new", {
    title: "New inventory",
    links: links,
    categories: categories,
  });
};

const newProductPostMiddleware: types.ControllerMiddleware = async (
  req,
  res,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const categories = await db.getAllCategories();
    const products = await db.getAllProducts();
    return res.status(400).render("new", {
      title: "New inventory",
      links: links,
      categories: categories,
      products: products,
      productErrors: errors.array(),
      prev: req.body,
    });
  }
  const data = matchedData(req);
  const coverted = jsConvert.camelKeys(data) as types.ProductInput;
  await db.insertProduct(coverted);
  res.redirect("/");
};

const newProductPost = [...validateProduct, newProductPostMiddleware];

export = { homeGet, newGet,  newProductPost };
