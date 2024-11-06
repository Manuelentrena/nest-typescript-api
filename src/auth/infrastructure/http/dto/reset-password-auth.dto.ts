import { IsString, MinLength } from 'class-validator';

export class UserResetPasswordDto {
  @IsString()
  @MinLength(8)
  newPassword: string;
}
