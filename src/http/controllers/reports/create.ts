import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { ReportSection } from "@prisma/client";

import { makeCreateReportUseCase } from "@/use-cases/_factories/make-create-report-use-case";

export async function createReport(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    clientId: z.string().uuid().optional(),

    analysisType: z.string(),

    identification: z.string().optional(),
    location: z.string().optional(),
    collectionAgent: z.string().optional(),
    collectionTime: z.string().optional(),

    sampleDate: z.coerce.date().optional(),
    entryDate: z.coerce.date().optional(),

    results: z.array(
      z.object({
        section: z.nativeEnum(ReportSection),
        parameter: z.string(),
        result: z.union([z.boolean(), z.string()]),
        unit: z.string().optional(),
        method: z.string().optional(),
        vmp: z.string().optional(),
      }),
    ),
  });

  const data = bodySchema.parse(request.body);

  const { storeId } = request.user;

  if (!storeId) {
    return reply.status(403).send({
      message: "Usuário não vinculado a laboratório",
    });
  }

  const createReportUseCase = makeCreateReportUseCase();

  const normalizedResults = data.results.map((r) => ({
    ...r,
    result: String(r.result),
  }));

  const { report } = await createReportUseCase.execute({
    ...data,
    storeId,
    results: normalizedResults,
  });

  return reply.status(201).send({
    report,
  });
}
