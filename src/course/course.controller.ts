import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  NotFoundException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/utils/jwt-guard';
import { CourseService } from './course.service';
import { Course } from './course.entity';
import { AttendanceSessionService } from 'src/attendance-session/attendance-session.service';
import { AttendanceRecordService } from 'src/attendance-record/attendance-record.service';

@Controller('course')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private readonly attendanceSessionService: AttendanceSessionService,
    private readonly attendanceRecordService: AttendanceRecordService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Course[]> {
    return this.courseService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findByTeachId(@Param('id', ParseIntPipe) id: number): Promise<Course[]> {
    return this.courseService.findByTeacher(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() course: Partial<Course>): Promise<Course> {
    return this.courseService.create(course);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() course: Partial<Course>,
  ): Promise<Course | null> {
    return this.courseService.update(id, course);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/:sessionId')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Param('sessionId', ParseIntPipe) sessionId: number,
  ): Promise<void> {
    const session = await this.attendanceSessionService.findOne(sessionId);
    if (session) {
      this.attendanceRecordService.removeAllSession(session.id);
      this.attendanceSessionService.remove(sessionId);
    } else {
      await this.courseService.remove(id);
    }
  }
}
