import express, { Application, Request, Response } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "./routes";
import { ValidateError } from "tsoa"; // 1. Importar el tipo de error de TSOA

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, async (_req: Request, res: Response) => {
  return res.send(swaggerUi.generateHTML(await import("./docs/swagger.json")));
});

RegisterRoutes(app);

// 2. Reemplazar "err: any" por "err: unknown" y usar ValidateError
app.use(function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: express.NextFunction,
): express.Response | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields,
    });
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
  next();
});

export default app;
