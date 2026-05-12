# Odin Inventory Application

## DB design

| category    |             |
| ----------- | ----------: |
| category_id |  int **PK** |
| name        |     varchar |
| created_at  | timestamptz |

**categories**

- bath
- kitchen
- bedroom
- daily
- nursery

---

| product     |             |
| ----------- | ----------: |
| product_id  |  int **PK** |
| category_id |  int **FK** |
| option_id   |  int **FK** |
| name        |     varchar |
| created_at  | timestamptz |

**products**

- towel
- dish_towel
- hand_towel
- pillow_cover
- sanitary
- mat
- nusring_pads
- diaper

---

| option     |             |
| ---------- | ----------: |
| option_id  |  int **PK** |
| name       |     varchar |
| created_at | timestamptz |

**options**

- pre_wash
- gift_stitch
- gift_wrap
