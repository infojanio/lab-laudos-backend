import { LabParameter, Prisma, ReportSection } from "@prisma/client";

export interface FindManyByStoreFilters {
  section?: ReportSection;
  search?: string;
}

export interface ParametersRepository {
  create(data: Prisma.LabParameterUncheckedCreateInput): Promise<LabParameter>;
  findById(id: string): Promise<LabParameter | null>;
  findManyByStore(
    storeId: string,
    filters?: FindManyByStoreFilters,
  ): Promise<LabParameter[]>;
  update(
    id: string,
    data: Prisma.LabParameterUpdateInput,
  ): Promise<LabParameter>;
  delete(id: string): Promise<void>;
}
