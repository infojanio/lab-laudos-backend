import { PrismaReportsRepository } from "@/repositories/prisma/prisma-reports-repository";
import { FetchReportsUseCase } from "../reports/fetch-reports";

export function makeFetchReportsUseCase() {
  const reportsRepository = new PrismaReportsRepository();

  const useCase = new FetchReportsUseCase(reportsRepository);

  return useCase;
}
