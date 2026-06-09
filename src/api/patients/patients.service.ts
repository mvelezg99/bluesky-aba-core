import { Repository } from "typeorm";

import { AppDataSource } from "../../config/database";
import { Clinic } from "../../database/entities/Clinic.entity";
import { Diagnosis } from "../../database/entities/Diagnosis.entity";
import { Patient } from "../../database/entities/Patient.entity";
import {
  DrugInsight,
  OpenFDAService,
} from "../../integrations/openfda/openfda.service";
import { BadRequestException, NotFoundException } from "../../utils/exceptions";
import { logger } from "../../utils/logger";

import { CreatePatientRequest, PatientInsightsResponse } from "./patients.dto";

export class PatientsService {
  private patientRepository: Repository<Patient>;
  private clinicRepository: Repository<Clinic>;
  private diagnosisRepository: Repository<Diagnosis>;

  private openFdaService = new OpenFDAService();

  constructor(
    patientRepository = AppDataSource.getRepository(Patient),
    clinicRepository = AppDataSource.getRepository(Clinic),
    diagnosisRepository = AppDataSource.getRepository(Diagnosis),
    openFdaService = new OpenFDAService(),
  ) {
    this.patientRepository = patientRepository;
    this.clinicRepository = clinicRepository;
    this.diagnosisRepository = diagnosisRepository;
    this.openFdaService = openFdaService;
  }

  public async getPatients(diagnosisCode?: string): Promise<Patient[]> {
    return this.patientRepository.find({
      where: {
        ...(diagnosisCode ? { diagnosis: { code: diagnosisCode } } : {}),
      },
      relations: {
        clinic: true,
        diagnosis: true,
      },
      order: { firstName: "ASC" },
    });
  }

  public async getPatientById(id: string): Promise<Patient> {
    const patient = await this.patientRepository.findOne({
      where: { id },
      relations: {
        clinic: true,
        diagnosis: true,
      },
    });

    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }

    return patient;
  }

  public async createPatient(data: CreatePatientRequest): Promise<Patient> {
    const clinicExists = await this.clinicRepository.existsBy({
      id: data.clinicId,
    });
    if (!clinicExists) {
      throw new BadRequestException(
        `Clinic with ID ${data.clinicId} does not exist`,
      );
    }

    const diagnosisExists = await this.diagnosisRepository.existsBy({
      id: data.diagnosisId,
    });
    if (!diagnosisExists) {
      throw new BadRequestException(
        `Diagnosis with ID ${data.diagnosisId} does not exist`,
      );
    }

    const newPatient = this.patientRepository.create(data);
    logger.info(
      `Creating new patient: ${data.firstName} ${data.lastName}`,
      "PatientsService",
    );

    return this.patientRepository.save(newPatient);
  }

  public async getPatientInsights(
    id: string,
  ): Promise<PatientInsightsResponse> {
    const patient = await this.getPatientById(id);

    let fdaInsights: DrugInsight[] = [];

    if (patient.currentMedication && patient.currentMedication.length > 0) {
      const insightPromises = patient.currentMedication.map((med) =>
        this.openFdaService.getDrugInsights(med),
      );

      fdaInsights = await Promise.all(insightPromises);
    }
    return {
      patientId: patient.id,
      patientName: `${patient.firstName} ${patient.lastName}`,
      diagnosis: `${patient.diagnosis.code} - ${patient.diagnosis.name}`,
      fdaInsights,
    };
  }
}
