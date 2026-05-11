#! /user/bin/env node

import pg = require("pg");
import fs = require("node:fs");

const SQL = `
create table if not exists category (
    category_id int primary key generated always as identity,
    name varchar ( 50 ) not null
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
    name varchar ( 50 ) not null,
        constraint fk_category
            foreign key(category_id)
                references category(category_id)
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
    name varchar ( 50 ) not null,
    layers int not null check (layers in (3, 4)) default 3,
    price int not null,
        constraint fk_product
            foreign key(product_id)
                references product(product_id)
);

insert into towel (name, layers, price)
values ('towel', 3, 15000)
     , ('towel', 4, 20000);

create table if not exists option (
    category_id int,
    product_id int,
    pre_wash boolean default false,
    gift_stich boolean default false,
    gift_wrap boolean default false,
    price int not null,
        constraint 
    primary key (category_id, product_id)
);
`;
