import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from './teacher.entity';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private teachersRepository: Repository<Teacher>,
  ) {}

  findAll(): Promise<Teacher[]> {
    return this.teachersRepository.find();
  }

  findOne(userId: number): Promise<Teacher | null> {
    return this.teachersRepository.findOneBy({ userId });
  }

  async create(teacher: Partial<Teacher>): Promise<Teacher> {
    const newTeacher = this.teachersRepository.create(teacher);
    return this.teachersRepository.save(newTeacher);
  }

  async update(id: number, user: Partial<Teacher>): Promise<Teacher | null> {
    await this.teachersRepository.update(id, user);
    return this.teachersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.teachersRepository.delete(id);
  }
}
