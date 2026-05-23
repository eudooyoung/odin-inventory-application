import type types = require("../utils/types");
import db = require("../db/queries");
import vr = require("../utils/validate-rules");
import v = require("express-validator");
import converter = require("../utils/case-converter");

const categoryGet: types.Middleware = async (req, res) => {
  const categories = await db.getAllCategories();
  res.render("index", {
    categories: categories,
  });
};

const newCategoryPostMiddleware: types.Middleware = async (req, res) => {
  const errors = v.validationResult(req);
  if (!errors.isEmpty()) {
    const categories = await db.getAllCategories();
    return res.status(400).render("index", {
      categories: categories,
      categoryErrors: errors.array(),
      prev: converter.prevBodyCaseConverter(req.body),
    });
  }
  const { categoryName } = v.matchedData(req);
  await db.insertCategory(categoryName);
  res.redirect("/category");
};

const newCategoryPost = [...vr.validateNewCategory, newCategoryPostMiddleware];

const categoryDetailGet: types.Middleware = async (req, res) => {
  const categoryId = Number(req.params.categoryId);
  const [categories, category, products] = await Promise.all([
    db.getAllCategories(),
    db.getCategoryById(categoryId),
    db.getProductsByCategoryId(categoryId),
  ]);
  res.render("index", {
    route: { ...res.locals.route, to: "detail" },
    categories: categories,
    category: category,
    products: products,
    adminPw: process.env.ADMIN_PW,
  });
};

const updateCategoryGet: types.Middleware = async (req, res) => {
  const categoryId = Number(req.params.categoryId);
  const [categories, category, products] = await Promise.all([
    db.getAllCategories(),
    db.getCategoryById(categoryId),
    db.getProductsByCategoryId(categoryId),
  ]);
  res.render("index", {
    route: { ...res.locals.route, to: "update" },
    categories: categories,
    category: category,
    products: products,
    adminPw: process.env.ADMIN_PW,
  });
};

const updateCategoryPostMiddleware: types.Middleware = async (req, res) => {
  const categoryId = Number(req.params.categoryId);
  const errors = v.validationResult(req);
  if (!errors.isEmpty()) {
    const [categories, category, products] = await Promise.all([
      db.getAllCategories(),
      db.getCategoryById(categoryId),
      db.getProductsByCategoryId(categoryId),
    ]);
    return res.status(400).render("index", {
      route: { ...res.locals.route, to: "update" },
      categories: categories,
      category: category,
      products: products,
      adminPw: process.env.ADMIN_PW,
      categoryErrors: errors.array(),
      prev: converter.prevBodyCaseConverter(req.body),
    });
  }
  let { categoryName } = v.matchedData(req);
  categoryName = converter.toLowerSnakeCase(categoryName);
  await db.updateCategoryById(categoryName, categoryId);
  res.redirect(`/category/${categoryId}`);
};

const updateCategoryPost = [
  ...vr.validateUpdateCategory,
  updateCategoryPostMiddleware,
];

const deleteCategoryPost: types.Middleware = async (req, res) => {
  const categoryId = Number(req.params.categoryId);
  await db.deleteCategoryById(categoryId);
  res.redirect("/category");
};

export = {
  categoryGet,
  categoryDetailGet,
  newCategoryPost,
  updateCategoryGet,
  updateCategoryPost,
  deleteCategoryPost,
};
