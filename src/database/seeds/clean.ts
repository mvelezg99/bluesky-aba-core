import "reflect-metadata";

import { AppDataSource } from "../../config/database";
import { Clinic } from "../entities/Clinic.entity";
import { Clinician } from "../entities/Clinician.entity";
import { Diagnosis } from "../entities/Diagnosis.entity";
import { Patient } from "../entities/Patient.entity";
import { Session } from "../entities/Session.entity";

const cleanDatabase = async () => {
  try {
    console.log("🧹 Starting database clean process...");
    await AppDataSource.initialize();
    console.log("📦 Database connected.");

    console.log("🧹 Clearing existing data...");
    await AppDataSource.getRepository(Session)
      .createQueryBuilder()
      .delete()
      .execute();
    await AppDataSource.getRepository(Patient)
      .createQueryBuilder()
      .delete()
      .execute();
    await AppDataSource.getRepository(Clinician)
      .createQueryBuilder()
      .delete()
      .execute();
    await AppDataSource.getRepository(Diagnosis)
      .createQueryBuilder()
      .delete()
      .execute();
    await AppDataSource.getRepository(Clinic)
      .createQueryBuilder()
      .delete()
      .execute();

    console.log("✅ Cleaning completed successfully!");
  } catch (error) {
    console.error("❌ Error during cleaning:", error);
  } finally {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      console.log("🔌 Database connection closed.");
    }
    process.exit(0);
  }
};

cleanDatabase();
