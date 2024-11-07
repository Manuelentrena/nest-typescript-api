import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmTaskEntity } from 'src/modules/shared/database/TypeOrmTask.entity';
import { TaskCreate } from 'src/modules/task/application/TaskCreate/TaskCreate.service';
import { TaskDelete } from 'src/modules/task/application/TaskDelete/TaskDelete.service';
import { TaskEdit } from 'src/modules/task/application/TaskEdit/TaskEdit.service';
import { TaskFindById } from 'src/modules/task/application/TaskFindById/TaskFindById.service';
import { TaskFindByUser } from 'src/modules/task/application/TaskFindByUser/TaskFindByUser.service';
import { TypeOrmTaskRepository } from 'src/modules/task/infrastructure/DataBase/TypeOrmTask.repository';
import { TaskController } from 'src/modules/task/infrastructure/http/controllers/task.controller';

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
