import { TaskRepository } from 'src/modules/task/domain/contract/TaskRepository';
import { Task } from 'src/modules/task/domain/entities/Task';
import {
  TaskCreatedAt,
  TaskDate,
  TaskId,
  TaskName,
} from 'src/modules/task/domain/value-objects';
import { UserId } from 'src/modules/user/domain/value-objects';

export class TaskEdit {
  constructor(private repository: TaskRepository) {}

  async run(
    id: string,
    name: string,
    date: Date,
    createdAt: Date,
    userId: string,
  ): Promise<Task | null> {
    const user = new Task(
      new TaskId(id),
      new TaskName(name),
      new TaskDate(date),
      new TaskCreatedAt(createdAt),
      new UserId(userId),
    );

    return this.repository.edit(user);
  }
}
