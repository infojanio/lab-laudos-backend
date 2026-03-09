import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import { makeGetPublicReportUseCase } from "@/use-cases/_factories/make-get-public-report-use-case";

export async function getPublicReport(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    code: z.string(),
  });

  const { code } = paramsSchema.parse(request.params);

  const useCase = makeGetPublicReportUseCase();

  const { report } = await useCase.execute({
    code,
  });

  return reply.status(200).send({
    report,
  });
}
