import { Inject, Injectable } from '@nestjs/common';
import { TaskPlainObject } from '../../domain/entities/Task.plain-object';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { FindOneTaskParams } from '../param/uuid-task.param';
import { TaskCreate } from '../uses-cases/taskCreate.use-case';
import { TaskDelete } from '../uses-cases/taskDelete.use-case';
import { TaskEdit } from '../uses-cases/taskEdit.use-case';
import { TaskFindById } from '../uses-cases/taskFindById.use-case';

@Injectable()
export class TaskService {
  constructor(
    @Inject('TaskFindById') private readonly taskFindById: TaskFindById,
    @Inject('TaskCreate') private readonly taskCreate: TaskCreate,
    @Inject('TaskEdit') private readonly taskEdit: TaskEdit,
    @Inject('TaskDelete') private readonly taskDelete: TaskDelete,
  ) {}

  async get({ id }: FindOneTaskParams): Promise<TaskPlainObject> {
    return (await this.taskFindById.run(id)).toPlainObject();
  }

  async create(newTask: CreateTaskDto): Promise<TaskPlainObject> {
    return (await this.taskCreate.run(newTask)).toPlainObject();
  }

  async update(
    updatedTask: UpdateTaskDto & FindOneTaskParams,
  ): Promise<TaskPlainObject> {
    return (await this.taskEdit.run(updatedTask)).toPlainObject();
  }

  async delete({ id }: FindOneTaskParams): Promise<TaskPlainObject> {
    return (await this.taskDelete.run(id)).toPlainObject();
  }
}
