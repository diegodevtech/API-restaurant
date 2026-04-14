import { Router } from "express";

import { OrdersController } from "@/controllers/orders-controller";

const ordersRoutes = Router();
const ordersController = new OrdersController();

ordersRoutes.get("/", ordersController.getAllOrders);
ordersRoutes.get("/table-session/:table_session_id", ordersController.getOrderByTableSessionId);
ordersRoutes.get("/table-session/:table_session_id/total", ordersController.closeOrder);
ordersRoutes.post("/", ordersController.createOrder);

export { ordersRoutes };