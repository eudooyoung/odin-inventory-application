import express = require("express");
import controller = require("../controllers/controller");
const { homeGet } =
  controller;
const { Router } = express;

const router = Router();

router.get("/", homeGet);

export = router;
