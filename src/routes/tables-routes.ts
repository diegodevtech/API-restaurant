import { Router } from "express";

import { TablesController } from "@/controllers/tables-controller";

const tablesRoutes = Router();
const tablesController = new TablesController();

tablesRoutes.get("/", tablesController.getAllTables);

export { tablesRoutes };