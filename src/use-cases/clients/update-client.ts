import { ClientsRepository } from "@/repositories/prisma/Iprisma/clients-repository";
import { Client } from "@prisma/client";

interface UpdateClientRequest {
  id: string;

  name?: string;
  email?: string;
  document?: string;
  phone?: string;
  company?: string;
  address?: string;
  municipality?: string;
}

interface UpdateClientResponse {
  client: Client;
}

export class UpdateClientUseCase {
  constructor(private clientsRepository: ClientsRepository) {}

  async execute({
    id,
    name,
    email,
    document,
    phone,
    company,
    address,
    municipality,
  }: UpdateClientRequest): Promise<UpdateClientResponse> {
    const client = await this.clientsRepository.findById(id);

    if (!client) {
      throw new Error("Client not found.");
    }

    const updatedClient = await this.clientsRepository.update(id, {
      name,
      email,
      document,
      phone,
      company,
      address,
      municipality,
    });

    return {
      client: updatedClient,
    };
  }
}
