import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './course.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  findAll(): Promise<Course[]> {
    return this.courseRepository.find();
  }

  findByTeacher(teacherId: number): Promise<Course[]> {
    return this.courseRepository.findBy({ teacherId });
  }

  async create(course: Partial<Course>): Promise<Course> {
    const existingCourse = await this.findOneByCourseCode(
      course.courseCode ?? '',
    );
    if (existingCourse) {
      throw new ConflictException('Course already in use.');
    }

    const newUser = this.courseRepository.create(course);

    return this.courseRepository.save(newUser);
  }

  async update(id: number, course: Partial<Course>): Promise<Course | null> {
    await this.courseRepository.update(id, course);
    return this.courseRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.courseRepository.delete({ id });
  }

  findOneByCourseCode(courseCode: string): Promise<Course | null> {
    return this.courseRepository.findOneBy({ courseCode });
  }
}
