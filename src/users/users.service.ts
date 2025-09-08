import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';
import { StudentService } from 'src/student/student.service';
import { TeacherService } from 'src/teacher/teacher.service';
import { RoleEnum } from 'src/enum/user.enum';
import { Student } from 'src/student/student.entity';
import { Teacher } from 'src/teacher/teacher.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly studentService: StudentService,
    private readonly teacherService: TeacherService,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async create(user: Partial<User>): Promise<User> {
    const existingUser = await this.findOneByEmail(user.email ?? '');
    if (existingUser) {
      throw new ConflictException('Email already in use.');
    }

    const role = user.role;

    if (role === RoleEnum.STUDENT) {
      const existingStudent = await this.studentService.findOneByStudentCode(
        user.studentCode ?? '',
      );

      if (existingStudent) {
        throw new ConflictException('Student Code already in use.');
      }
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password ?? '', salt);

    const newUser = this.usersRepository.create({
      ...user,
      password: hashedPassword,
    });

    const savedUser = await this.usersRepository.save(newUser);

    if (role === RoleEnum.STUDENT) {
      await this.studentService.create({
        userId: savedUser.id,
        studentCode: user.studentCode ?? '',
        name: user.name ?? '',
        department: user.department ?? '',
      });
    } else {
      await this.teacherService.create({
        userId: savedUser.id,
        name: user.name ?? '',
      });
    }

    return savedUser;
  }

  async update(id: number, user: Partial<User>): Promise<User | null> {
    await this.usersRepository.update(id, user);
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async getProfile(user: {
    userId: number;
    role: string;
  }): Promise<Teacher | Student | null> {
    if (user.role === 'STUDENT') {
      return this.studentService.findOne(user.userId);
    } else if (user.role === 'TEACHER') {
      return this.teacherService.findOne(user.userId);
    }
    throw new Error('Invalid role');
  }
}
