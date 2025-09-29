import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { AttendanceSessionModule } from 'src/attendance-session/attendance-session.module';
import { AttendanceRecordModule } from 'src/attendance-record/attendance-record.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Course]),
    forwardRef(() => AttendanceSessionModule),
    AttendanceRecordModule,
  ],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService],
})
export class CourseModule {}
