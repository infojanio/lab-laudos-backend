import { ParametersRepository } from "@/repositories/prisma/Iprisma/parameters-repository";
import { LabParameter, ReportSection } from "@prisma/client";

interface CreateParameterUseCaseRequest {
  storeId: string;
  name: string;
  unit?: string | null;
  method?: string | null;
  vmp?: string | null;
  section: ReportSection;
}

interface CreateParameterUseCaseResponse {
  parameter: LabParameter;
}

export class CreateParameterUseCase {
  constructor(private parametersRepository: ParametersRepository) {}

  async execute({
    storeId,
    name,
    unit,
    method,
    vmp,
    section,
  }: CreateParameterUseCaseRequest): Promise<CreateParameterUseCaseResponse> {
    const parameter = await this.parametersRepository.create({
      storeId,
      name,
      unit: unit ?? null,
      method: method ?? null,
      vmp: vmp ?? null,
      section,
    });

    return { parameter };
  }
}
