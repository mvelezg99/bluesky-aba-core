import { DataSource } from "typeorm";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const entitiesPath = path.normalize(
  path.resolve(
    __dirname,
    "..",
    "database",
    "entities",
    "**",
    "*.entity.{ts,js}",
  ),
);

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, // Ideal para la prueba, crea las tablas automáticamente
  logging: true,
  entities: [entitiesPath],
  subscribers: [],
  migrations: [],
});
