import { FastifyReply, FastifyRequest } from "fastify";

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();

    if (!request.user) {
      return reply.status(401).send({
        message: "token.invalid",
      });
    }
  } catch (error) {
    return reply.status(401).send({
      message: "token.expired",
    });
  }
}
