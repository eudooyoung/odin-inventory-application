import express = require("express");
import productController = require("../controllers/productController");
const { Router } = express;
const { productGet } = productController;

const productRouter = Router();

productRouter.get("/", productGet);

export = productRouter;
