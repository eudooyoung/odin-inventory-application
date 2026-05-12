#! /user/bin/env node

import pg = require("pg");
import fs = require("node:fs");

const SQL = `
drop table if exists category
                   , option
                   , product cascade;

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
    created_at timestamptz default now()
);

create table if not exists product (
    product_id int primary key generated always as identity,
    category_id int not null,
    option_id int not null,
    name varchar ( 50 ) not null unique,
    created_at timestamptz default now(),
    constraint fk_category
        foreign key(category_id)
        references category(category_id)
        on delete cascade,
    constraint fk_option
        foreign key(option_id)
        references option(option_id)
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
