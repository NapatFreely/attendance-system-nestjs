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
import { StudentService } from './student.service';
import { Student } from './student.entity';
import { JwtAuthGuard } from 'src/utils/jwt-guard';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  findAll(): Promise<Student[]> {
    return this.studentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Student> {
    const student = await this.studentService.findOne(id);
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found.`);
    }
    return student;
  }

  @Post()
  create(@Body() student: Partial<Student>): Promise<Student> {
    return this.studentService.create(student);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() student: Partial<Student>,
  ): Promise<Student | null> {
    return this.studentService.update(id, student);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: string): Promise<void> {
    await this.studentService.remove(id);
  }
}
