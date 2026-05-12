#! /user/bin/env node

import pg = require("pg");
import fs = require("node:fs");

const SQL = `
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

create table if not exists product (
    product_id int primary key generated always as identity,
    category_id int not null,
    name varchar ( 50 ) not null unique,
    created_at timestamptz default now(),
    constraint fk_category
        foreign key(category_id)
        references category(category_id)
        on delete cascade
);

insert into product (category_id, name)
values (1, 'towel')
     , (2, 'dish_towel')
     , (2, 'hand_towel')
     , (3, 'pillow_cover')
     , (4, 'sanitary')
     , (4, 'mat')
     , (5, 'nursing_pads')
     , (5, 'diaper');

create table if not exists towel (
    towel_id int primary key generated always as identity,
    product_id int not null check (product_id = 1) default 1,
    name varchar ( 50 ) not null unique,
    layers int not null check (layers in (3, 4)) default 3,
    price int not null,
    created_at timestamptz default now(),
    constraint fk_product
        foreign key(product_id)
        references product(product_id)
        on delete cascade
);

create table if not exists dish_towel (
    dish_towel_id int primary key generated always as identity,
    product_id int not null check (product_id = 2) default 2,
    name varchar ( 50 ) not null unique,
    size varchar ( 5 ) not null check (size in ('S', 'M')) default 'S',
    price int not null,
    created_at timestamptz default now(),
    constraint fk_product
        foreign key(product_id)
        references product(product_id)
        on delete cascade
);

create table if not exists hand_towel (
    hand_towel_id int primary key generated always as identity,
    product_id int not null check (product_id = 2) default 2,
    name varchar ( 50 ) not null unique,
    layers int not null check (layers in (3, 4)) default 3,
    size varchar ( 5 ) not null check (size in ('S', 'M')) default 'S',
    price int not null,
    created_at timestamptz default now(),
    constraint fk_product
        foreign key(product_id)
        references product(product_id)
        on delete cascade
);

create table if not exists pillow_cover (
    pillow_cover_id int primary key generated always as identity,
    product_id int not null check (product_id = 3) default 3,
    name varchar ( 50 ) not null unique,
    size varchar ( 5 ) not null check (size in ('S', 'M', 'L', 'C')) default 'S',
    price int not null,
    created_at timestamptz default now(),
    constraint fk_product
        foreign key(product_id)
        references product(product_id)
        on delete cascade
);

create table if not exists sanitary (
    sanitary_id int primary key generated always as identity,
    product_id int not null check (product_id = 4) default 4,
    name varchar ( 50 ) not null unique,
    size varchar ( 5 ) not null check (size in ('P', 'S', 'M', 'L', 'O')) default 'P',
    price int not null,
    created_at timestamptz default now(),
    constraint fk_product
        foreign key(product_id)
        references product(product_id)
        on delete cascade
);

create table if not exists mat (
    mat_id int primary key generated always as identity,
    product_id int not null check (product_id = 4) default 4,
    name varchar ( 50 ) not null unique,
    size varchar ( 5 ) not null check (size in ('M', 'L')) default 'M',
    price int not null,
    created_at timestamptz default now(),
    constraint fk_product
        foreign key(product_id)
        references product(product_id)
        on delete cascade
);

create table if not exists nursing_pads (
    nursing_pads_id int primary key generated always as identity,
    product_id int not null check (product_id = 5) default 5,
    name varchar ( 50 ) not null unique,
    sets int not null check (sets in (1, 3, 5)) default 1,
    price int not null,
    created_at timestamptz default now(),
    constraint fk_product
        foreign key(product_id)
        references product(product_id)
        on delete cascade
);

create table if not exists diaper (
    diaper_id int primary key generated always as identity,
    product_id int not null check (product_id = 5) default 5,
    name varchar ( 50 ) not null unique,
    size varchar ( 5 ) not null check (size in ('S', 'M', 'L')) default 'S',
    price int not null,
    created_at timestamptz default now(),
    constraint fk_product
        foreign key(product_id)
        references product(product_id)
        on delete cascade
);
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
