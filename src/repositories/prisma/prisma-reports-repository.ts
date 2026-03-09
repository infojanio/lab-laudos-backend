import { prisma } from "@/lib/prisma";
import { Prisma, Report } from "@prisma/client";
import { ReportsRepository } from "./Iprisma/reports-repository";

export class PrismaReportsRepository implements ReportsRepository {
  async create(data: Prisma.ReportCreateInput): Promise<Report> {
    return prisma.report.create({
      data,
    });
  }

  async findById(id: string): Promise<Report | null> {
    return prisma.report.findUnique({
      where: { id },
      include: {
        client: true,
        results: {
          orderBy: {
            order: "asc",
          },
        },
        store: true,
      },
    });
  }

  async findByCode(code: string) {
    return prisma.report.findFirst({
      where: {
        reportNumber: code,
      },
      include: {
        client: true,
        store: true,
        results: {
          orderBy: {
            order: "asc",
          },
        },
      },
    });
  }

  async listByStore(storeId: string): Promise<Report[]> {
    return prisma.report.findMany({
      where: { storeId },
      include: {
        client: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async listMany({
    storeId,
    page,
  }: {
    storeId: string;
    page: number;
  }): Promise<Report[]> {
    return prisma.report.findMany({
      where: {
        storeId,
      },
      include: {
        client: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 20,
      skip: (page - 1) * 20,
    });
  }
}
