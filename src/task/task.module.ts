import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './logger/logger.middleware';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('tasks');
  }
}
