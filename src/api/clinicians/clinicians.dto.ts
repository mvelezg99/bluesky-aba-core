import { ClinicianType } from "../../database/enums/clinicians-type";

export interface ClinicSummary {
  id: string;
  name: string;
}

export interface ClinicianResponse {
  id: string;
  firstName: string;
  lastName: string;
  type: ClinicianType;
  clinic: ClinicSummary;
}

export interface CreateClinicianRequest {
  firstName: string;
  lastName: string;
  type: ClinicianType;
  clinicId: string;
}

export interface UpdateClinicianRequest {
  firstName?: string;
  lastName?: string;
  type?: ClinicianType;
  clinicId?: string;
}
