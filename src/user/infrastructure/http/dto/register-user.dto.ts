import {
  IsEmail,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserRegisterDto {
  @IsUUID()
  id: string;

  @IsString()
  @MinLength(3)
  @MaxLength(255)
  username: string;

  @IsEmail()
  @MaxLength(320)
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}
