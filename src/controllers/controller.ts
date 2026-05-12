import type types = require("../utils/types");
import db = require("../db/queries");

const links = [{ href: "/", text: "Home" }];

const homeGet: types.ControllerMiddleware = async (req, res) => {
  const categories = await db.getAllCategories();
  const products = await db.getAllProducts();
  res.render("index", {
    title: "Home",
    links: links,
    categories: categories,
    products: products,
  });
};

export = { homeGet };
