import ex = require("express");
import oc = require("../controllers/optionController");

const optionRouter = ex.Router();

optionRouter.use((req, res, next) => {
  res.locals.route = { page: "option" };
  next();
});

optionRouter.get("/", oc.optionGet);
optionRouter.post("/new", oc.newOptionPost);
optionRouter.get("/:optionId", oc.optionDetailGet);
optionRouter.get("/:optionId/update", oc.updateOptionGet);
optionRouter.post("/:optionId/update", oc.updateOptionPost);
optionRouter.post("/:optionId/delete", oc.deleteOptionPost);

export = optionRouter;
