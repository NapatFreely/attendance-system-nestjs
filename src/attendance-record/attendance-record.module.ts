import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceRecord } from './attendance-record.entity';
import { AttendanceRecordController } from './attendance-record.controller';
import { AttendanceRecordService } from './attendance-record.service';
import { StudentModule } from 'src/student/student.module';

@Module({
  imports: [TypeOrmModule.forFeature([AttendanceRecord]), StudentModule],
  controllers: [AttendanceRecordController],
  providers: [AttendanceRecordService],
  exports: [AttendanceRecordService],
})
export class AttendanceRecordModule {}
