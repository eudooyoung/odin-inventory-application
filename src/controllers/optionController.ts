import type types = require("../utils/types");
import db = require("../db/queries");
import vr = require("../utils/validate-rules");
import v = require("express-validator");
import converter = require("../utils/case-converter");

const optionGet: types.Middleware = async (req, res) => {
  const options = await db.getAllOptions();
  res.render("index", {
    options: options,
  });
};

const newOptionPostMiddleware: types.Middleware = async (req, res) => {
  const errors = v.validationResult(req);
  if (!errors.isEmpty()) {
    const options = await db.getAllOptions();
    return res.status(400).render("index", {
      options: options,
      optionErrors: errors.array(),
      prev: converter.prevBodyCaseConverter(req.body),
    });
  }
  let { optionName, optionPrice } = v.matchedData(req);
  await db.insertOption(optionName, Number(optionPrice));
  res.redirect("/option");
};

const newOptionPost = [...vr.validateNewOption, newOptionPostMiddleware];

const optionDetailGet: types.Middleware = async (req, res) => {
  const options = await db.getAllOptions();
  const optionId = Number(req.params.optionId);
  const option = await db.getOptionById(optionId);
  res.render("index", {
    route: { ...res.locals.route, to: "detail" },
    options: options,
    option: option,
  });
};

const updateOptionGet: types.Middleware = async (req, res) => {
  const options = await db.getAllOptions();
  const optionId = Number(req.params.optionId);
  const option = await db.getOptionById(optionId);
  res.render("index", {
    route: { ...res.locals.route, to: "update" },
    options: options,
    option: option,
  });
};

const updateOptionPostMiddleware: types.Middleware = async (req, res) => {
  const optionId = Number(req.params.optionId);
  const errors = v.validationResult(req);
  if (!errors.isEmpty()) {
    const options = await db.getAllOptions();
    const option = await db.getOptionById(optionId);
    return res.status(400).render("index", {
      route: { ...res.locals.route, to: "update" },
      options: options,
      option: option,
      optionErrors: errors.array(),
      prev: converter.prevBodyCaseConverter(req.body),
    });
  }
  const { optionName, optionPrice } = v.matchedData(req);
  await db.updateOptionById({ optionId, optionName, optionPrice });
  res.redirect(`/option/${optionId}`);
};

const updateOptionPost = [
  ...vr.validateUpdateOption,
  updateOptionPostMiddleware,
];

const deleteOptionPost: types.Middleware = async (req, res) => {
  const optionId = Number(req.params.optionId);
  await db.deleteOptionById(optionId);
  res.redirect("/option");
};

export = {
  optionGet,
  newOptionPost,
  optionDetailGet,
  updateOptionGet,
  updateOptionPost,
  deleteOptionPost,
};
