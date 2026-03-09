import { ReportsRepository } from "@/repositories/prisma/Iprisma/reports-repository";
import { Report, Role } from "@prisma/client";

interface FetchReportsRequest {
  storeId: string | undefined;
  page: number;
}

interface FetchReportsResponse {
  reports: Report[];
}

export class FetchReportsUseCase {
  constructor(private reportsRepository: ReportsRepository) {}

  async execute({
    storeId,
    page,
  }: FetchReportsRequest): Promise<FetchReportsResponse> {
    const reports = await this.reportsRepository.listMany({
      storeId,
      page,
    });

    return {
      reports,
    };
  }
}
