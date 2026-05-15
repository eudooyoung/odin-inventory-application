import jsConvert = require("js-convert-case");
import type types = require("./types");

const caseConverterMiddleware: types.Middleware = (req, res, next) => {
  if (req.body) {
    req.body = jsConvert.camelKeys(req.body);
  }
  next!();
};

const rowsKeyConverter = (rows: any) => {
  const converted = rows.map((row: any) => jsConvert.camelKeys(row));
  return converted;
};

const rowNameConverter = (row: any) => {
  const nameKeys = Object.keys(row).filter((key) => key.includes("name"));
  nameKeys.forEach((nameKey) => {
    row[nameKey] = jsConvert.toSentenceCase(row[nameKey]);
  });
  return jsConvert.camelKeys(row);
};

const rowsNameConverter = (rows: any) => {
  const converted = rows.map((row: any) => {
    return rowNameConverter(row);
  });
  return converted;
};

const toLowerSnakeCase = (target: string) => {
  return jsConvert.toSnakeCase(target).toLowerCase();
}

export = {
  caseConverterMiddleware,
  rowsKeyConverter,
  rowsNameConverter,
  rowNameConverter,
  toLowerSnakeCase,
};
