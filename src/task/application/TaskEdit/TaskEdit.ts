import { UserId } from 'src/auth/domain/value-objects';
import { Task } from '../../domain/entities/Task';
import { TaskRepository } from '../../domain/repositories/TaskRepository';
import {
  TaskCreatedAt,
  TaskDate,
  TaskId,
  TaskName,
} from '../../domain/value-objects';

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
