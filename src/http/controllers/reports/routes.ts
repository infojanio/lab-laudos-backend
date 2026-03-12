import { FastifyInstance } from "fastify";
import { createReport } from "./create";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { fetchReports } from "./fetch";
import { getReport } from "./get-report";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";

export async function reportsRoutes(app: FastifyInstance) {
  app.get("/reports/public/:code", getReport);

  app.addHook("onRequest", verifyJWT);

  app.post(
    "/reports",
    { onRequest: [verifyUserRole("SUPER_ADMIN")] },
    createReport,
  );

  app.get(
    "/reports",
    { onRequest: [verifyUserRole("SUPER_ADMIN")] },
    fetchReports,
  );

  app.get(
    "/reports/:id",
    { onRequest: [verifyUserRole("SUPER_ADMIN")] },
    getReport,
  );
}
