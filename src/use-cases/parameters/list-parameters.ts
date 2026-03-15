import { LabParameter, ReportSection } from "@prisma/client";
import { ParametersRepository } from "@/repositories/prisma/Iprisma/parameters-repository";

interface ListParametersUseCaseRequest {
  storeId: string;
  section?: ReportSection;
  search?: string;
}

interface ListParametersUseCaseResponse {
  parameters: LabParameter[];
}

export class ListParametersUseCase {
  constructor(private parametersRepository: ParametersRepository) {}

  async execute({
    storeId,
    section,
    search,
  }: ListParametersUseCaseRequest): Promise<ListParametersUseCaseResponse> {
    const parameters = await this.parametersRepository.findManyByStore(
      storeId,
      {
        section,
        search,
      },
    );

    return { parameters };
  }
}
