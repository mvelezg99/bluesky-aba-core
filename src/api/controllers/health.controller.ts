import { Controller, Get, Route, SuccessResponse, Tags } from "tsoa";

// 1. TSOA usará esta interfaz para documentar el tipado de salida en Swagger
interface HealthResponse {
  status: string;
  message: string;
  timestamp: string;
}

@Tags("Health")
@Route("api/v1/health")
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
