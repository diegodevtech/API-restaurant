import { NextFunction, Request, Response } from "express";
import { knex } from "../database/knex";
import { z } from "zod";

class ProductController {
  async getAllProducts(request: Request, response: Response, next: NextFunction) {
    try{
      const { name } = request.query;
      const products = await knex<ProductRepository>("products").select().whereLike("name", `%${name ?? ""}%`).orderBy("name");
      return response.json(products);
    } catch (error) {
      // passes the error while continuing the middleware chain
      next(error);
    }
  }

  async createProduct(request: Request, response: Response, next: NextFunction) {
    try{

      const productSchema = z.object({
        name: z.string().trim().min(6).max(100),
        price: z.number().positive()
      });

      const { name, price } = productSchema.parse(request.body);

      await knex<ProductRepository>("products").insert({ name, price });

      return response.status(201).json();

    } catch (error) {
      next(error);
    }
  }
}

export { ProductController };

// async createProduct(request: Request, response: Response, next: NextFunction) {
//     try{
//       return response.json({ message: "OK" });
//     } catch (error) {
//       next(error);
//     }
//   }