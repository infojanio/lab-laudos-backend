import { PrismaParametersRepository } from "@/repositories/prisma/prisma-parameters-repository";
import { CreateParameterUseCase } from "../parameters/create-parameter";

export function makeCreateParameterUseCase() {
  const parametersRepository = new PrismaParametersRepository();
  const useCase = new CreateParameterUseCase(parametersRepository);

  return useCase;
}
