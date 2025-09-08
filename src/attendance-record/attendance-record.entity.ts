import { AttendanceSession } from 'src/attendance-session/attendance-session.entity';
import { Student } from 'src/student/student.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class AttendanceRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'session_id' })
  sessionId: number;

  @Column({ name: 'student_id' })
  studentId: number;

  @Column({ name: 'check_in_time', type: 'timestamp' })
  checkInTime: Date;

  @Column()
  status: number;

  @Column({ name: 'reason' })
  reason: string;

  @Column({ name: 'attachment_url' })
  attachmentUrl: string;

  @Column({ name: 'requested_at', type: 'timestamp' })
  requestedAt: Date;

  @ManyToOne(() => AttendanceSession, (session) => session.attendanceRecords)
  @JoinColumn({ name: 'session_id' })
  session: AttendanceSession;

  @ManyToOne(() => Student, (student) => student.attendanceRecords)
  @JoinColumn({ name: 'student_id' })
  student: Student;
}
