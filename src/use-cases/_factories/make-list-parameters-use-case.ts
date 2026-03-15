import { PrismaParametersRepository } from "@/repositories/prisma/prisma-parameters-repository";
import { ListParametersUseCase } from "../parameters/list-parameters";

export function makeListParametersUseCase() {
  const parametersRepository = new PrismaParametersRepository();
  const useCase = new ListParametersUseCase(parametersRepository);

  return useCase;
}
