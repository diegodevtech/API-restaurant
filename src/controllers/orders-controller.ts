import { Request, Response, NextFunction } from "express";
import { knex } from "@/database/knex";
import { z } from "zod";

class OrdersController {
  async getAllOrders(request: Request, response: Response, next: NextFunction) {}

  async createOrder(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        table_session_id: z.number(),
        product_id: z.number(),
        quantity: z.number().positive(),
      });

      const { table_session_id, product_id, quantity } = bodySchema.parse(request.body);

      return response.status(201).json();
      
    } catch (error) {
      next(error);
    }
  }
}

export { OrdersController };