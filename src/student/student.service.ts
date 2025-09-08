import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  findAll(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  findOne(userId: number): Promise<Student | null> {
    return this.studentRepository.findOneBy({ userId });
  }

  async create(student: Partial<Student>): Promise<Student> {
    const existingStudent = await this.findOneByStudentCode(
      student.studentCode ?? '',
    );
    if (existingStudent) {
      throw new ConflictException('StudentCode already in use.');
    }

    const newUser = this.studentRepository.create(student);

    return this.studentRepository.save(newUser);
  }

  async update(
    studentCode: string,
    student: Partial<Student>,
  ): Promise<Student | null> {
    await this.studentRepository.update(studentCode, student);
    return this.studentRepository.findOneBy({ studentCode });
  }

  async remove(id: string): Promise<void> {
    await this.studentRepository.delete({ studentCode: id });
  }

  findOneByStudentCode(studentCode: string): Promise<Student | null> {
    return this.studentRepository.findOneBy({ studentCode });
  }
}
