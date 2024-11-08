import { TaskRepository } from 'src/modules/task/domain/contract/TaskRepository';
import { Task } from 'src/modules/task/domain/entities/Task';
import {
  TaskCreatedAt,
  TaskDate,
  TaskId,
  TaskName,
} from 'src/modules/task/domain/value-objects';
import { UserId } from 'src/modules/user/domain/value-objects';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { FindOneTaskParams } from '../param/uuid-task.param';

export class TaskEdit {
  constructor(private repository: TaskRepository) {}

  async run(
    updatedTask: UpdateTaskDto & FindOneTaskParams,
  ): Promise<Task | null> {
    const user = new Task(
      new TaskId(updatedTask.id),
      new TaskName(updatedTask.name),
      new TaskDate(updatedTask.date),
      new TaskCreatedAt(updatedTask.createdAt),
      new UserId(updatedTask.userId),
    );

    return this.repository.edit(user);
  }
}
