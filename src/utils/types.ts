import type e = require("express");

export type Middleware = (
  req: e.Request,
  res: e.Response,
  next?: e.NextFunction,
) => void;

export type ProductInput = {
  categoryId: number;
  productName: string;
  productPrice: number;
  options: [number];
};

export type OptionInput = {
  optionId: number;
  optionName: string;
  optionPrice: number;
};
