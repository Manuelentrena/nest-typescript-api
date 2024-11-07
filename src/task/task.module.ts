import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmTaskEntity } from '../shared/database/TypeOrmTask.entity';
import { TaskCreate } from './application/TaskCreate/TaskCreate.service';
import { TaskDelete } from './application/TaskDelete/TaskDelete.service';
import { TaskEdit } from './application/TaskEdit/TaskEdit.service';
import { TaskFindById } from './application/TaskFindById/TaskFindById.service';
import { TaskFindByUser } from './application/TaskFindByUser/TaskFindByUser.service';
import { TypeOrmTaskRepository } from './infrastructure/DataBase/TypeOrmTask.repository';
import { TaskController } from './infrastructure/http/controllers/task.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmTaskEntity])],
  controllers: [TaskController],
  providers: [
    {
      provide: 'TaskRepository',
      useClass: TypeOrmTaskRepository,
    },
    {
      provide: 'TaskFindByUser',
      useFactory: (repository: TypeOrmTaskRepository) =>
        new TaskFindByUser(repository),
      inject: ['TaskRepository'],
    },
    {
      provide: 'TaskFindById',
      useFactory: (repository: TypeOrmTaskRepository) =>
        new TaskFindById(repository),
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
