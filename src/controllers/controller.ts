import type types = require("../utils/types");
import db = require("../db/queries");

const homeGet: types.Middleware = async (req, res) => {
  console.time("db");
  const [categories, products, options] = await Promise.all([
    db.getAllCategories(),
    db.getAllProducts(),
    db.getAllOptions(),
  ]);
  console.timeEnd("db");
  res.render("index", {
    route: { page: "home" },
    categories: categories,
    products: products,
    options: options,
  });
};

export = { homeGet };
