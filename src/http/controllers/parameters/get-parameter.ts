import { makeGetParameterUseCase } from "@/use-cases/_factories/make-get-parameter-use-case";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function getParameter(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  });

  const { id } = paramsSchema.parse(request.params);
  const { storeId } = request.user;

  if (!storeId) {
    return reply.status(403).send({
      message: "Usuário não vinculado a laboratório",
    });
  }

  const useCase = makeGetParameterUseCase();

  const { parameter } = await useCase.execute({
    id,
    storeId,
  });

  return reply.status(200).send({
    parameter,
  });
}
