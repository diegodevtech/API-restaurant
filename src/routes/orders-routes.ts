import { Router } from "express";

import { OrdersController } from "@/controllers/orders-controller";

const ordersRoutes = Router();
const ordersController = new OrdersController();

ordersRoutes.get("/", ordersController.getAllOrders);
ordersRoutes.post("/", ordersController.createOrder);

export { ordersRoutes };