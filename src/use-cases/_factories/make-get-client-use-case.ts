import { PrismaClientsRepository } from "@/repositories/prisma/prisma-clientes-repository";
import { GetClientUseCase } from "../clients/get-client";

export function makeGetClientUseCase() {
  const clientsRepository = new PrismaClientsRepository();

  return new GetClientUseCase(clientsRepository);
}
