import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import { makeGetReportUseCase } from "@/use-cases/_factories/make-get-report-use-case";

export async function getReport(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  });

  const { id } = paramsSchema.parse(request.params);

  const getReportUseCase = makeGetReportUseCase();

  const { report } = await getReportUseCase.execute({
    reportId: id,
  });

  return reply.status(200).send({
    report,
  });
}
