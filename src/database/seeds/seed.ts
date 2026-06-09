import "reflect-metadata";

import { AppDataSource } from "../../config/database";
import { Clinic } from "../entities/Clinic.entity";
import { Clinician } from "../entities/Clinician.entity";
import { Diagnosis } from "../entities/Diagnosis.entity";
import { Patient } from "../entities/Patient.entity";
import { Session } from "../entities/Session.entity";

import cliniciansData from "./data/clinicians.json";
import clinicsData from "./data/clinics.json";
import diagnosesData from "./data/diagnoses.json";
import patientsData from "./data/patients.json";
import sessionsData from "./data/sessions.json";

const seedDatabase = async () => {
  try {
    console.log("🌱 Starting database seed process...");
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

    console.log("📥 Inserting Diagnostics and Clinics...");
    await AppDataSource.getRepository(Diagnosis).save(diagnosesData);
    await AppDataSource.getRepository(Clinic).save(clinicsData);

    console.log("📥 Inserting Clinicians...");
    await AppDataSource.getRepository(Clinician).save(
      cliniciansData as unknown as Partial<Clinician>[],
    );

    console.log("📥 Inserting Patients...");
    await AppDataSource.getRepository(Patient).save(patientsData);

    console.log("📥 Inserting Sessions...");
    await AppDataSource.getRepository(Session).save(sessionsData);

    console.log("✅ Seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error during seeding:", error);
  } finally {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      console.log("🔌 Database connection closed.");
    }
    process.exit(0);
  }
};

seedDatabase();
