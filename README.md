# Odin Inventory Application

## DB design

| categories |                 |
| ---------- | --------------- |
| id         | int primary key |
| name       | varchar ( 50 )  |

| items       |                 |
| ----------- | --------------- |
| id          | int primary key |
| category_id | int foreign key |
| name        | varchar ( 50 )  |

| towel         |                 |
| ------------- | --------------- |
| id            | int primary key |
| item_id       | int foreign key |
| name          | varchar ( 50 )  |
| layers        | int             |
| pre_washing   | boolean         |
| border_stitch | boolean         |
| gift_stitch   | boolean         |
| gift_wrap     | boolean         |
| price         | int             |

| dish_towel    |                 |
| ------------- | --------------- |
| id            | int primary key |
| item_id       | int foreign key |
| name          | varchar ( 50 )  |
| size          | varchar ( 5 )   |
| pre_washing   | boolean         |
| border_stitch | boolean         |
| gift_stitch   | boolean         |
| gift_wrap     | boolean         |
| price         | int             |

| hand_towel   |                 |
| ------------- | --------------- |
| id            | int primary key |
| item_id       | foreign key     |
| name          | varchar ( 50 )  |
| layers        | int             |
| size          | varchar ( 5 )   |
| pre_washing   | boolean         |
| border_stitch | boolean         |
| gift_stitch   | boolean         |
| gift_wrap     | boolean         |
| price         | int             |

| pillow_cover  |                 |
| ------------- | --------------- |
| id            | int primary key |
| item_id       | int foreign key |
| name          | varchar ( 50 )  |
| size          | varchar ( 5 )   |
| border_stitch | boolean         |
| gift_stitch   | boolean         |
| gift_wrap     | boolean         |
| price         | int             |

| sanitary      |                 |
| ------------- | --------------- |
| id            | int primary key |
| item_id       | id foreign key  |
| name          | varchar ( 50 )  |
| size          | varchar ( 5 )   |
| pre_washing   | boolean         |
| border_stitch | boolean         |
| gift_stitch   | boolean         |
| gift_wrap     | boolean         |
| price         | int             |

| bath_mat      |                 |
| ------------- | --------------- |
| id            | int primary key |
| item_id       | int foreign key |
| name          | varchar ( 50 )  |
| size          | varchar ( 5 )   |
| pre_washing   | boolean         |
| border_stitch | boolean         |
| gift_stitch   | boolean         |
| gift_wrap     | boolean         |
| price         | int             |

| nursery     |                 |
| ----------- | --------------- |
| id          | int primary key |
| item_id     | id foreign key  |
| name        | varchar ( 50 )  |
| set         | int             |
| pre_washing | boolean         |
| gift_stitch | boolean         |
| gift_wrap   | boolean         |
| price       | int             |

| diaper      |                 |
| ----------- | --------------- |
| id          | int primary key |
| item_id     | int foreign key |
| name        | varchar ( 50 )  |
| size        | varchar ( 5 )   |
| pre_washing | boolean         |
| gift_stitch | boolean         |
| gift_wrap   | boolean         |
| price       | int             |
