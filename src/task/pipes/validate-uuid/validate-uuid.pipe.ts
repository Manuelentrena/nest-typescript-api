import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { isUUID } from 'class-validator';

@Injectable()
export class ValidateUUIDPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log({ value });
    if (!isUUID(value)) {
      throw new BadRequestException('Id must be a uuid');
    }
    return value;
  }
}
