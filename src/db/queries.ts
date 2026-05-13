import type types = require("../utils/types");
import pool = require("./pool");

const getAllCategories = async () => {
  const { rows } = await pool.query(
    "select category_id, name from category order by category_id",
  );
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

const findCategoryById = async (categoryId: number) => {
  const { rows } = await pool.query(
    "select * from category where category_id = $1",
    [categoryId],
  );
  return rows[0];
};

const findProductsByCategoryId = async (categoryId: number) => {
  const { rows } = await pool.query(
    "select product_id, name from product where category_id = $1",
    [categoryId],
  );
  return rows;
};

const findCategoryByName = async (categoryName: string) => {
  const { rows } = await pool.query("select * from category where name = $1", [
    categoryName,
  ]);
  return rows[0];
};

const insertCategory = async (categoryName: string) => {
  await pool.query("insert into category (name) values ($1)", [categoryName]);
};

const updateCategoryById = async (categoryName: string, categoryId: number) => {
  await pool.query("update category set name = $1 where category_id = $2", [
    categoryName,
    categoryId,
  ]);
};

const deleteCategoryById = async (categoryId: number) => {
  await pool.query("delete from category where category_id = $1", [categoryId]);
};

const findProductByName = async (productName: string) => {
  const { rows } = await pool.query("select * from product where name = $1", [
    productName,
  ]);
  return rows[0];
};

const insertProduct = async ({
  categoryId,
  productName,
  productPrice,
}: types.ProductInput) => {
  await pool.query(
    "insert into product (category_id, name, price) values ($1, $2, $3)",
    [categoryId, productName, productPrice],
  );
};

export = {
  getAllCategories,
  getAllProducts,
  getAllOptions,
  findCategoryById,
  findProductsByCategoryId,
  findCategoryByName,
  insertCategory,
  updateCategoryById,
  deleteCategoryById,
  findProductByName,
  insertProduct,
};
