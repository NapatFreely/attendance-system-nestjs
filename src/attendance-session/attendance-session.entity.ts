import { AttendanceRecord } from 'src/attendance-record/attendance-record.entity';
import { Course } from 'src/course/course.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class AttendanceSession {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'session_id' })
  sessionId: string;

  @Column({ name: 'course_id' })
  courseId: number;

  @Column({ name: 'session_date', type: 'timestamp' })
  sessionDate: Date;

  @Column()
  semester: string;

  @Column({ name: 'academic_year' })
  academicYear: number;

  @Column({ name: 'course_name' })
  courseName: string;

  @OneToMany(() => AttendanceRecord, (record) => record.session)
  attendanceRecords: AttendanceRecord[];

  @ManyToOne(() => Course)
  @JoinColumn({ name: 'course_id' })
  course: Course;
}
