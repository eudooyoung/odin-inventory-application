# Odin Inventory Application

## DB design

| category    |                |
| ----------- | -------------: |
| category_id |     int **PK** |
| name        | varchar ( 50 ) |
| created_at  |    timestamptz |

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
| created_at  |    timestamptz |

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
| created_at |    timestamptz |

| dish_towel    |                |
| ------------- | -------------: |
| dish_towel_id |     int **PK** |
| product_id    |     int **FK** |
| name          | varchar ( 50 ) |
| size          |  varchar ( 5 ) |
| price         |            int |
| created_at    |    timestamptz |

| hand_towel    |                |
| ------------- | -------------: |
| hand_towel_id |     int **PK** |
| product_id    |         **FK** |
| name          | varchar ( 50 ) |
| layers        |            int |
| size          |  varchar ( 5 ) |
| price         |            int |
| created_at    |    timestamptz |

| pillow_cover    |                |
| --------------- | -------------: |
| pillow_cover_id |     int **PK** |
| product_id      |     int **FK** |
| name            | varchar ( 50 ) |
| size            |  varchar ( 5 ) |
| price           |            int |
| created_at      |    timestamptz |

| sanitary    |                |
| ----------- | -------------: |
| sanitary_id |     int **PK** |
| product_id  |      id **FK** |
| name        | varchar ( 50 ) |
| size        |  varchar ( 5 ) |
| price       |            int |
| created_at  |    timestamptz |

| mat        |                |
| ---------- | -------------: |
| mat_id     |     int **PK** |
| product_id |     int **FK** |
| name       | varchar ( 50 ) |
| size       |  varchar ( 5 ) |
| price      |            int |
| created_at |    timestamptz |

| nursing_pads    |                |
| --------------- | -------------: |
| nursing_pads_id |     int **PK** |
| product_id      |     int **FK** |
| name            | varchar ( 50 ) |
| set             |            int |
| price           |            int |
| created_at      |    timestamptz |

| diaper     |                |
| ---------- | -------------: |
| diaper_id  |     int **PK** |
| product_id |     int **FK** |
| name       | varchar ( 50 ) |
| size       |  varchar ( 5 ) |
| price      |            int |
| created_at |    timestamptz |

---

| option      |             |
| ----------- | ----------: |
| option_id   |  int **PK** |
| product_id  |  int **FK** |
| pre_wash    |     boolean |
| gift_stitch |     boolean |
| gift_wrap   |     boolean |
| price       |     integer |
| created_at  | timestamptz |
