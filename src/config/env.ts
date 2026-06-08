import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;

  if (value === undefined) {
    throw new Error(`💥 Config Error: Variable [${key}] is mandatory.`);
  }

  return value;
};

export const config = {
  app: {
    port: parseInt(getEnv("PORT", "8000"), 10) || 8000,
  },
  jwt: {
    secret: getEnv("JWT_SECRET"),
    expiresIn: getEnv("JWT_EXPIRES_IN", "1h"),
  },
  admin: {
    user: getEnv("AUTH_ADMIN_USER"),
    password: getEnv("AUTH_ADMIN_PASSWORD"),
  },
  db: {
    host: getEnv("DB_HOST", "localhost"),
    port: parseInt(getEnv("DB_PORT", "5432"), 10) || 5432,
    username: getEnv("DB_USER"),
    password: getEnv("DB_PASSWORD"),
    name: getEnv("DB_NAME"),
  },
};
