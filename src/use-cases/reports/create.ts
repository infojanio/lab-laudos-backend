import { ReportsRepository } from "@/repositories/prisma/Iprisma/reports-repository";
import { ReportSection } from "@prisma/client";
import { randomUUID } from "crypto";

interface ResultRow {
  section: ReportSection;
  parameter: string;
  result: string;
  unit?: string;
  method?: string;
  vmp?: string;
}

interface CreateReportRequest {
  storeId: string | undefined;
  clientId?: string;
  analysisType: any;

  identification?: string;
  location?: string;
  collectionAgent?: string;
  collectionTime?: string;

  sampleDate?: Date;
  entryDate?: Date;

  results: ResultRow[];
}

export class CreateReportUseCase {
  constructor(private reportsRepository: ReportsRepository) {}

  async execute(data: CreateReportRequest) {
    const reportCode = randomUUID().slice(0, 8).toUpperCase();

    const report = await this.reportsRepository.create({
      store: { connect: { id: data.storeId } },
      client: data.clientId ? { connect: { id: data.clientId } } : undefined,

      analysisType: data.analysisType,

      identification: data.identification,
      location: data.location,
      collectionAgent: data.collectionAgent,
      collectionTime: data.collectionTime,

      sampleDate: data.sampleDate,
      entryDate: data.entryDate,

      reportNumber: reportCode,

      results: {
        create: data.results,
      },
    });

    return { report };
  }
}
