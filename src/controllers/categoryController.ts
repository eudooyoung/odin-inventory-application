import type types = require("../utils/types");
import db = require("../db/queries");
import links = require("../utils/links");
import vr = require("../utils/validate-rules");
import v = require("express-validator");
import cc = require("../utils/case-converter");

const categoryGet: types.Middleware = async (req, res) => {
  const categories = await db.getAllCategories();
  res.render("category", {
    links: links,
    categories: categories,
  });
};

const newCategoryPostMiddleware: types.Middleware = async (req, res) => {
  const errors = v.validationResult(req);
  if (!errors.isEmpty()) {
    const categories = await db.getAllCategories();
    const products = await db.getAllProducts();
    return res.status(400).render("category", {
      links: links,
      categories: categories,
      products: products,
      categoryErrors: errors.array(),
      prev: cc.prevBodyCaseConverter(req.body),
    });
  }
  const { categoryName } = v.matchedData(req);
  await db.insertCategory(categoryName);
  res.redirect("/category");
};

const newCategoryPost = [vr.validateNewCategory, newCategoryPostMiddleware];

const categoryDetailGet: types.Middleware = async (req, res) => {
  const categories = await db.getAllCategories();
  const categoryId = Number(req.params.categoryId);
  const category = await db.getCategoryById(categoryId);
  const products = await db.getProductsByCategoryId(categoryId);
  res.render("category", {
    route: "detail",
    links: links,
    categories: categories,
    category: category,
    products: products,
  });
};

const updateCategoryGet: types.Middleware = async (req, res) => {
  const categories = await db.getAllCategories();
  const categoryId = Number(req.params.categoryId);
  const category = await db.getCategoryById(categoryId);
  const products = await db.getProductsByCategoryId(categoryId);
  res.render("category", {
    route: "update",
    links: links,
    categories: categories,
    category: category,
    products: products,
  });
};

const updateCategoryPostMiddleware: types.Middleware = async (req, res) => {
  const categoryId = Number(req.params.categoryId);
  const errors = v.validationResult(req);
  if (!errors.isEmpty()) {
    const categories = await db.getAllCategories();
    const category = await db.getCategoryById(categoryId);
    const products = await db.getProductsByCategoryId(categoryId);
    return res.status(400).render("category", {
      route: "update",
      links: links,
      categories: categories,
      category: category,
      products: products,
      categoryErrors: errors.array(),
      prev: cc.prevBodyCaseConverter(req.body),
    });
  }
  let { categoryName } = v.matchedData(req);
  categoryName = cc.toLowerSnakeCase(categoryName);
  await db.updateCategoryById(categoryName, categoryId);
  res.redirect(`/category/${categoryId}`);
};

const updateCategoryPost = [
  vr.validateUpdateCategory,
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
