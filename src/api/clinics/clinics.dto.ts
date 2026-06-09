export interface ClinicResponse {
  id: string;
  name: string;
}

export interface CreateClinicRequest {
  name: string;
}

export interface UpdateClinicRequest {
  name?: string;
}
