# Odin Inventory Application

## DB design

| category    |             |
| ----------- | ----------: |
| category_id |  int **PK** |
| name        |     varchar |
| created_at  | timestamptz |

---

| product     |             |
| ----------- | ----------: |
| product_id  |  int **PK** |
| category_id |  int **FK** |
| name        |     varchar |
| price       |         int |
| created_at  | timestamptz |

---

| option     |             |
| ---------- | ----------: |
| option_id  |  int **PK** |
| name       |     varchar |
| price      |         int |
| created_at | timestamptz |

---

| product_option |            |
| -------------- | ---------: |
| product_id     | int **FK** |
| option_id      | int **FK** |
