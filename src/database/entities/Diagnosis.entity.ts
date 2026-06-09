import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("diagnoses")
export class Diagnosis {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 50, unique: true })
  code: string;

  @Column({ type: "varchar", length: 150 })
  name: string;

  @Column({ type: "text", nullable: true })
  description: string | null;
}
