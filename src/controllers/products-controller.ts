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

  async updateProduct(request: Request, response: Response, next: NextFunction) {
    try {
      const id = z.string().transform((value) => Number(value)).refine((value) => !isNaN(value) && value > 0, { message: "Invalid id" }).parse(request.params.id);
      const bodySchema = z.object({
        name: z.string().trim().min(6).max(100).optional(),
        price: z.number().positive().optional()
      });

      const { name, price } = bodySchema.parse(request.body);

      const product = await knex<ProductRepository>("products").select().where({ id }).first();

      if(!product) {
        return response.status(404).json({ message: "Product not found" });
      }

      await knex<ProductRepository>("products").update({ name, price, updated_at: knex.fn.now() }).where({ id });

      return response.json();
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(request: Request, response: Response, next: NextFunction){
    try {
      const id = z.string().transform((value) => Number(value)).refine((value) => !isNaN(value) && value > 0, { message: "Invalid id" }).parse(request.params.id);

      const product = await knex<ProductRepository>("products").select().where({ id }).first();

      if(!product) {
        return response.status(404).json({ message: "Product not found" });
      }

      await knex<ProductRepository>("products").delete().where({ id });
      return response.json();
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