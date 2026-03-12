import { ClientsRepository } from "@/repositories/prisma/Iprisma/clients-repository";
import { Client } from "@prisma/client";

interface GetClientRequest {
  id: string;
}

interface GetClientResponse {
  client: Client | null;
}

export class GetClientUseCase {
  constructor(private clientsRepository: ClientsRepository) {}

  async execute({ id }: GetClientRequest): Promise<GetClientResponse> {
    const client = await this.clientsRepository.findById(id);

    return {
      client,
    };
  }
}
