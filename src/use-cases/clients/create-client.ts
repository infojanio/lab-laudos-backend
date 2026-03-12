import { ClientsRepository } from "@/repositories/prisma/Iprisma/clients-repository";
import { Client } from "@prisma/client";

interface CreateClientRequest {
  storeId: string;

  name: string;
  email?: string;
  document?: string;
  phone?: string;
  company?: string;
  address?: string;
  municipality?: string;
}

interface CreateClientResponse {
  client: Client;
}

export class CreateClientUseCase {
  constructor(private clientsRepository: ClientsRepository) {}

  async execute({
    storeId,
    name,
    email,
    document,
    phone,
    company,
    address,
    municipality,
  }: CreateClientRequest): Promise<CreateClientResponse> {
    if (document) {
      const clientAlreadyExists = await this.clientsRepository.findByDocument(
        storeId,
        document,
      );

      if (clientAlreadyExists) {
        throw new Error("Client already exists for this document.");
      }
    }

    const client = await this.clientsRepository.create({
      storeId,
      name,
      email,
      document,
      phone,
      company,
      address,
      municipality,
    });

    return {
      client,
    };
  }
}
