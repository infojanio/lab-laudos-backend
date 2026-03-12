import { PrismaStoresRepository } from "@/repositories/prisma/prisma-stores-repository";
import { RegisterUseCase } from "../stores/create-store";

export function makeCreateStoreUseCase() {
  const storesRepository = new PrismaStoresRepository();

  const createStoreUseCase = new RegisterUseCase(storesRepository);
  return createStoreUseCase;
}
