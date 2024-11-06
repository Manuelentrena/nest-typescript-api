import { IsString, MinLength } from 'class-validator';

export class AuthResetPasswordDto {
  @IsString()
  @MinLength(8)
  newPassword: string;
}
