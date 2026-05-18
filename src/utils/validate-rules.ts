import jsConvert = require("js-convert-case");
import db = require("../db/queries");
import validator = require("express-validator");
const { body } = validator;

const nameFormatErr = "must only contain letters and numbers";
const nameLengthErr = "must be between 1 and 10 characters.";
const duplicateErr = "already in use.";
const priceErr = "must be greater or equal to 0";

const validateNewCategory = body("categoryName")
  .trim()
  .matches(/^[a-zA-Z0-9]+(_[a-zA-Z0-9]+)*$/gm)
  .withMessage(`Category ${nameFormatErr}`)
  .isLength({ min: 1, max: 10 })
  .withMessage(`Category ${nameLengthErr}`)
  .custom(async (categoryName) => {
    const isDuplicate = await db.existCategoryByName(categoryName);
    if (isDuplicate) {
      return Promise.reject(`Category name ${duplicateErr}`);
    }
  });

const validateUpdateCategory = body("categoryName")
  .trim()
  .matches(/^[a-zA-Z0-9]+(_[a-zA-Z0-9]+)*$/gm)
  .withMessage(`Category ${nameFormatErr}`)
  .isLength({ min: 1, max: 10 })
  .withMessage(`Category ${nameLengthErr}`)
  .custom(async (categoryName, { req }) => {
    const categoryId = req.params!.categoryId;
    const isDuplicate = await db.existCategoryByNameNotId(
      categoryName,
      categoryId,
    );
    if (isDuplicate) {
      return Promise.reject(`Category name ${duplicateErr}`);
    }
  });

const validateNewProduct = [
  body("categoryId"),
  body("productName")
    .trim()
    .matches(/^[a-zA-Z0-9]+(_[a-zA-Z0-9]+)*$/gm)
    .withMessage(`Product ${nameFormatErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Product ${nameLengthErr}`)
    .custom(async (productName) => {
      const isDuplicate = await db.existProductByName(productName);
      if (isDuplicate) {
        return Promise.reject(`Product ${duplicateErr}`);
      }
    }),
  body("productPrice")
    .isInt({ min: 0 })
    .withMessage(`Product price ${priceErr}`),
  body("options"),
];

const validateUpdateProduct = [
  body("categoryId"),
  body("productName")
    .trim()
    .matches(/^[a-zA-Z0-9]+(_[a-zA-Z0-9]+)*$/gm)
    .withMessage(`Product ${nameFormatErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Product ${nameLengthErr}`)
    .custom(async (productName, { req }) => {
      const productId = req.params!.productId;
      const isDuplicate = await db.existProductByNameNotId(
        productName,
        productId,
      );
      if (isDuplicate) {
        return Promise.reject(`Product ${duplicateErr}`);
      }
    }),
  body("productPrice")
    .isInt({ min: 0 })
    .withMessage(`Product price ${priceErr}`),
  body("options"),
];

const validateNewOption = [
  body("optionName")
    .trim()
    .matches(/^[a-zA-Z0-9]+(_[a-zA-Z0-9]+)*$/gm)
    .withMessage(`Option ${nameFormatErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Option ${nameLengthErr}`)
    .custom(async (optionName) => {
      const isDuplicate = await db.existOptionByName(optionName);
      if (isDuplicate) {
        return Promise.reject(`Option ${duplicateErr}`);
      }
    }),
  body("optionPrice").isInt({ min: 0 }).withMessage(`Option price ${priceErr}`),
];

const validateUpdateOption = [
  body("optionId"),
  body("optionName")
    .trim()
    .matches(/^[a-zA-Z0-9]+(_[a-zA-Z0-9]+)*$/gm)
    .withMessage(`Option ${nameFormatErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Option ${nameLengthErr}`)
    .custom(async (optionName, { req }) => {
      const optionId = Number(req.params!.optionId);
      const isDuplicate = await db.existOptionByNameNotId(optionName, optionId);
      if (isDuplicate) {
        return Promise.reject(`Option ${duplicateErr}`);
      }
    }),
  body("optionPrice").isInt({ min: 0 }).withMessage(`Option price ${priceErr}`),
];

export = {
  validateNewCategory,
  validateUpdateCategory,
  validateNewProduct,
  validateUpdateProduct,
  validateNewOption,
  validateUpdateOption,
};
