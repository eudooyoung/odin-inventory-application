import type types = require("../utils/types");
import db = require("../db/queries");

const links = [
  { href: "/", text: "Home" },
  { href: "/new", text: "New inventory" },
];

const homeGet: types.ControllerMiddleware = async (req, res) => {
  const categories = await db.getAllCategories();
  const products = await db.getAllProducts();
  const options = await db.getAllOptions();
  res.render("index", {
    title: "Home",
    links: links,
    categories: categories,
    products: products,
    options: options,
  });
};

const newGet: types.ControllerMiddleware = (req, res) => {
  res.render("new", {
    title: "New inventory",
    links: links,
  });
};

const newCategoryPost: types.ControllerMiddleware = (req, res) => {
  
};

export = { homeGet, newGet, newCategoryPost };
