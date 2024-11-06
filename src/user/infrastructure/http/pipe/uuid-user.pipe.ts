import { IsUUID } from 'class-validator';

export class FindOneUserParams {
  @IsUUID()
  id: string;
}
