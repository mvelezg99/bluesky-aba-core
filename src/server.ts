import "reflect-metadata";

import app from "./app";
import { AppDataSource } from "./config/database";
import { config } from "./config/env";

const PORT = config.app.port || 8000;

const bootstrap = async () => {
  try {
    await AppDataSource.initialize();
    console.log("📦 Database connected successfully via TypeORM");

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
