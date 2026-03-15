import { PrismaParametersRepository } from "@/repositories/prisma/prisma-parameters-repository";
import { UpdateParameterUseCase } from "../parameters/update-parameter";

export function makeUpdateParameterUseCase() {
  const parametersRepository = new PrismaParametersRepository();
  const useCase = new UpdateParameterUseCase(parametersRepository);

  return useCase;
}
