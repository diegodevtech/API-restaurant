import { NextFunction, Request, Response } from "express";

class ProductController {
  async getAllProducts(request: Request, response: Response, next: NextFunction) {
    try{
      return response.json({ message: "OK" });
    } catch (error) {
      // passes the error while continuing the middleware chain
      next(error);
    }
  }
}

export { ProductController };