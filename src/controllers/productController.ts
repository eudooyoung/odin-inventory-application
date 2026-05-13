import type types = require("../utils/types");
import db = require("../db/queries");
import links = require("../utils/links");
import validateRule = require("../utils/validator");
import validator = require("express-validator");
const { validateCategory } = validateRule;
const { validationResult, matchedData } = validator;

const productGet: types.ControllerMiddleware = async (req, res) => {
  const products = await db.getAllProducts();
  res.render("product", {
    links: links,
    products: products,
  });
};

export = { productGet };
