import { makeUpdateClientUseCase } from "@/use-cases/_factories/make-update-cliente-use-case";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function updateClientController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  });

  const bodySchema = z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    document: z.string().optional(),
    phone: z.string().optional(),
    company: z.string().optional(),
    address: z.string().optional(),
    municipality: z.string().optional(),
  });

  const { id } = paramsSchema.parse(request.params);
  const data = bodySchema.parse(request.body);

  const updateClientUseCase = makeUpdateClientUseCase();

  const { client } = await updateClientUseCase.execute({
    id,
    ...data,
  });

  return reply.send({
    client,
  });
}
