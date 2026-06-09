import {
  Body,
  Controller,
  Delete,
  Get,
  Path,
  Post,
  Put,
  Query,
  Route,
  Security,
  Tags,
} from "tsoa";

import { ClinicianType } from "../../database/enums/clinicians-type";

import {
  ClinicianResponse,
  CreateClinicianRequest,
  UpdateClinicianRequest,
} from "./clinicians.dto";
import { CliniciansService } from "./clinicians.service";

@Tags("Clinicians")
@Route("clinicians")
@Security("jwt")
export class CliniciansController extends Controller {
  private cliniciansService = new CliniciansService();

  @Get("/")
  public async getClinicians(
    @Query() clinicId?: string,
    @Query() type?: ClinicianType,
  ): Promise<ClinicianResponse[]> {
    return this.cliniciansService.getClinicians(clinicId, type);
  }

  @Get("{id}")
  public async getClinician(@Path() id: string): Promise<ClinicianResponse> {
    return this.cliniciansService.getClinicianById(id);
  }

  @Post("/")
  public async createClinician(
    @Body() requestBody: CreateClinicianRequest,
  ): Promise<ClinicianResponse> {
    return this.cliniciansService.createClinician(requestBody);
  }

  @Put("{id}")
  public async updateClinician(
    @Path() id: string,
    @Body() requestBody: UpdateClinicianRequest,
  ): Promise<ClinicianResponse> {
    return this.cliniciansService.updateClinician(id, requestBody);
  }

  @Delete("{id}")
  public async deleteClinician(@Path() id: string): Promise<void> {
    return this.cliniciansService.deleteClinician(id);
  }
}
