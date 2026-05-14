import db = require("../db/queries");
import validator = require("express-validator");
const { body } = validator;

const alphaErr = "must only contain letters.";
const nameLengthErr = "must be between 1 and 10 characters.";
const duplicateErr = "already in use.";
const alphaNumericErr = "must only contain letters, numbers or underscore.";
const priceErr = "must be greater or equal to 0";

const validateCategory = body("categoryName")
  .trim()
  .isAlpha()
  .withMessage(`Category ${alphaErr}`)
  .isLength({ min: 1, max: 10 })
  .withMessage(`Category ${nameLengthErr}`)
  .custom(async (categoryName) => {
    const isDuplicate = !await db.existCategoryByName(categoryName);
    if (isDuplicate) {
      return Promise.reject(`Category name ${duplicateErr}`);
    }
  });

const validateProduct = [
  body("category-id"),
  body("product-name")
    .trim()
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage(`Product ${alphaNumericErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Product ${nameLengthErr}`)
    .custom(async (productName) => {
      const product = await db.findProductByName(productName);
      if (product) {
        return Promise.reject(`Product ${duplicateErr}`);
      }
    }),
  body("product-price")
    .isInt({ min: 0 })
    .withMessage(`Product price ${priceErr}`),
];

export = { validateCategory, validateProduct };
