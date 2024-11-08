import { IsUUID } from 'class-validator';

export class AuthLogoutDto {
  @IsUUID()
  id: string;
}
