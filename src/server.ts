import "reflect-metadata"; // OBLIGATORIO en la primera línea de tu app para TypeORM
import app from "./app";
import { AppDataSource } from "./config/database";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8000;

const bootstrap = async () => {
  try {
    // 1. Conectar a PostgreSQL
    await AppDataSource.initialize();
    console.log("📦 Database connected successfully via TypeORM");

    // 2. Levantar Express
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📖 Swagger docs at http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error("❌ Error starting server:", error);
    process.exit(1);
  }
};

bootstrap();
