#! /user/bin/env node

import pg = require("pg");
import fs = require("node:fs");

const SQL = `
drop table if exists category
                   , product
                   , option
                   , product_option cascade;

set timezone = 'Asia/Seoul';

create table if not exists category (
    category_id int primary key generated always as identity,
    name varchar ( 50 ) not null unique,
    created_at timestamptz default now()
);

insert into category (name)
values ('bath')
     , ('kitchen')
     , ('bedroom')
     , ('daily')
     , ('nursery');

create table if not exists option (
    option_id int primary key generated always as identity,
    name varchar ( 50 ) not null unique,
    price int not null,
    created_at timestamptz default now()
);

create table if not exists product (
    product_id int primary key generated always as identity,
    category_id int not null,
    name varchar ( 50 ) not null unique,
    price int not null,
    created_at timestamptz default now(),
    constraint fk_category
        foreign key(category_id)
        references category(category_id)
        on delete cascade
);

insert into product (category_id, name, price)
values (1, 'towel', 15000)
     , (2, 'dish_towel', 4000)
     , (2, 'hand_towel', 6000)
     , (3, 'pillow_cover', 20000)
     , (4, 'sanitary', 3000)
     , (4, 'mat', 40000)
     , (5, 'nursing_pads', 20000)
     , (5, 'diaper', 4000);

create table if not exists option (
    option_id int primary key generated always as identity,
    name varchar ( 50 ) not null unique,
    price int not null,
    created_at timestamptz default now()
);

insert into option (name, price)
values ('pre_wash_none', 0)
     , ('pre_wash', 5800)
     , ('border_stitch', 2000)
     , ('gift_stitch', 3000)
     , ('gift_wrap', 2000)
     , ('towel_layers_3', 0)
     , ('towel_layers_4', 5000)
     , ('dish_towel_size_s', 0)
     , ('dish_towel_size_m', 2000)
     , ('hand_towel_layers_3', 0)
     , ('hand_towel_layers_4', 2000)
     , ('hand_towel_size_s', 0)
     , ('hand_towel_size_m', 2000)
     , ('pillow_cover_size_s', 0)
     , ('pillow_cover_size_m', 4000)
     , ('pillow_cover_size_l', 6000)
     , ('pillow_cover_size_c', 15000)
     , ('sanitary_size_p', 0)
     , ('sanitary_size_s', 1000)
     , ('sanitary_size_m', 1500)
     , ('sanitary_size_l', 2000)
     , ('sanitary_size_o', 3000)
     , ('mat_size_s', 0)
     , ('mat_size_m', 30000)
     , ('nursing_pads_sets_1', 0)
     , ('nursing_pads_sets_3', 58000)
     , ('nursing_pads_sets_5', 96000)
     , ('diaper_size_s', 0)
     , ('diaper_size_m', 1500)
     , ('diaper_size_l', 3000);

create table if not exists product_option (
    product_id int not null,
    option_id int not null,
    constraint fk_product
        foreign key(product_id)
        references product(product_id)
        on delete cascade,
    constraint fk_option
        foreign key(option_id)
        references option(option_id)
        on delete cascade,
    primary key(product_id, option_id)
);

insert into product_option (product_id, option_id)
values (1, 1)
     , (1, 2)
     , (1, 3)
     , (1, 4)
     , (1, 5)
     , (1, 6)
     , (1, 7)
     , (2, 1)
     , (2, 2)
     , (2, 3)
     , (2, 4)
     , (2, 5)
     , (2, 8)
     , (2, 9)
     , (3, 1)
     , (3, 2)
     , (3, 3)
     , (3, 4)
     , (3, 5)
     , (3, 10)
     , (3, 11)
     , (3, 12)
     , (3, 13)
     , (4, 1)
     , (4, 2)
     , (4, 3)
     , (4, 4)
     , (4, 5)
     , (4, 14)
     , (4, 15)
     , (4, 16)
     , (4, 17)
     , (5, 1)
     , (5, 2)
     , (5, 3)
     , (5, 4)
     , (5, 5)
     , (5, 18)
     , (5, 19)
     , (5, 20)
     , (5, 21)
     , (5, 22)
     , (6, 1)
     , (6, 2)
     , (6, 3)
     , (6, 4)
     , (6, 5)
     , (6, 23)
     , (6, 24)
     , (7, 1)
     , (7, 2)
     , (7, 3)
     , (7, 5)
     , (7, 25)
     , (7, 26)
     , (7, 27)
     , (8, 1)
     , (8, 2)
     , (8, 3)
     , (8, 5)
     , (8, 28)
     , (8, 29)
     , (8, 30);
`;

const main = async () => {
  console.log("seeding...");
  let client: pg.Client;
  if (process.argv[2] === "local") {
    console.log("building client for local db...");
    client = new pg.Client({
      connectionString: process.env.LOCAL_DB_URL,
    });
  } else {
    console.log("building client for remote db...");
    client = new pg.Client({
      user: process.env.REMOTE_DB_USER,
      password: process.env.REMOTE_DB_PW,
      host: process.env.REMOTE_DB_HOST,
      port: Number(process.env.REMOTE_DB_PORT),
      database: process.env.REMOTE_DB_NAME,
      ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync("./ca.pem").toString(),
      },
    });
  }
  console.log("client built...");
  try {
    await client.connect();
    console.log("client connected to db...");
    await client.query(SQL);
    console.log("tables successfully populated!");
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
};

main();
