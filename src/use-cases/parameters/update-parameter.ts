import { LabParameter, ReportSection } from "@prisma/client";
import { ParametersRepository } from "@/repositories/prisma/Iprisma/parameters-repository";

class ParameterNotFoundError extends Error {
  constructor() {
    super("Parâmetro não encontrado.");
  }
}

class UnauthorizedParameterAccessError extends Error {
  constructor() {
    super("Você não tem permissão para editar este parâmetro.");
  }
}

interface UpdateParameterUseCaseRequest {
  id: string;
  storeId: string;
  name: string;
  unit?: string | null;
  method?: string | null;
  vmp?: string | null;
  section: ReportSection;
}

interface UpdateParameterUseCaseResponse {
  parameter: LabParameter;
}

export class UpdateParameterUseCase {
  constructor(private parametersRepository: ParametersRepository) {}

  async execute({
    id,
    storeId,
    name,
    unit,
    method,
    vmp,
    section,
  }: UpdateParameterUseCaseRequest): Promise<UpdateParameterUseCaseResponse> {
    const existingParameter = await this.parametersRepository.findById(id);

    if (!existingParameter) {
      throw new ParameterNotFoundError();
    }

    if (existingParameter.storeId !== storeId) {
      throw new UnauthorizedParameterAccessError();
    }

    const parameter = await this.parametersRepository.update(id, {
      name,
      unit: unit ?? null,
      method: method ?? null,
      vmp: vmp ?? null,
      section,
    });

    return { parameter };
  }
}
