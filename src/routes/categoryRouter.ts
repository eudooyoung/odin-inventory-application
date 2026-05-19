import express = require("express");
import categoryController = require("../controllers/categoryController");
const { Router } = express;
const cc = categoryController;

const categoryRouter = Router();

categoryRouter.use((req, res, next) => {
  res.locals.route = { page: "category" };
  next();
});

categoryRouter.get("/", cc.categoryGet);
categoryRouter.post("/new", cc.newCategoryPost);
categoryRouter.get("/:categoryId", cc.categoryDetailGet);
categoryRouter.get("/:categoryId/update", cc.updateCategoryGet);
categoryRouter.post("/:categoryId/update", cc.updateCategoryPost);
categoryRouter.post("/:categoryId/delete", cc.deleteCategoryPost);

export = categoryRouter;
