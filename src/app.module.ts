import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TeacherModule } from './teacher/teacher.module';
import { StudentModule } from './student/student.module';
import { Teacher } from './teacher/teacher.entity';
import { Student } from './student/student.entity';
import { AttendanceSession } from './attendance-session/attendance-session.entity';
import { AttendanceSessionModule } from './attendance-session/attendance-session.module';
import { Course } from './course/course.entity';
import { CourseModule } from './course/course.module';
import { AttendanceRecord } from './attendance-record/attendance-record.entity';
import { AttendanceRecordModule } from './attendance-record/attendance-record.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UploadController } from './upload/upload.controller';
import { QrCode } from './qr-code/qr-code.entity';
import { QrCodeModule } from './qr-code/qr-code.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'smart_attendance_system',
      entities: [
        User,
        Teacher,
        Student,
        AttendanceSession,
        Course,
        AttendanceRecord,
        QrCode,
      ],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // serve /uploads
      serveRoot: '/uploads', // URL prefix
    }),
    UsersModule,
    AuthModule,
    TeacherModule,
    StudentModule,
    AttendanceSessionModule,
    CourseModule,
    AttendanceRecordModule,
    QrCodeModule,
  ],
  controllers: [UploadController],
  providers: [],
})
export class AppModule {}
