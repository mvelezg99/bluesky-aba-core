import { config } from "../../config/env";
import { UnauthorizedException } from "../../utils/exceptions";
import { generateToken } from "../../utils/jwt";

import { LoginRequest, LoginResponse } from "./auth.dto";

export class AuthService {
  public async login(credentials: LoginRequest): Promise<LoginResponse> {
    if (
      credentials.username === config.admin.user &&
      credentials.password === config.admin.password
    ) {
      const token = generateToken({
        username: credentials.username,
        role: "admin",
      });

      return {
        token,
        expiresIn: config.jwt.expiresIn || "1h",
      };
    }

    throw new UnauthorizedException("Invalid credentials");
  }
}
