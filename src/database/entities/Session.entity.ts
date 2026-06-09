import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Clinician } from "./Clinician.entity";
import { Patient } from "./Patient.entity";

@Entity("sessions")
export class Session {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "date" })
  sessionDate: Date;

  @Column({ type: "int" })
  durationMinutes: number;

  @Column({ type: "text", nullable: true })
  notes: string | null;

  @Column({ name: "patient_id", type: "uuid" })
  patientId: string;

  @ManyToOne(() => Patient)
  @JoinColumn({ name: "patient_id" })
  patient: Patient;

  @Column({ name: "clinician_id", type: "uuid" })
  clinicianId: string;

  @ManyToOne(() => Clinician)
  @JoinColumn({ name: "clinician_id" })
  clinician: Clinician;

  @CreateDateColumn({ select: false })
  createdAt: Date;
}
