import {
  Body,
  Controller,
  Delete,
  Get,
  Path,
  Post,
  Put,
  Route,
  Security,
  Tags,
} from "tsoa";

import {
  ClinicResponse,
  CreateClinicRequest,
  UpdateClinicRequest,
} from "./clinics.dto";
import { ClinicsService } from "./clinics.service";

@Tags("Clinics")
@Route("clinics")
@Security("jwt")
export class ClinicsController extends Controller {
  private clinicsService = new ClinicsService();

  @Get("/")
  public async getClinics(): Promise<ClinicResponse[]> {
    return this.clinicsService.getAllClinics();
  }

  @Get("{id}")
  public async getClinic(@Path() id: string): Promise<ClinicResponse> {
    return this.clinicsService.getClinicById(id);
  }

  @Post("/")
  public async createClinic(
    @Body() requestBody: CreateClinicRequest,
  ): Promise<ClinicResponse> {
    return this.clinicsService.createClinic(requestBody);
  }

  @Put("{id}")
  public async updateClinic(
    @Path() id: string,
    @Body() requestBody: UpdateClinicRequest,
  ): Promise<ClinicResponse> {
    return this.clinicsService.updateClinic(id, requestBody);
  }

  @Delete("{id}")
  public async deleteClinic(@Path() id: string): Promise<void> {
    return this.clinicsService.deleteClinic(id);
  }
}
