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
  Req,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { JwtAuthGuard } from 'src/utils/jwt-guard';
import { Student } from 'src/student/student.entity';
import { Teacher } from 'src/teacher/teacher.entity';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger('UsersController');

  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req): Promise<User | null> {
    const response = await this.usersService.getProfile(req.user);
    this.logger.log(`Profile Response: ${response}`);

    const user: User = {
      id: req.user.userId,
      name: response?.name ?? '',
      email: req.user.email,
      password: '',
      role: req.user.role === 'TEACHER' ? 1 : 0,
      studentCode: (response as Student).studentCode,
      department: (response as Student).department,
    };

    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    return user;
  }

  @Post()
  create(@Body() user: Partial<User>): Promise<User> {
    return this.usersService.create(user);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: Partial<User>,
  ): Promise<User | null> {
    return this.usersService.update(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.usersService.remove(id);
  }
}
