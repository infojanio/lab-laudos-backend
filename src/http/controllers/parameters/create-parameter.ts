import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import { ReportSection } from "@prisma/client";
import { makeCreateParameterUseCase } from "@/use-cases/_factories/make-create-parameter-use-case";

export async function createParameter(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    name: z.string().min(1),
    unit: z.string().optional().nullable(),
    method: z.string().optional().nullable(),
    vmp: z.string().optional().nullable(),
    section: z.nativeEnum(ReportSection),
  });

  const { name, unit, method, vmp, section } = bodySchema.parse(request.body);

  const { storeId } = request.user;

  if (!storeId) {
    return reply.status(403).send({
      message: "Usuário não vinculado a laboratório",
    });
  }

  const useCase = makeCreateParameterUseCase();

  const { parameter } = await useCase.execute({
    storeId,
    name,
    unit,
    method,
    vmp,
    section,
  });

  return reply.status(201).send({
    parameter,
  });
}
