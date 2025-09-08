import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: number;

  @Column({ name: 'student_code', nullable: true })
  studentCode?: string;

  @Column({ name: 'department', nullable: true })
  department?: string;
}
