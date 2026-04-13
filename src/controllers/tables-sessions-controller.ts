import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { knex } from "../database/knex";
import { TablesSessionsRepository } from "@/database/types/tables-sessions-repository";
import { AppError } from "@/utils/AppError";

class TablesSessionsController {

  async getAllSessions(request: Request, response: Response, next: NextFunction) {
    
    try {
      const tablesSessions = await knex<TablesSessionsRepository>("tables_sessions").select().orderBy("closed_at");
      return response.json(tablesSessions);

    } catch (error) {
      next(error);
    }
  }

  async createSession(request: Request, response: Response, next: NextFunction) {
    try {

      const bodySchema = z.object({
        table_id: z.number()
      });

      const { table_id } = bodySchema.parse(request.body);

      const session = await knex<TablesSessionsRepository>("tables_sessions").select().where({ table_id }).first();

      if(session && !session.closed_at) {
        throw new AppError("This table is already open", 400)
      }

      await knex<TablesSessionsRepository>("tables_sessions").insert({
        table_id,
        opened_at: knex.fn.now(),
      });

      return response.status(201).json()
    } catch (error) {
      next(error);
    }
  }
};

export { TablesSessionsController };