import { ReportsRepository } from "@/repositories/prisma/Iprisma/reports-repository";

interface GetReportRequest {
  reportId: string;
}

export class GetReportUseCase {
  constructor(private reportsRepository: ReportsRepository) {}

  async execute({ reportId }: GetReportRequest) {
    const report = await this.reportsRepository.findById(reportId);

    if (!report) {
      throw new Error("Report not found");
    }

    return {
      report,
    };
  }
}
