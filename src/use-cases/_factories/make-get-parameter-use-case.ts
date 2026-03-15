import { PrismaParametersRepository } from "@/repositories/prisma/prisma-parameters-repository";
import { GetParameterUseCase } from "../parameters/get-parameter";

export function makeGetParameterUseCase() {
  const parametersRepository = new PrismaParametersRepository();
  const useCase = new GetParameterUseCase(parametersRepository);

  return useCase;
}
