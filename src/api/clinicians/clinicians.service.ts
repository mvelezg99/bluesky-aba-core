import { Repository } from "typeorm";

import { AppDataSource } from "../../config/database";
import { Clinic } from "../../database/entities/Clinic.entity";
import { Clinician } from "../../database/entities/Clinician.entity";
import { ClinicianType } from "../../database/enums/clinicians-type";
import { BadRequestException, NotFoundException } from "../../utils/exceptions";

import {
  CreateClinicianRequest,
  UpdateClinicianRequest,
} from "./clinicians.dto";

export class CliniciansService {
  private clinicianRepository: Repository<Clinician>;
  private clinicRepository: Repository<Clinic>;

  constructor(
    clinicianRepository = AppDataSource.getRepository(Clinician),
    clinicRepository = AppDataSource.getRepository(Clinic),
  ) {
    this.clinicianRepository = clinicianRepository;
    this.clinicRepository = clinicRepository;
  }

  public async getClinicians(
    clinicId?: string,
    type?: ClinicianType,
  ): Promise<Clinician[]> {
    const clinicians = await this.clinicianRepository.find({
      where: {
        ...(clinicId ? { clinicId } : {}),
        ...(type ? { type } : {}),
      },
      relations: {
        clinic: true,
      },
      order: { firstName: "ASC" },
    });

    return clinicians;
  }

  public async getClinicianById(id: string): Promise<Clinician> {
    const clinician = await this.clinicianRepository.findOne({
      where: { id },
      relations: { clinic: true },
    });

    if (!clinician) {
      throw new NotFoundException(`Clinician with ID ${id} not found`);
    }

    return clinician;
  }

  public async createClinician(
    data: CreateClinicianRequest,
  ): Promise<Clinician> {
    const clinicExists = await this.clinicRepository.existsBy({
      id: data.clinicId,
    });

    if (!clinicExists) {
      throw new BadRequestException(
        `Clinic with ID ${data.clinicId} does not exist`,
      );
    }

    const newClinician = this.clinicianRepository.create(data);
    const savedClinician = await this.clinicianRepository.save(newClinician);

    return this.getClinicianById(savedClinician.id);
  }

  public async updateClinician(
    id: string,
    data: UpdateClinicianRequest,
  ): Promise<Clinician> {
    const clinician = await this.getClinicianById(id);

    if (data.clinicId && data.clinicId !== clinician.clinicId) {
      const clinicExists = await this.clinicRepository.existsBy({
        id: data.clinicId,
      });
      if (!clinicExists) {
        throw new BadRequestException(
          `Clinic with ID ${data.clinicId} does not exist`,
        );
      }
    }

    Object.assign(clinician, data);

    await this.clinicianRepository.save(clinician);
    return this.getClinicianById(id);
  }

  public async deleteClinician(id: string): Promise<void> {
    const clinician = await this.getClinicianById(id);

    await this.clinicianRepository.remove(clinician);
  }
}
