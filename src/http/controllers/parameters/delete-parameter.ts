import { makeDeleteParameterUseCase } from "@/use-cases/_factories/make-delete-parameter-use-case";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function deleteParameter(
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

  const useCase = makeDeleteParameterUseCase();

  await useCase.execute({
    id,
    storeId,
  });

  return reply.status(204).send();
}
