import { IsUUID } from 'class-validator';

export class FindOneTaskParams {
  @IsUUID()
  id: string;
}
