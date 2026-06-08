import { Controller, Get, Route, Security, SuccessResponse, Tags } from "tsoa";

import { HealthResponse } from "./health.dto";

@Tags("Health")
@Route("health")
@Security("jwt")
export class HealthController extends Controller {
  @Get("/")
  @SuccessResponse("200", "OK")
  public async getHealth(): Promise<HealthResponse> {
    return {
      status: "success",
      message: "BlueSky ABA Core API is running healthily",
      timestamp: new Date().toISOString(),
    };
  }
}
