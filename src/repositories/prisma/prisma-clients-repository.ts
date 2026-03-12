import { prisma } from "@/lib/prisma";
import { Client, Prisma } from "@prisma/client";
import { ClientsRepository } from "./Iprisma/clients-repository";

export class PrismaClientsRepository implements ClientsRepository {
  async create(data: Prisma.ClientUncheckedCreateInput): Promise<Client> {
    return prisma.client.create({
      data,
    });
  }

  async findById(id: string): Promise<Client | null> {
    return prisma.client.findUnique({
      where: { id },
    });
  }

  async findManyByStore(storeId: string): Promise<Client[]> {
    return prisma.client.findMany({
      where: { storeId },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async update(
    id: string,
    data: Prisma.ClientUncheckedUpdateInput,
  ): Promise<Client> {
    return prisma.client.update({
      where: { id },
      data,
    });
  }

  async findByDocument(
    storeId: string,
    document: string,
  ): Promise<Client | null> {
    return prisma.client.findFirst({
      where: {
        storeId,
        document,
      },
    });
  }
}
