import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttendanceRecord } from './attendance-record.entity';
import { StudentService } from 'src/student/student.service';

@Injectable()
export class AttendanceRecordService {
  constructor(
    @InjectRepository(AttendanceRecord)
    private attendanceRecordRepository: Repository<AttendanceRecord>,
    private readonly studentService: StudentService,
  ) {}

  findAll(): Promise<AttendanceRecord[]> {
    return this.attendanceRecordRepository.find();
  }

  async create(
    attendanceRecord: Partial<AttendanceRecord>,
  ): Promise<AttendanceRecord> {
    const existingAttendanceRecord = await this.findByAttendanceRecords(
      attendanceRecord.sessionId ?? 0,
      attendanceRecord.studentId ?? 0,
    );
    console.log(attendanceRecord.sessionId);
    console.log(attendanceRecord.studentId);
    console.log(existingAttendanceRecord);

    if (existingAttendanceRecord && existingAttendanceRecord?.length > 0) {
      throw new ConflictException('Attendance Record already in use.');
    }

    const student = await this.studentService.findOne(
      attendanceRecord.studentId ?? 0,
    );

    const request: Partial<AttendanceRecord> = {
      ...attendanceRecord,
      studentId: student?.id ?? 0,
    };

    const newUser = this.attendanceRecordRepository.create(request);

    return this.attendanceRecordRepository.save(newUser);
  }

  async update(
    id: number,
    attendanceSession: Partial<AttendanceRecord>,
  ): Promise<AttendanceRecord | null> {
    await this.attendanceRecordRepository.update(id, attendanceSession);
    return this.attendanceRecordRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.attendanceRecordRepository.delete({ id });
  }

  async findByAttendanceRecords(
    sessionId: number,
    studentId?: number,
  ): Promise<AttendanceRecord[] | null> {
    const response = await this.attendanceRecordRepository.find({
      relations: ['session', 'student'],
      where: {
        sessionId,
        student: {
          userId: studentId,
        },
      },
    });

    return response;
  }

  async findByAttendanceSession(
    sessionId: number,
  ): Promise<AttendanceRecord[] | null> {
    return this.attendanceRecordRepository.find({
      relations: ['session', 'student'],
      where: { sessionId },
    });
  }
}
