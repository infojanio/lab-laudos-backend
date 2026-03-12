import { PrismaClientsRepository } from "@/repositories/prisma/prisma-clientes-repository";
import { ListClientsUseCase } from "../clients/list-clients";

export function makeListClientsUseCase() {
  const clientsRepository = new PrismaClientsRepository();

  return new ListClientsUseCase(clientsRepository);
}
