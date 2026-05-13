import express = require("express");
import controller = require("../controllers/controller");
const { homeGet, newGet,  newProductPost } =
  controller;
const { Router } = express;

const router = Router();

router.get("/", homeGet);

export = router;
