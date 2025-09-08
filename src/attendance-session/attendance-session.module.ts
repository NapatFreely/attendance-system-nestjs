import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceSession } from './attendance-session.entity';
import { AttendanceSessionController } from './attendance-session.controller';
import { AttendanceSessionService } from './attendance-session.service';
import { StudentModule } from 'src/student/student.module';

@Module({
  imports: [TypeOrmModule.forFeature([AttendanceSession]), StudentModule],
  controllers: [AttendanceSessionController],
  providers: [AttendanceSessionService],
  exports: [AttendanceSessionService],
})
export class AttendanceSessionModule {}
