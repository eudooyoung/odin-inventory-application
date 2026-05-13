import express = require("express");
import categoryController = require("../controllers/categoryController");
const { Router } = express;
const {
  categoryGet,
  categoryDetailGet,
  newCategoryPost,
  updateCategoryGet,
  updateCategoryPost,
  deleteCategoryPost,
} = categoryController;

const categoryRouter = Router();

categoryRouter.get("/", categoryGet);
categoryRouter.get("/:categoryId", categoryDetailGet);
categoryRouter.post("/new", newCategoryPost);
categoryRouter.get("/:categoryId/update", updateCategoryGet);
categoryRouter.post("/:categoryId/update", updateCategoryPost);
categoryRouter.post("/:categoryId/delete", deleteCategoryPost)

export = categoryRouter;
