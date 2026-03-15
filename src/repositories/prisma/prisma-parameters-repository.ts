import { prisma } from "@/lib/prisma";
import {
  FindManyByStoreFilters,
  ParametersRepository,
} from "../prisma/Iprisma/parameters-repository";
import { LabParameter, Prisma } from "@prisma/client";

export class PrismaParametersRepository implements ParametersRepository {
  async create(
    data: Prisma.LabParameterUncheckedCreateInput,
  ): Promise<LabParameter> {
    const labParameter = await prisma.labParameter.create({
      data,
    });

    return labParameter;
  }

  async findById(id: string): Promise<LabParameter | null> {
    const labParameter = await prisma.labParameter.findUnique({
      where: { id },
    });

    return labParameter;
  }

  async findManyByStore(
    storeId: string,
    filters?: FindManyByStoreFilters,
  ): Promise<LabParameter[]> {
    const labParameters = await prisma.labParameter.findMany({
      where: {
        storeId,
        ...(filters?.section ? { section: filters.section } : {}),
        ...(filters?.search
          ? {
              name: {
                contains: filters.search,
                mode: "insensitive",
              },
            }
          : {}),
      },
      orderBy: {
        name: "asc",
      },
    });

    return labParameters;
  }

  async update(
    id: string,
    data: Prisma.LabParameterUpdateInput,
  ): Promise<LabParameter> {
    const labParameter = await prisma.labParameter.update({
      where: { id },
      data,
    });

    return labParameter;
  }

  async delete(id: string): Promise<void> {
    await prisma.labParameter.delete({
      where: { id },
    });
  }
}
