import * as express from "express";

import { UnauthorizedException } from "../utils/exceptions";
import { verifyToken } from "../utils/jwt";

export function expressAuthentication(
  request: express.Request,
  securityName: string,
  _scopes?: string[],
): Promise<unknown> {
  if (securityName === "jwt") {
    const authHeader = request.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return Promise.reject(new UnauthorizedException("No token provided"));
    }

    try {
      const decoded = verifyToken(token);
      return Promise.resolve(decoded);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  return Promise.reject(
    new UnauthorizedException("Security scheme not supported"),
  );
}
