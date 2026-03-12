import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeCreateClientUseCase } from "@/use-cases/_factories/make-create-client-use-case";

export async function createClientController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    name: z.string(),
    email: z.string().optional(),
    document: z.string().optional(),
    phone: z.string().optional(),
    company: z.string().optional(),
    address: z.string().optional(),
    municipality: z.string().optional(),
  });

  const data = bodySchema.parse(request.body);

  const storeId = request.user.storeId;

  if (!storeId) {
    return reply.status(400).send({
      message: "User is not linked to a store",
    });
  }

  const createClientUseCase = makeCreateClientUseCase();

  const { client } = await createClientUseCase.execute({
    storeId,
    ...data,
  });

  return reply.status(201).send({
    client,
  });
}
