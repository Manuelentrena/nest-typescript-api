import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { TaskNotFoundError } from 'src/modules/task/domain/errors/TaskNotFound.error';
import { UserNotFoundError } from 'src/modules/user/domain/errors/UserNotFound.error';
import { UserPasswordInvalidError } from 'src/modules/user/domain/errors/UserPasswordInvalid.error';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'An unexpected error occurred';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const responseBody = exception.getResponse();
      if (typeof responseBody === 'string') {
        message = responseBody;
      } else {
        message = (responseBody as any).message || message;
      }
    } else if (exception instanceof TaskNotFoundError) {
      status = HttpStatus.NOT_FOUND;
      message = exception.message;
    } else if (exception instanceof UserNotFoundError) {
      status = HttpStatus.NOT_FOUND;
      message = exception.message;
    } else if (exception instanceof UserPasswordInvalidError) {
      status = HttpStatus.NOT_FOUND;
      message = exception.message;
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
