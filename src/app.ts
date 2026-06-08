import cors from "cors";
import express, { Application, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";

import { httpLogger } from "./config/logger";
import { errorHandler } from "./middlewares/error";
import { RegisterRoutes } from "./routes";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, async (_req: Request, res: Response) => {
  return res.send(swaggerUi.generateHTML(await import("./docs/swagger.json")));
});

app.use(httpLogger);

RegisterRoutes(app);

app.use(errorHandler);

export default app;
