import { User } from '@prisma/client';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto implements Partial<User> {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
