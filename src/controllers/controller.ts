import type types = require("../utils/types");
import db = require("../db/queries");
import links = require("../utils/links");

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

export = { homeGet };
