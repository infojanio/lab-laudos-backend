import { PrismaParametersRepository } from "@/repositories/prisma/prisma-parameters-repository";
import { DeleteParameterUseCase } from "../parameters/delete-parameter";

export function makeDeleteParameterUseCase() {
  const parametersRepository = new PrismaParametersRepository();
  const useCase = new DeleteParameterUseCase(parametersRepository);

  return useCase;
}
