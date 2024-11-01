import { Module } from '@nestjs/common';
import { TaskCreate } from './application/TaskCreate/TaskCreate';
import { TaskDelete } from './application/TaskDelete/TaskDelete';
import { TaskEdit } from './application/TaskEdit/TaskEdit';
import { TaskGetAll } from './application/TaskGetAll/TaskGetAll';
import { TaskGetOneById } from './application/TaskGetOneById/TaskGetOneById';
import { TaskController } from './infrastructure/http/controllers/task.controller';
import { InMemoryTaskRepository } from './infrastructure/persistence/InMemory/InMemoryTask.repository';

@Module({
  controllers: [TaskController],
  providers: [
    {
      provide: 'TaskRepository',
      useClass: InMemoryTaskRepository,
    },
    {
      provide: 'TaskGetAll',
      useFactory: (repository: InMemoryTaskRepository) =>
        new TaskGetAll(repository),
      inject: ['TaskRepository'],
    },
    {
      provide: 'TaskGetOneById',
      useFactory: (repository: InMemoryTaskRepository) =>
        new TaskGetOneById(repository),
      inject: ['TaskRepository'],
    },
    {
      provide: 'TaskCreate',
      useFactory: (repository: InMemoryTaskRepository) =>
        new TaskCreate(repository),
      inject: ['TaskRepository'],
    },
    {
      provide: 'TaskEdit',
      useFactory: (repository: InMemoryTaskRepository) =>
        new TaskEdit(repository),
      inject: ['TaskRepository'],
    },
    {
      provide: 'TaskDelete',
      useFactory: (repository: InMemoryTaskRepository) =>
        new TaskDelete(repository),
      inject: ['TaskRepository'],
    },
  ],
})
export class TaskModule {}
