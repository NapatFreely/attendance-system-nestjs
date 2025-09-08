import { AttendanceRecord } from 'src/attendance-record/attendance-record.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', unique: true })
  userId: number;

  @Column()
  name: string;

  @Column()
  department: string;

  @Column({ name: 'student_code', type: 'varchar', length: 255 })
  studentCode: string;

  @OneToMany(() => AttendanceRecord, (record) => record.student)
  attendanceRecords: AttendanceRecord[];
}
