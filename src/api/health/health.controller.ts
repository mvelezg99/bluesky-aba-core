import { Controller, Get, Route, SuccessResponse, Tags } from "tsoa";
import { HealthResponse } from "./health.dto";

@Tags("Health")
@Route("health")
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
