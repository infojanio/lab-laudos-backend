import { Prisma, Report } from "@prisma/client";

export interface ReportsRepository {
  create(data: Prisma.ReportCreateInput): Promise<Report>;

  findById(id: string): Promise<Report | null>;

  listByStore(storeId: string): Promise<Report[]>;

  listMany(params: { storeId?: string; page: number }): Promise<Report[]>;

  findByCode(code: string): Promise<Report | null>;
}
