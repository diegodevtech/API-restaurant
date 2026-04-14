import { Request, Response, NextFunction } from "express";
import { knex } from "@/database/knex";
import { z } from "zod";
import { TablesSessionsRepository } from "@/database/types/tables-sessions-repository";
import { AppError } from "@/utils/AppError";

class OrdersController {
  async getAllOrders(request: Request, response: Response, next: NextFunction) {
    try {
      const orders = await knex<OrderRepository>("orders").select().orderBy("");
      return response.json(orders);
    } catch (error) {
      next(error);
    }
  }

  async getOrderByTableSessionId(request: Request, response: Response, next: NextFunction) {
    try {
      const { table_session_id } = request.params;
      const order = await knex<OrderRepository>("orders")
      .select("orders.id as order_id", "orders.table_session_id", "orders.product_id", "orders.price", "orders.quantity", "orders.created_at", "orders.updated_at", "products.name as product_name", knex.raw("(orders.price * orders.quantity) AS total"))
      .join("products", "products.id", "orders.product_id")
      .where("table_session_id", table_session_id)
      .orderBy("orders.created_at", "desc");
      return response.json(order);
    } catch (error) {
      next(error);
    }
  }

  async showOrderTotal(request: Request, response: Response, next: NextFunction) {
    try {
      const { table_session_id } = request.params;
      const order = await knex<OrderRepository>("orders")
      .select(
        knex.raw("COALESCE(SUM(orders.price * orders.quantity), 0) AS total")
      )
      .where("table_session_id", table_session_id)
      .first();

      return response.json(order);
    } catch (error) {
      next(error);
    }
  }

  async createOrder(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        table_session_id: z.number(),
        product_id: z.number(),
        quantity: z.number().positive(),
      });

      const { table_session_id, product_id, quantity } = bodySchema.parse(request.body);

      const session = await knex<TablesSessionsRepository>("tables_sessions").where("id", table_session_id).first();
      const product = await knex<ProductRepository>("products").where("id", product_id).first();

      if (!session) {
        throw new AppError("Table session not found", 404);
      }

      if(session.closed_at) {
        throw new AppError("Table session is closed", 400);
      }

      if(!product) {
        throw new AppError("Product not found", 404);
      }

      await knex<OrderRepository>("orders").insert({ 
        table_session_id,
        product_id,
        quantity,
        price: product.price,
        created_at: knex.fn.now(),
        updated_at: knex.fn.now()
      });

      return response.status(201).json();

    } catch (error) {
      next(error);
    }
  }


}

export { OrdersController };