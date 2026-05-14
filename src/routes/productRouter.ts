import ex = require("express");
import pc = require("../controllers/productController");

const productRouter = ex.Router();

productRouter.get("/", pc.productGet);
productRouter.post("/new", pc.newProductPost);
productRouter.get("/:productId", pc.productDetailGet);
productRouter.get("/:productId/update", pc.updateProductGet)

export = productRouter;
