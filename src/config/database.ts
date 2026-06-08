import path from "path";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

import { config } from "./env";

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
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.name,
  synchronize: true,
  logging: true,
  namingStrategy: new SnakeNamingStrategy(),
  entities: [entitiesPath],
  subscribers: [],
  migrations: [],
});
