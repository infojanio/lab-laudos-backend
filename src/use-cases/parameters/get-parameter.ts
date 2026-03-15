import { LabParameter } from "@prisma/client";
import { ParametersRepository } from "@/repositories/prisma/Iprisma/parameters-repository";

class ParameterNotFoundError extends Error {
  constructor() {
    super("Parâmetro não encontrado.");
  }
}

class UnauthorizedParameterAccessError extends Error {
  constructor() {
    super("Você não tem permissão para acessar este parâmetro.");
  }
}

interface GetParameterUseCaseRequest {
  id: string;
  storeId: string;
}

interface GetParameterUseCaseResponse {
  parameter: LabParameter;
}

export class GetParameterUseCase {
  constructor(private parametersRepository: ParametersRepository) {}

  async execute({
    id,
    storeId,
  }: GetParameterUseCaseRequest): Promise<GetParameterUseCaseResponse> {
    const parameter = await this.parametersRepository.findById(id);

    if (!parameter) {
      throw new ParameterNotFoundError();
    }

    if (parameter.storeId !== storeId) {
      throw new UnauthorizedParameterAccessError();
    }

    return { parameter };
  }
}
