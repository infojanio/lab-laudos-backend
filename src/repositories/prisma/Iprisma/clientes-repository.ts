import { Client, Prisma } from "@prisma/client";

export interface ClientsRepository {
  create(data: Prisma.ClientUncheckedCreateInput): Promise<Client>;

  findById(id: string): Promise<Client | null>;

  findManyByStore(storeId: string): Promise<Client[]>;

  findByDocument(storeId: string, document: string): Promise<Client | null>;
}
