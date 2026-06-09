import { DrugInsight } from "../../integrations/openfda/openfda.service";

import { AgeGroup } from "./patients.util";

export interface PatientResponse {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  ageGroup: AgeGroup;
  currentMedication: string[] | null;
  clinic: {
    id: string;
    name: string;
  };
  diagnosis: {
    id: string;
    code: string;
    name: string;
    description: string | null;
  };
}

export interface CreatePatientRequest {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  currentMedication?: string[] | null;
  clinicId: string;
  diagnosisId: string;
}

export interface PatientInsightsResponse {
  patientId: string;
  patientName: string;
  diagnosis: string;
  fdaInsights: DrugInsight[];
}
