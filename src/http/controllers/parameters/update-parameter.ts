import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { ReportSection } from "@prisma/client";
import { makeUpdateParameterUseCase } from "@/use-cases/_factories/make-update-parameter-use-case";

export async function updateParameter(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  });

  const bodySchema = z.object({
    name: z.string().min(1),
    unit: z.string().optional().nullable(),
    method: z.string().optional().nullable(),
    vmp: z.string().optional().nullable(),
    section: z.nativeEnum(ReportSection),
  });

  const { id } = paramsSchema.parse(request.params);
  const { name, unit, method, vmp, section } = bodySchema.parse(request.body);

  const { storeId } = request.user;

  if (!storeId) {
    return reply.status(403).send({
      message: "Usuário não vinculado a laboratório",
    });
  }

  const useCase = makeUpdateParameterUseCase();

  const { parameter } = await useCase.execute({
    id,
    storeId,
    name,
    unit,
    method,
    vmp,
    section,
  });

  return reply.status(200).send({
    parameter,
  });
}
