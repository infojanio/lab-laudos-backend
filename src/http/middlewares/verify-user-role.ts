import { FastifyReply, FastifyRequest } from "fastify";
import { Role } from "@prisma/client";

export function verifyUserRole(...allowedRoles: Role[]) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const user = request.user;

    if (!user) {
      return reply.status(401).send({
        message: "Usuário não autenticado.",
      });
    }

    if (!allowedRoles.includes(user.role)) {
      return reply.status(403).send({
        message: "Usuário não autorizado.",
      });
    }

    // regra multi-tenant
    if (user.role === Role.ADMIN && !user.storeId) {
      return reply.status(403).send({
        message: "Administrador não vinculado a nenhum laboratório.",
      });
    }
  };
}
