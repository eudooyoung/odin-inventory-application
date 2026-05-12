import express = require("express");
import controller = require("../controllers/controller");
const { homeGet, newGet, newCategoryPost } = controller;
const { Router } = express;

const router = Router();

router.get("/", homeGet);
router.get("/new", newGet);
router.post("/new/category", newCategoryPost)

export = router;
