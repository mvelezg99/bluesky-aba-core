import { Body, Controller, Post, Route, SuccessResponse, Tags } from "tsoa";

import { LoginRequest, LoginResponse } from "./auth.dto";
import { AuthService } from "./auth.service";

@Tags("Auth")
@Route("auth")
export class AuthController extends Controller {
  private authService = new AuthService();

  @Post("login")
  @SuccessResponse("200", "Authorized")
  public async login(@Body() body: LoginRequest): Promise<LoginResponse> {
    return this.authService.login(body);
  }
}
