import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeFetchReportsUseCase } from "@/use-cases/_factories/make-fetch-reports-use-case";

export async function fetchReports(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const querySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = querySchema.parse(request.query);

  const { storeId } = request.user;

  const fetchReportsUseCase = makeFetchReportsUseCase();

  const { reports } = await fetchReportsUseCase.execute({
    storeId,
    page,
  });

  return reply.status(200).send({
    reports,
  });
}
