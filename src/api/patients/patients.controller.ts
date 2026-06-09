import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Route,
  Security,
  Tags,
} from "tsoa";

import { Patient } from "../../database/entities/Patient.entity";

import {
  CreatePatientRequest,
  PatientInsightsResponse,
  PatientResponse,
} from "./patients.dto";
import { PatientsService } from "./patients.service";
import { calculateAgeGroup } from "./patients.util";

@Tags("Patients")
@Route("patients")
@Security("jwt")
export class PatientsController extends Controller {
  private patientsService = new PatientsService();

  private buildPatientResponse(patient: Patient): PatientResponse {
    return {
      id: patient.id,
      firstName: patient.firstName,
      lastName: patient.lastName,
      dateOfBirth: patient.dateOfBirth,
      ageGroup: calculateAgeGroup(patient.dateOfBirth),
      currentMedication: patient.currentMedication,
      clinic: {
        id: patient.clinic.id,
        name: patient.clinic.name,
      },
      diagnosis: {
        id: patient.diagnosis.id,
        code: patient.diagnosis.code,
        name: patient.diagnosis.name,
        description: patient.diagnosis.description,
      },
    };
  }

  @Get("/")
  public async getPatients(
    @Query() diagnosisCode?: string,
  ): Promise<PatientResponse[]> {
    const patients = await this.patientsService.getPatients(diagnosisCode);
    return patients.map((patient) => this.buildPatientResponse(patient));
  }

  @Get("{id}")
  public async getPatient(@Path() id: string): Promise<PatientResponse> {
    const patient = await this.patientsService.getPatientById(id);
    return this.buildPatientResponse(patient);
  }

  @Post("/")
  public async createPatient(
    @Body() requestBody: CreatePatientRequest,
  ): Promise<PatientResponse> {
    const patient = await this.patientsService.createPatient(requestBody);
    return this.buildPatientResponse(patient);
  }

  @Get("{id}/insights")
  public async getPatientInsights(
    @Path() id: string,
  ): Promise<PatientInsightsResponse> {
    return this.patientsService.getPatientInsights(id);
  }
}
