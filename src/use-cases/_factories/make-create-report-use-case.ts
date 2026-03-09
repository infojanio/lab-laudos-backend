import { PrismaReportsRepository } from "@/repositories/prisma/prisma-reports-repository";
import { CreateReportUseCase } from "../reports/create";

export function makeCreateReportUseCase() {
  const reportsRepository = new PrismaReportsRepository();

  const createReportUseCase = new CreateReportUseCase(reportsRepository);

  return createReportUseCase;
}
