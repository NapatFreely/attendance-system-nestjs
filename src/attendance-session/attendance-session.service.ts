import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttendanceSession } from './attendance-session.entity';
import { User } from 'src/users/users.entity';
import { StudentService } from 'src/student/student.service';

@Injectable()
export class AttendanceSessionService {
  constructor(
    @InjectRepository(AttendanceSession)
    private attendanceSessionRepository: Repository<AttendanceSession>,
    private readonly studentService: StudentService,
  ) {}

  async findAll(user: {
    userId: number;
    role: string;
  }): Promise<AttendanceSession[]> {
    if (user.role === 'TEACHER') {
      return this.attendanceSessionRepository.find({
        relations: ['course', 'attendanceRecords'],
        where: { course: { teacherId: user.userId } },
      });
    }

    const student = await this.studentService.findOne(user.userId);

    return this.attendanceSessionRepository.find({
      relations: ['course', 'attendanceRecords'],
      where: { attendanceRecords: { studentId: student?.id ?? 0 } },
    });
  }

  findOne(id: number): Promise<AttendanceSession | null> {
    return this.attendanceSessionRepository.findOneBy({ id });
  }

  async create(
    attendanceSession: Partial<AttendanceSession>,
  ): Promise<AttendanceSession> {
    const existingStudent = await this.findOneByAttendanceSession(
      attendanceSession.sessionId ?? '',
      attendanceSession.courseId ?? 0,
    );
    if (existingStudent) {
      throw new ConflictException('Session Id already in use.');
    }

    const newUser = this.attendanceSessionRepository.create(attendanceSession);

    return this.attendanceSessionRepository.save(newUser);
  }

  async update(
    sessionId: string,
    attendanceSession: Partial<AttendanceSession>,
  ): Promise<AttendanceSession | null> {
    await this.attendanceSessionRepository.update(sessionId, attendanceSession);
    return this.attendanceSessionRepository.findOneBy({ sessionId });
  }

  async remove(id: number): Promise<void> {
    await this.attendanceSessionRepository.delete({ id });
  }

  async removeAllCourse(id: number): Promise<void> {
    await this.attendanceSessionRepository.delete({ courseId: id });
  }

  findOneByAttendanceSession(
    sessionId: string,
    courseId: number,
  ): Promise<AttendanceSession | null> {
    return this.attendanceSessionRepository.findOneBy({ sessionId, courseId });
  }

  findByCourseId(courseId: number): Promise<AttendanceSession[]> {
    return this.attendanceSessionRepository.findBy({ courseId });
  }
}
