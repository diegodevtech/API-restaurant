import { NextFunction, Request, Response } from "express";
import { z } from "zod";

class ProductController {
  async getAllProducts(request: Request, response: Response, next: NextFunction) {
    try{
      return response.json({ message: "OK" });
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

      return response.status(201).json({ name, price });

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