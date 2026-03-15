import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import { ReportSection } from "@prisma/client";
import { makeListParametersUseCase } from "@/use-cases/_factories/make-list-parameters-use-case";

export async function listParameters(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const querySchema = z.object({
    section: z.nativeEnum(ReportSection).optional(),
    search: z.string().optional(),
  });

  const { section, search } = querySchema.parse(request.query);

  const { storeId } = request.user;

  if (!storeId) {
    return reply.status(403).send({
      message: "Usuário não vinculado a laboratório",
    });
  }

  const useCase = makeListParametersUseCase();

  const { parameters } = await useCase.execute({
    storeId,
    section,
    search,
  });

  return reply.status(200).send({
    parameters,
  });
}
