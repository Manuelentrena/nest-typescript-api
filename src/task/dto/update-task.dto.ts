import { IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  name: string;
}
