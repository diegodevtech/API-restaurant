import { Router } from "express";
import { TablesSessionsController } from "../controllers/tables-sessions-controller";

const tablesSessionsRoutes = Router();
const tablesSessionsController = new TablesSessionsController();

tablesSessionsRoutes.get("/", tablesSessionsController.getAllSessions);
tablesSessionsRoutes.post("/", tablesSessionsController.createSession);
tablesSessionsRoutes.patch("/:id", tablesSessionsController.updateSession);

export { tablesSessionsRoutes };