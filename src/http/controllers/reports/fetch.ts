import { FastifyRequest, FastifyReply } from "fastify";
import { z, ZodError } from "zod";
import { makeFetchReportsUseCase } from "@/use-cases/_factories/make-fetch-reports-use-case";

export async function fetchReports(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
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
  } catch (error) {
    console.error("FETCH REPORTS ERROR:");
    console.error(error);

    if (error instanceof ZodError) {
      return reply.status(400).send({
        message: "Erro de validação",
        issues: error.format(),
      });
    }

    return reply.status(500).send({
      message: "Erro ao listar laudos",
    });
  }
}
