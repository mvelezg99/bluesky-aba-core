import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Clinic } from "./Clinic.entity";
import { Diagnosis } from "./Diagnosis.entity";

@Entity("patients")
export class Patient {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 100 })
  firstName: string;

  @Column({ type: "varchar", length: 100 })
  lastName: string;

  @Column({ type: "date" })
  dateOfBirth: string;

  @Column({ type: "varchar", array: true, nullable: true })
  currentMedication: string[] | null;

  @Column({ name: "clinic_id", type: "uuid" })
  clinicId: string;

  @ManyToOne(() => Clinic)
  @JoinColumn({ name: "clinic_id" })
  clinic: Clinic;

  @Column({ name: "diagnosis_id", type: "uuid" })
  diagnosisId: string;

  @ManyToOne(() => Diagnosis)
  @JoinColumn({ name: "diagnosis_id" })
  diagnosis: Diagnosis;

  @CreateDateColumn({ select: false })
  createdAt: Date;
}
