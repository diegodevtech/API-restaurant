# API Restaurant

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white)
![Knex](https://img.shields.io/badge/Knex-Query%20Builder-D26B38?style=for-the-badge)
![SQLite](https://img.shields.io/badge/SQLite-3-003B57?style=for-the-badge&logo=sqlite&logoColor=white)

A clean and practical REST API for restaurant flow management: products, tables, table sessions, and orders.

Built to be simple enough for beginners, but structured enough to scale.

## Why this project exists

This API solves a real restaurant workflow:

- Register and manage products.
- List available tables.
- Open and close table sessions.
- Create orders linked to active sessions.
- Calculate the total bill for a table session.

In short: it helps you track what was ordered, where, and how much to charge.

## Main features

- Product CRUD with validation using Zod.
- Table listing endpoint.
- Session control per table (prevents opening multiple active sessions for the same table).
- Order creation with business validations:
  - Session must exist.
  - Session must be open.
  - Product must exist.
- Bill total calculation by table session.
- Centralized error handling for business and validation errors.

## Project structure

```txt
src/
  controllers/          # Request handlers and business flow
  routes/               # API routes grouped by resource
  database/
    migrations/         # Database schema history
    seeds/              # Initial/demo data
    types/              # Repository type definitions
    knex.ts             # Knex client instance
  middlewares/          # Express middlewares
  utils/                # Shared utilities (AppError)
  server.ts             # App bootstrap
```

## Tech stack

- Node.js
- TypeScript
- Express
- Knex
- SQLite3
- Zod

## Quick start (copy, paste, run)

### 1. Clone the repository

```bash
git clone https://github.com/diegodevtech/API-restaurant.git
cd API-restaurant
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create database schema

```bash
npm run knex -- migrate:latest
```

### 4. Seed initial data

```bash
npm run knex -- seed:run
```

### 5. Start development server

```bash
npm run dev
```

Server will be running at:

```txt
http://localhost:3333
```

## API endpoints

Base URL: `http://localhost:3333`

### Products

- `GET /products` -> list all products
- `GET /products?name=brownie` -> filter products by name
- `POST /products` -> create product
- `PUT /products/:id` -> update product
- `DELETE /products/:id` -> delete product

Example payload for `POST /products`:

```json
{
  "name": "Brownie with Pistachio Cream",
  "price": 14.5
}
```

### Tables

- `GET /tables` -> list all tables

### Table Sessions

- `GET /tables-sessions` -> list sessions
- `POST /tables-sessions` -> open a session for a table
- `PATCH /tables-sessions/:id` -> close a session

Example payload for `POST /tables-sessions`:

```json
{
  "table_id": 1
}
```

### Orders

- `GET /orders` -> list all orders
- `GET /orders/table-session/:table_session_id` -> list orders for one session
- `GET /orders/table-session/:table_session_id/total` -> get total amount for one session
- `POST /orders` -> create order

Example payload for `POST /orders`:

```json
{
  "table_session_id": 1,
  "product_id": 2,
  "quantity": 3
}
```

## Error handling

The API returns structured errors for:

- Business rules (for example: opening an already open table).
- Validation failures from Zod.
- Unexpected server errors.

## Fun local test flow in 90 seconds

Run these commands after starting the server:

```bash
# 1) See tables
curl -s http://localhost:3333/tables | jq

# 2) Open table 1
curl -s -X POST http://localhost:3333/tables-sessions \
  -H "Content-Type: application/json" \
  -d '{"table_id":1}'

# 3) Add one order to session 1
curl -s -X POST http://localhost:3333/orders \
  -H "Content-Type: application/json" \
  -d '{"table_session_id":1,"product_id":1,"quantity":2}'

# 4) Check total
curl -s http://localhost:3333/orders/table-session/1/total | jq
```

If `jq` is not installed, remove `| jq` and read raw JSON.

## Scripts

- `npm run dev` -> run API in watch mode
- `npm run knex -- migrate:latest` -> run migrations
- `npm run knex -- migrate:rollback` -> rollback last migration
- `npm run knex -- seed:run` -> run seeds

## Replication checklist

- Same Node.js major version across machines.
- Run migrations before seeds.
- Keep database file generated in `src/database/database.db`.
- Use local port `3333` (default in project).

## Final note

This project is intentionally straightforward: no mystery layers, no magic tricks, and no "works only on my machine" drama.
