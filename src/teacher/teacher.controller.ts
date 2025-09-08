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
import { TeacherService } from './teacher.service';
import { Teacher } from './teacher.entity';
import { JwtAuthGuard } from 'src/utils/jwt-guard';

@Controller('teachers')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Teacher[]> {
    return this.teacherService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Teacher> {
    const teacher = await this.teacherService.findOne(id);
    if (!teacher) {
      throw new NotFoundException(`Teacher with ID ${id} not found.`);
    }
    return teacher;
  }

  @Post()
  create(@Body() teacher: Partial<Teacher>): Promise<Teacher> {
    return this.teacherService.create(teacher);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() teacher: Partial<Teacher>,
  ): Promise<Teacher | null> {
    return this.teacherService.update(id, teacher);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.teacherService.remove(id);
  }
}
