import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

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

  @Column({ type: "varchar", length: 255, nullable: true })
  diagnosis: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
