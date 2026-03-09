import { FastifyInstance } from "fastify";
import { createReport } from "./create";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { fetchReports } from "./fetch";
import { getReport } from "./get-report";

export async function reportsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.post("/reports", { preHandler: [verifyJWT] }, createReport);

  app.get("/reports", { preHandler: [verifyJWT] }, fetchReports);

  app.get("/reports/:id", { preHandler: [verifyJWT] }, getReport);

  app.get("/reports/public/:code", { preHandler: [verifyJWT] }, getReport);
}
