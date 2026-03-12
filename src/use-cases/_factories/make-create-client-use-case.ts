import { PrismaClientsRepository } from "@/repositories/prisma/prisma-clients-repository";
import { CreateClientUseCase } from "../clients/create-client";

export function makeCreateClientUseCase() {
  const clientsRepository = new PrismaClientsRepository();

  return new CreateClientUseCase(clientsRepository);
}
