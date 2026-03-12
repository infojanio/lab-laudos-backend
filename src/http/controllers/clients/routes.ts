import { FastifyInstance } from "fastify";
import { createClientController } from "./create-client";
import { getClientController } from "./get-client";
import { listClientsController } from "./list-clients";

export async function clientsRoutes(app: FastifyInstance) {
  app.get("/clients", listClientsController);

  app.get("/clients/:id", getClientController);

  app.post("/clients", createClientController);
}
