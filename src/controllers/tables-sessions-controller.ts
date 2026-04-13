import { Request, Response, NextFunction } from "express";
import { knex } from "../database/knex";

class TablesSessionsController {
  async createSession(request: Request, response: Response, next: NextFunction) {
    try {
      return response.status(201).json()
    } catch (error) {
      next(error);
    }
  }
};

export { TablesSessionsController };