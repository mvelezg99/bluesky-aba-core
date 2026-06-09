import { Repository } from "typeorm";

import { AppDataSource } from "../../config/database";
import { Diagnosis } from "../../database/entities/Diagnosis.entity";
import { NotFoundException } from "../../utils/exceptions";

export class DiagnosesService {
  private diagnosisRepository: Repository<Diagnosis>;

  constructor(diagnosisRepository = AppDataSource.getRepository(Diagnosis)) {
    this.diagnosisRepository = diagnosisRepository;
  }

  public async getDiagnoses(search?: string): Promise<Diagnosis[]> {
    const query = this.diagnosisRepository.createQueryBuilder("diagnosis");

    if (search) {
      query.andWhere(
        "(diagnosis.name ILIKE :search OR diagnosis.description ILIKE :search)",
        {
          search: `%${search}%`,
        },
      );
    }

    query.orderBy("diagnosis.code", "ASC");

    return query.getMany();
  }

  public async getDiagnosisById(id: string): Promise<Diagnosis> {
    const diagnosis = await this.diagnosisRepository.findOneBy({ id });

    if (!diagnosis) {
      throw new NotFoundException(`Diagnosis with ID ${id} not found`);
    }

    return diagnosis;
  }

  public async getDiagnosisByCode(code: string): Promise<Diagnosis> {
    const diagnosis = await this.diagnosisRepository.findOneBy({ code });

    if (!diagnosis) {
      throw new NotFoundException(`Diagnosis with code ${code} not found`);
    }

    return diagnosis;
  }
}
