import {
  IsDateString,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  name: string;

  @IsDateString()
  date: Date;

  @IsDateString()
  createdAt: Date;

  @IsUUID()
  userId: string;
}
