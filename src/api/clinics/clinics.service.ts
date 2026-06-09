import { Repository } from "typeorm";

import { AppDataSource } from "../../config/database";
import { Clinic } from "../../database/entities/Clinic.entity";
import { NotFoundException } from "../../utils/exceptions";
import { logger } from "../../utils/logger";

import { CreateClinicRequest, UpdateClinicRequest } from "./clinics.dto";

export class ClinicsService {
  private clinicRepository: Repository<Clinic>;

  constructor(clinicRepository = AppDataSource.getRepository(Clinic)) {
    this.clinicRepository = clinicRepository;
  }

  public async getAllClinics(): Promise<Clinic[]> {
    return this.clinicRepository.find();
  }

  public async getClinicById(id: string): Promise<Clinic> {
    const clinic = await this.clinicRepository.findOneBy({ id });

    if (!clinic) {
      throw new NotFoundException(`Clinic with ${id} not found`);
    }

    return clinic;
  }

  public async createClinic(data: CreateClinicRequest): Promise<Clinic> {
    logger.info(`Creating new clinic: ${data.name}`, "ClinicsService");
    const newClinic = this.clinicRepository.create(data);

    return this.clinicRepository.save(newClinic);
  }

  public async updateClinic(
    id: string,
    data: UpdateClinicRequest,
  ): Promise<Clinic> {
    const clinic = await this.getClinicById(id);

    logger.info(`Updating clinic ${id}`, "ClinicsService");
    Object.assign(clinic, data);

    return this.clinicRepository.save(clinic);
  }

  public async deleteClinic(id: string): Promise<void> {
    const clinic = await this.getClinicById(id);

    logger.info(`Deleting clinic ${id}`, "ClinicsService");

    await this.clinicRepository.remove(clinic);
  }
}
