import type types = require("../utils/types");
import db = require("../db/queries");

const homeGet: types.Middleware = async (req, res) => {
  const categories = await db.getAllCategories();
  const products = await db.getAllProducts();
  const options = await db.getAllOptions();
  res.render("index", {
    route: { page: "home" },
    categories: categories,
    products: products,
    options: options,
  });
};

export = { homeGet };
