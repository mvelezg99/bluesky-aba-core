import jwt, { SignOptions } from "jsonwebtoken";

import { config } from "../config/env";

import { UnauthorizedException } from "./exceptions";

export interface TokenPayload {
  username: string;
  role: string;
}

const SECRET = config.jwt.secret;

export const generateToken = (payload: TokenPayload): string => {
  const options: SignOptions = {
    expiresIn: config.jwt.expiresIn as SignOptions["expiresIn"],
  };

  return jwt.sign(payload, SECRET, options);
};

export const verifyToken = (token: string): TokenPayload => {
  try {
    return jwt.verify(token, SECRET) as TokenPayload;
  } catch {
    throw new UnauthorizedException("Invalid or expired token");
  }
};
