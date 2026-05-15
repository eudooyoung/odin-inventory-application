import jsConvert = require("js-convert-case");
import types = require("../utils/types");
import pool = require("./pool");
import cc = require("../utils/case-converter");

const getAllCategories = async () => {
  const { rows } = await pool.query(
    `select category_id, name
       from category
      order by category_id`,
  );
  return cc.rowsNameConverter(rows);
};

const getAllProducts = async () => {
  const { rows } = await pool.query(
    `select product_id, name
       from product
      order by category_id, product_id`,
  );
  return cc.rowsNameConverter(rows);
};

const getAllOptions = async () => {
  const { rows } = await pool.query(
    `select option_id, name
       from option`,
  );
  return cc.rowsNameConverter(rows);
};

const getCategoryById = async (categoryId: number) => {
  const { rows } = await pool.query(
    `select * 
       from category 
      where category_id = $1`,
    [categoryId],
  );
  return cc.rowsNameConverter(rows)[0];
};

const getProductsByCategoryId = async (categoryId: number) => {
  const { rows } = await pool.query(
    `select product_id, name
       from product
      where category_id = $1`,
    [categoryId],
  );
  return cc.rowsNameConverter(rows);
};

const existCategoryByName = async (categoryName: string) => {
  const { rows } = await pool.query(
    `select name 
       from category
      where name = $1`,
    [categoryName],
  );
  return rows.length > 0;
};

const insertCategory = async (categoryName: string) => {
  await pool.query(
    `insert into category (name)
     values ($1)`,
    [categoryName],
  );
};

const updateCategoryById = async (categoryName: string, categoryId: number) => {
  await pool.query(
    `update category
        set name = $1
      where category_id = $2`,
    [categoryName, categoryId],
  );
};

const deleteCategoryById = async (categoryId: number) => {
  await pool.query(
    `delete from category
      where category_id = $1`,
    [categoryId],
  );
};

const existProductByName = async (productName: string) => {
  const { rows } = await pool.query(
    `select name 
       from product
      where name = $1`,
    [productName],
  );
  return rows.length > 0;
};

const insertProduct = async ({
  categoryId,
  productName,
  productPrice,
  options,
}: types.ProductInput) => {
  // insert values into product table
  let { rows } = await pool.query(
    `insert into product (category_id, name, price)
     values ($1, $2, $3)
     returning product_id`,
    [categoryId, productName, productPrice],
  );
  rows = cc.rowsKeyConverter(rows);
  const productId = rows[0].productId;

  await insertProductOption(productId, options);
};

const insertProductOption = async (productId: number, options: [number]) => {
  const productIds = new Array(options.length).fill(productId);

  // insert values into product_option table
  await pool.query(
    `insert into product_option (product_id, option_id)
     select *
       from unnest($1::integer[], $2::integer[])
    `,
    [productIds, options],
  );
};

const getProductById = async (productId: number) => {
  const { rows } = await pool.query(
    `select * 
       from product 
      where product_id = $1`,
    [productId],
  );
  return cc.rowsNameConverter(rows)[0];
};

const getProductWithCategoryNameByProductId = async (productId: number) => {
  const { rows } = await pool.query(
    `select c.name category_name, p.* p_all
       from category c
       join product p
         on c.category_id = p.category_id
      where p.product_id = $1`,
    [productId],
  );
  return cc.rowsNameConverter(rows)[0];
};

const getOptionsByProductId = async (productId: number) => {
  const { rows } = await pool.query(
    `select o.option_id, o.name
       from product_option p
       join option o
         on p.option_id = o.option_id
      where p.product_id = $1`,
    [productId],
  );
  return cc.rowsNameConverter(rows);
};

const updateProductById = async (
  { categoryId, productName, productPrice, options }: types.ProductInput,
  productId: number,
) => {
  await pool.query(
    `
    update product
       set category_id = $1
         , name = $2
         , price = $3
     where product_id = $4`,
    [categoryId, productName, productPrice, productId],
  );

  await deleteProductOptionByProductId(productId);
  await insertProductOption(productId, options);
};

const deleteProductOptionByProductId = async (productId: number) => {
  await pool.query(
    `
    delete from product_option
     where product_id = $1
    `,
    [productId],
  );
};

export = {
  getAllCategories,
  getAllProducts,
  getAllOptions,
  getCategoryById,
  getProductsByCategoryId,
  existCategoryByName,
  insertCategory,
  updateCategoryById,
  deleteCategoryById,
  getProductById,
  existProductByName,
  insertProduct,
  getProductWithCategoryNameByProductId,
  getOptionsByProductId,
  updateProductById,
};
