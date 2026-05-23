import type types = require("../utils/types");
import db = require("../db/queries");

const homeGet: types.Middleware = async (req, res) => {
  console.time("db all");
  const categories = await db.getAllCategories();
  const products = await db.getAllProducts();
  const options = await db.getAllOptions();
  console.timeEnd("db all");
  res.render("index", {
    route: { page: "home" },
    categories: categories,
    products: products,
    options: options,
  });
};

export = { homeGet };
