import { ClientsRepository } from "@/repositories/prisma/Iprisma/clientes-repository";
import { Client } from "@prisma/client";

interface ListClientsRequest {
  storeId: string;
}

interface ListClientsResponse {
  clients: Client[];
}

export class ListClientsUseCase {
  constructor(private clientsRepository: ClientsRepository) {}

  async execute({ storeId }: ListClientsRequest): Promise<ListClientsResponse> {
    const clients = await this.clientsRepository.findManyByStore(storeId);

    return {
      clients,
    };
  }
}
