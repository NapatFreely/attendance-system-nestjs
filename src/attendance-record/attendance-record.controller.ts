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
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/utils/jwt-guard';
import { AttendanceRecordService } from './attendance-record.service';
import { AttendanceRecord } from './attendance-record.entity';

@Controller('attendanceRecord')
export class AttendanceRecordController {
  constructor(
    private readonly attendanceRecordService: AttendanceRecordService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  find(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<AttendanceRecord[] | null> {
    return this.attendanceRecordService.findByAttendanceSession(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() attendanceSession: Partial<AttendanceRecord>,
  ): Promise<AttendanceRecord> {
    return this.attendanceRecordService.create(attendanceSession);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() attendanceRecord: Partial<AttendanceRecord>,
  ): Promise<AttendanceRecord | null> {
    return this.attendanceRecordService.update(id, attendanceRecord);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.attendanceRecordService.remove(id);
  }
}
