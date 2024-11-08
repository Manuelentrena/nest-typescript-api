import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmTaskEntity } from 'src/modules/shared/database/TypeOrmTask.entity';
import { TaskService } from 'src/modules/task/application/services/task.service';
import { TaskCreate } from 'src/modules/task/application/uses-cases/taskCreate.use-case';
import { TaskDelete } from 'src/modules/task/application/uses-cases/taskDelete.use-case';
import { TaskEdit } from 'src/modules/task/application/uses-cases/taskEdit.use-case';
import { TaskFindById } from 'src/modules/task/application/uses-cases/taskFindById.use-case';
import { TaskFindByUser } from 'src/modules/task/application/uses-cases/taskFindByUser.use-case';
import { TypeOrmTaskRepository } from 'src/modules/task/infrastructure/DataBase/TypeOrmTask.repository';
import { TaskController } from 'src/modules/task/infrastructure/controllers/task.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmTaskEntity])],
  controllers: [TaskController],
  providers: [
    TaskService,
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
