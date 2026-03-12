import { FastifyRequest, FastifyReply } from "fastify";
import { makeListClientsUseCase } from "@/use-cases/_factories/make-list-clients-use-case";

export async function listClientsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const storeId = request.user.storeId;

  const listClientsUseCase = makeListClientsUseCase();

  if (!storeId) {
    return reply.status(400).send({
      message: "User is not linked to a store",
    });
  }

  const { clients } = await listClientsUseCase.execute({
    storeId,
  });

  return reply.send({
    clients,
  });
}
