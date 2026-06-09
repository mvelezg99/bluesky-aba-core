import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { ClinicianType } from "../enums/clinicians-type";

import { Clinic } from "./Clinic.entity";

@Entity("clinicians")
export class Clinician {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 100 })
  firstName: string;

  @Column({ type: "varchar", length: 100 })
  lastName: string;

  @Column({ type: "enum", enum: ClinicianType })
  type: string;

  @Column({ name: "clinic_id", type: "uuid" })
  clinicId: string;

  @ManyToOne(() => Clinic)
  @JoinColumn({ name: "clinic_id" })
  clinic: Clinic;
}
