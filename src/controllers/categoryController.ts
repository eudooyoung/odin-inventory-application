import type types = require("../utils/types");
import db = require("../db/queries");
import links = require("../utils/links");
import validateRule = require("../utils/validator");
import validator = require("express-validator");
const { validateCategory } = validateRule;
const { validationResult, matchedData } = validator;

const categoryGet: types.ControllerMiddleware = async (req, res) => {
  const categories = await db.getAllCategories();
  res.render("category/category", {
    links: links,
    categories: categories,
  });
};

const categoryDetailGet: types.ControllerMiddleware = async (req, res) => {
  const categories = await db.getAllCategories();
  const categoryId = Number(req.params.categoryId);
  const category = await db.findCategoryById(categoryId);
  const products = await db.findProductsByCategoryId(categoryId);
  res.render("category/category-detail", {
    title: "Categories",
    links: links,
    categories: categories,
    category: category,
    products: products,
  });
};

const newCategoryPostMiddleware: types.ControllerMiddleware = async (
  req,
  res,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const categories = await db.getAllCategories();
    const products = await db.getAllProducts();
    return res.status(400).render("category/category", {
      title: "Categories",
      links: links,
      categories: categories,
      products: products,
      categoryErrors: errors.array(),
      prev: req.body,
    });
  }
  const categoryName = matchedData(req)["category-name"];
  await db.insertCategory(categoryName);
  res.redirect("/category");
};

const newCategoryPost = [validateCategory, newCategoryPostMiddleware];

const updateCategoryGet: types.ControllerMiddleware = async (req, res) => {
  const categories = await db.getAllCategories();
  const categoryId = Number(req.params.categoryId);
  const category = await db.findCategoryById(categoryId);
  const products = await db.findProductsByCategoryId(categoryId);
  res.render("category/category-update", {
    title: "Categories",
    links: links,
    categories: categories,
    category: category,
    products: products,
  });
};

const updateCategoryPostMiddleware: types.ControllerMiddleware = async (
  req,
  res,
) => {
  const categoryId = Number(req.params.categoryId);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const categories = await db.getAllCategories();
    const category = await db.findCategoryById(categoryId);
    const products = await db.getAllProducts();
    return res.status(400).render("category/category-update", {
      title: "Categories",
      links: links,
      categories: categories,
      category: category,
      products: products,
      categoryErrors: errors.array(),
      prev: req.body,
    });
  }
  const categoryName = matchedData(req)["category-name"];
  await db.updateCategoryById(categoryName, categoryId);
  res.redirect("/category");
};

const updateCategoryPost = [validateCategory, updateCategoryPostMiddleware];

const deleteCategoryPost: types.ControllerMiddleware = async (req, res) => {
  const categoryId = Number(req.params.categoryId);
  await db.deleteCategoryById(categoryId);
  res.redirect("/category");
}

export = {
  categoryGet,
  categoryDetailGet,
  newCategoryPost,
  updateCategoryGet,
  updateCategoryPost,
  deleteCategoryPost,
};
