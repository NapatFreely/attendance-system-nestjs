import { AttendanceRecord } from 'src/attendance-record/attendance-record.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class QrCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'student_id' })
  studentId: number;

  @Column({ name: 'qr_value' })
  qrValue: string;

  @Column({ name: 'generated_at' })
  generatedAt: Date;

  @Column({ name: 'expired_at' })
  expiredAt: Date;
}
