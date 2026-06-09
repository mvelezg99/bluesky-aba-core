import { Controller, Get, Path, Query, Route, Security, Tags } from "tsoa";

import { DiagnosisResponse } from "./diagnoses.dto";
import { DiagnosesService } from "./diagnoses.service";

@Tags("Diagnoses")
@Route("diagnoses")
@Security("jwt")
export class DiagnosesController extends Controller {
  private diagnosesService = new DiagnosesService();

  @Get("/")
  public async getDiagnoses(
    @Query() search?: string,
  ): Promise<DiagnosisResponse[]> {
    return this.diagnosesService.getDiagnoses(search);
  }

  @Get("{id}")
  public async getDiagnosis(@Path() id: string): Promise<DiagnosisResponse> {
    return this.diagnosesService.getDiagnosisById(id);
  }

  @Get("code/{code}")
  public async getDiagnosisByCode(
    @Path() code: string,
  ): Promise<DiagnosisResponse> {
    return this.diagnosesService.getDiagnosisByCode(code);
  }
}
