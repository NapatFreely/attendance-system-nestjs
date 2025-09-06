import { IsString, IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password?: string;

  @IsString()
  readonly name: string;

  @IsNumber()
  readonly role: number;
}
