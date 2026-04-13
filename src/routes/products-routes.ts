import { Router } from "express";
import { ProductController } from "@/controllers/products-controller";

const productsRoutes = Router();
const productsController = new ProductController();

productsRoutes.get("/", productsController.getAllProducts);
productsRoutes.post("/", productsController.createProduct);

export { productsRoutes };