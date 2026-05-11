# Odin Inventory Application

## DB design

| category    |                |
| ----------- | -------------: |
| category_id |     int **PK** |
| name        | varchar ( 50 ) |

**categories**

- bath
- kitchen
- bedroom
- daily
- nursery

| product     |                |
| ----------- | -------------: |
| product_id  |     int **PK** |
| category_id |     int **FK** |
| name        | varchar ( 50 ) |

**products**

- towel
- dish_towel
- hand_towel
- pillow_cover
- sanitary
- mat
- nusring_pads
- diaper

| towel      |                |
| ---------- | -------------: |
| towel_id   |     int **PK** |
| product_id |     int **FK** |
| name       | varchar ( 50 ) |
| layers     |            int |
| price      |            int |

| dish_towel    |                |
| ------------- | -------------: |
| dish_towel_id |     int **PK** |
| product_id    |     int **FK** |
| name          | varchar ( 50 ) |
| size          |  varchar ( 5 ) |
| price         |            int |

| hand_towel    |                |
| ------------- | -------------: |
| hand_towel_id |     int **PK** |
| product_id    |         **FK** |
| name          | varchar ( 50 ) |
| layers        |            int |
| size          |  varchar ( 5 ) |
| price         |            int |

| pillow_cover    |                |
| --------------- | -------------: |
| pillow_cover_id |     int **PK** |
| product_id      |     int **FK** |
| name            | varchar ( 50 ) |
| size            |  varchar ( 5 ) |
| price           |            int |

| sanitary    |                |
| ----------- | -------------: |
| sanitary_id |     int **PK** |
| product_id  |      id **FK** |
| name        | varchar ( 50 ) |
| size        |  varchar ( 5 ) |
| price       |            int |

| mat        |                |
| ---------- | -------------: |
| mat_id     |     int **PK** |
| product_id |     int **FK** |
| name       | varchar ( 50 ) |
| size       |  varchar ( 5 ) |
| price      |            int |

| nursing_pads    |                |
| --------------- | -------------: |
| nursing_pads_id |     int **PK** |
| product_id      |     int **FK** |
| name            | varchar ( 50 ) |
| set             |            int |
| price           |            int |

| diaper     |                |
| ---------- | -------------: |
| diaper_id  |     int **PK** |
| product_id |     int **FK** |
| name       | varchar ( 50 ) |
| size       |  varchar ( 5 ) |
| price      |            int |

---

| option      |            |
| ----------- | ---------: |
| option_id   | int **PK** |
| product_id  | int **FK** |
| pre_wash    |    boolean |
| gift_stitch |    boolean |
| gift_wrap   |    boolean |
| price       |    integer |
