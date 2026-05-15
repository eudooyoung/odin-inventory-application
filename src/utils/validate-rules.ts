import jsConvert = require("js-convert-case");
import db = require("../db/queries");
import validator = require("express-validator");
const { body } = validator;

const nameFormatErr =
  "must only contain letters and numbers spaced by single spaces.";
const nameLengthErr = "must be between 1 and 10 characters.";
const duplicateErr = "already in use.";
const priceErr = "must be greater or equal to 0";

const validateCategory = body("categoryName")
  .trim()
  .if(async (newName, { req }) => {
    const categoryId = req.params!.categoryId;
    const { name } = await db.getCategoryById(categoryId);
    return newName !== name ? Promise.resolve(true) : Promise.reject(false);
  })
  .matches(/^[a-zA-Z0-9]+(\s[a-zA-Z0-9]+)*$/gm)
  .withMessage(`Category ${nameFormatErr}`)
  .isLength({ min: 1, max: 10 })
  .withMessage(`Category ${nameLengthErr}`)
  .custom(async (categoryName) => {
    const converted = jsConvert.toSnakeCase(categoryName).toLowerCase();
    const isDuplicate = await db.existCategoryByName(converted);
    if (isDuplicate) {
      return Promise.reject(`Category name ${duplicateErr}`);
    }
  });

const validateProduct = [
  body("categoryId"),
  body("productName")
    .trim()
    .if(async (newName, { req }) => {
      const productId = req.params!.productId;
      const { name } = await db.getProductById(productId);
      return newName !== name ? Promise.resolve(true) : Promise.reject(false);
    })
    .matches(/^[a-zA-Z0-9]+(\s[a-zA-Z0-9]+)*$/gm)
    .withMessage(`Product ${nameFormatErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Product ${nameLengthErr}`)
    .custom(async (productName) => {
      const converted = jsConvert.toSnakeCase(productName).toLowerCase();
      const isDuplicate = await db.existProductByName(converted);
      if (isDuplicate) {
        return Promise.reject(`Product ${duplicateErr}`);
      }
    }),
  body("productPrice")
    .isInt({ min: 0 })
    .withMessage(`Product price ${priceErr}`),
  body("options"),
];

export = { validateCategory, validateProduct };
