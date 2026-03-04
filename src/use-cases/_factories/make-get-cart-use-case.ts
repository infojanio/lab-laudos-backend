import { prisma } from "@/lib/prisma";
import { PrismaCartsRepository } from "@/repositories/prisma/prisma-carts-repository";
import { GetCartByStoreUseCase } from "../carts/get-cart-by-store";

export function makeGetCartByStoreUseCase() {
  const cartsRepository = new PrismaCartsRepository(prisma);

  return new GetCartByStoreUseCase(cartsRepository);
}
