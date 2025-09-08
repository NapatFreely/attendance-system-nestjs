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
import { AttendanceSessionService } from './attendance-session.service';
import { AttendanceSession } from './attendance-session.entity';

@Controller('attendanceSession')
export class AttendanceSessionController {
  constructor(
    private readonly attendanceSessionService: AttendanceSessionService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req): Promise<AttendanceSession[]> {
    return this.attendanceSessionService.findAll(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('sessions/:courseId')
  findAllSession(
    @Param('courseId', ParseIntPipe) courseId: number,
  ): Promise<AttendanceSession[]> {
    return this.attendanceSessionService.findByCourseId(courseId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<AttendanceSession> {
    const attendanceSession = await this.attendanceSessionService.findOne(id);
    if (!attendanceSession) {
      throw new NotFoundException(
        `Attendance Session with ID ${id} not found.`,
      );
    }
    return attendanceSession;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() attendanceSession: Partial<AttendanceSession>,
  ): Promise<AttendanceSession> {
    return this.attendanceSessionService.create(attendanceSession);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() attendanceSession: Partial<AttendanceSession>,
  ): Promise<AttendanceSession | null> {
    return this.attendanceSessionService.update(id, attendanceSession);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.attendanceSessionService.remove(id);
  }
}
