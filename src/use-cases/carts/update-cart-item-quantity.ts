import { CartsRepository } from "@/repositories/prisma/Iprisma/carts-repository";
import { ResourceNotFoundError } from "@/utils/messages/errors/resource-not-found-error";

interface UpdateCartItemQuantityUseCaseRequest {
  userId: string;
  storeId: string;
  cartItemId: string;
  quantity: number;
}

export class UpdateCartItemQuantityUseCase {
  constructor(private cartsRepository: CartsRepository) {}

  async execute({
    userId,
    storeId,
    cartItemId,
    quantity,
  }: UpdateCartItemQuantityUseCaseRequest) {
    if (quantity < 1) {
      throw new Error("Quantidade inválida");
    }

    const cart = await this.cartsRepository.findOpenByUserAndStoreWithItems(
      userId,
      storeId,
    );

    if (!cart) {
      throw new ResourceNotFoundError();
    }

    const itemExists = cart.items.some((item) => item.id === cartItemId);

    if (!itemExists) {
      throw new ResourceNotFoundError();
    }

    return this.cartsRepository.updateItemQuantity({
      cartItemId,
      quantity,
    });
  }
}
