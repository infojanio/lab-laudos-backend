import { ReportsRepository } from "@/repositories/prisma/Iprisma/reports-repository";

interface Request {
  code: string;
}

export class GetPublicReportUseCase {
  constructor(private reportsRepository: ReportsRepository) {}

  async execute({ code }: Request) {
    const report = await this.reportsRepository.findByCode(code);

    if (!report) {
      throw new Error("Report not found");
    }

    if (report.status === "CANCELADO") {
      throw new Error("Report canceled");
    }

    return {
      report,
    };
  }
}
