import {
  IsDateString,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTaskDto {
  @IsUUID()
  id: string;

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  name: string;

  @IsDateString()
  date: Date;
}
