import jsConvert = require("js-convert-case");
import type types = require("./types");

const caseConverterMiddleware: types.Middleware = (req, res, next) => {
  if (req.body) {
    req.body = jsConvert.camelKeys(req.body);
  }
  next!();
};

const keyConverter = (rows: any) => {
  const converted = rows.map((row: any) => jsConvert.camelKeys(row));
  return converted;
};

const nameConverter = (rows: any) => {
  const converted = rows.map((row: any) => {
    row.name = jsConvert.toSentenceCase(row.name);
    return jsConvert.camelKeys(row);
  });
  return converted;
};

export = {
  caseConverterMiddleware,
  keyConverter,
  nameConverter,
};
