import type types = require("./types");

const links = [
  { href: "/home", text: "Home" },
  { href: "/category", text: "Categories" },
  { href: "/product", text: "Products" },
  { href: "/option", text: "Options" },
];

const linkMiddleWare: types.Middleware = (req, res, next) => {
  res.locals.links = links;
  next!();
}

export = linkMiddleWare;
