import { FastifyInstance } from "fastify";
import { createClientController } from "./create-client";
import { getClientController } from "./get-client";
import { listClientsController } from "./list-clients";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";
import { updateClientController } from "./update-client";

export async function clientsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);
  app.get(
    "/clients",
    { onRequest: [verifyUserRole("ADMIN", "SUPER_ADMIN")] },
    listClientsController,
  );

  app.get(
    "/clients/:id",
    { onRequest: [verifyUserRole("ADMIN", "SUPER_ADMIN")] },
    getClientController,
  );

  app.put(
    "/clients/:id",
    { onRequest: [verifyUserRole("ADMIN", "SUPER_ADMIN")] },
    updateClientController,
  );

  app.post(
    "/clients",
    { onRequest: [verifyUserRole("ADMIN", "SUPER_ADMIN")] },
    createClientController,
  );
}
