import pool = require("./pool");

const getAllCategories = async () => {
  const { rows } = await pool.query("select * from category");
  return rows;
};

const getAllProducts = async () => {
  const { rows } = await pool.query("select * from product");
  return rows;
};

const getAllOptions = async () => {
  const { rows } = await pool.query("select * from option");
  return rows;
};

export = { getAllCategories, getAllProducts, getAllOptions };
