import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class UserLoginDto {
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @MaxLength(255)
  useremail: string;

  @IsString()
  @MinLength(8)
  password: string;
}
