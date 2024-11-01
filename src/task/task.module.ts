import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskCreate } from './application/TaskCreate/TaskCreate';
import { TaskDelete } from './application/TaskDelete/TaskDelete';
import { TaskEdit } from './application/TaskEdit/TaskEdit';
import { TaskGetAll } from './application/TaskGetAll/TaskGetAll';
import { TaskGetOneById } from './application/TaskGetOneById/TaskGetOneById';
import { TaskController } from './infrastructure/http/controllers/task.controller';
import { TypeOrmTaskEntity } from './infrastructure/persistence/DataBase/TypeOrmTask.entity';
import { TypeOrmTaskRepository } from './infrastructure/persistence/DataBase/TypeOrmTask.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmTaskEntity])],
  controllers: [TaskController],
  providers: [
    {
      provide: 'TaskRepository',
      useClass: TypeOrmTaskRepository,
    },
    {
      provide: 'TaskGetAll',
      useFactory: (repository: TypeOrmTaskRepository) =>
        new TaskGetAll(repository),
      inject: ['TaskRepository'],
    },
    {
      provide: 'TaskGetOneById',
      useFactory: (repository: TypeOrmTaskRepository) =>
        new TaskGetOneById(repository),
      inject: ['TaskRepository'],
    },
    {
      provide: 'TaskCreate',
      useFactory: (repository: TypeOrmTaskRepository) =>
        new TaskCreate(repository),
      inject: ['TaskRepository'],
    },
    {
      provide: 'TaskEdit',
      useFactory: (repository: TypeOrmTaskRepository) =>
        new TaskEdit(repository),
      inject: ['TaskRepository'],
    },
    {
      provide: 'TaskDelete',
      useFactory: (repository: TypeOrmTaskRepository) =>
        new TaskDelete(repository),
      inject: ['TaskRepository'],
    },
  ],
})
export class TaskModule {}
