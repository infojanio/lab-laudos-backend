import { PrismaReportsRepository } from "@/repositories/prisma/prisma-reports-repository";
import { GetPublicReportUseCase } from "../reports/get-public-report";

export function makeGetPublicReportUseCase() {
  const repository = new PrismaReportsRepository();

  return new GetPublicReportUseCase(repository);
}
