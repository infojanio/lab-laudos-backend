import { ParametersRepository } from "@/repositories/prisma/Iprisma/parameters-repository";

class ParameterNotFoundError extends Error {
  constructor() {
    super("Parâmetro não encontrado.");
  }
}

class UnauthorizedParameterAccessError extends Error {
  constructor() {
    super("Você não tem permissão para excluir este parâmetro.");
  }
}

interface DeleteParameterUseCaseRequest {
  id: string;
  storeId: string;
}

export class DeleteParameterUseCase {
  constructor(private parametersRepository: ParametersRepository) {}

  async execute({ id, storeId }: DeleteParameterUseCaseRequest): Promise<void> {
    const parameter = await this.parametersRepository.findById(id);

    if (!parameter) {
      throw new ParameterNotFoundError();
    }

    if (parameter.storeId !== storeId) {
      throw new UnauthorizedParameterAccessError();
    }

    await this.parametersRepository.delete(id);
  }
}
