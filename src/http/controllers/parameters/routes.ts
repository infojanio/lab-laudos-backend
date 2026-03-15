import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { createParameter } from "@/http/controllers/parameters/create-parameter";
import { listParameters } from "@/http/controllers/parameters/list-parameters";
import { getParameter } from "@/http/controllers/parameters/get-parameter";
import { updateParameter } from "@/http/controllers/parameters/update-parameter";
import { deleteParameter } from "@/http/controllers/parameters/delete-parameter";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";

export async function parametersRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.get(
    "/parameters",
    { onRequest: [verifyUserRole("ADMIN", "SUPER_ADMIN")] },
    listParameters,
  );

  app.get(
    "/parameters/:id",
    { onRequest: [verifyUserRole("ADMIN", "SUPER_ADMIN")] },
    getParameter,
  );

  app.post(
    "/parameters",
    { onRequest: [verifyUserRole("ADMIN", "SUPER_ADMIN")] },
    createParameter,
  );

  app.put(
    "/parameters/:id",
    { onRequest: [verifyUserRole("ADMIN", "SUPER_ADMIN")] },
    updateParameter,
  );

  app.delete(
    "/parameters/:id",
    { onRequest: [verifyUserRole("ADMIN", "SUPER_ADMIN")] },
    deleteParameter,
  );
}
