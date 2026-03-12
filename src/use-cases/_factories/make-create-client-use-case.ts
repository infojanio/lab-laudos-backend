import { PrismaClientsRepository } from "@/repositories/prisma/prisma-clientes-repository";
import { CreateClientUseCase } from "../clients/create-client";

export function makeCreateClientUseCase() {
  const clientsRepository = new PrismaClientsRepository();

  return new CreateClientUseCase(clientsRepository);
}
