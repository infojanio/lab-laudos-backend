import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeGetClientUseCase } from "@/use-cases/_factories/make-get-client-use-case";

export async function getClientController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  });

  const { id } = paramsSchema.parse(request.params);

  const getClientUseCase = makeGetClientUseCase();

  const { client } = await getClientUseCase.execute({
    id,
  });

  return reply.send({
    client,
  });
}
