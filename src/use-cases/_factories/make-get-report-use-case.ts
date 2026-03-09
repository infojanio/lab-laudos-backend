import { PrismaReportsRepository } from "@/repositories/prisma/prisma-reports-repository";
import { GetReportUseCase } from "../reports/get-report";

export function makeGetReportUseCase() {
  const reportsRepository = new PrismaReportsRepository();

  const useCase = new GetReportUseCase(reportsRepository);

  return useCase;
}
