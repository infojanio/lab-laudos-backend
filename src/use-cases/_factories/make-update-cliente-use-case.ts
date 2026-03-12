import { PrismaClientsRepository } from "@/repositories/prisma/prisma-clients-repository";
import { UpdateClientUseCase } from "../clients/update-client";

export function makeUpdateClientUseCase() {
  const clientsRepository = new PrismaClientsRepository();

  return new UpdateClientUseCase(clientsRepository);
}
