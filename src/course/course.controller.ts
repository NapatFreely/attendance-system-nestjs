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

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Course[]> {
    return this.courseService.findAll();
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
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.courseService.remove(id);
  }
}
