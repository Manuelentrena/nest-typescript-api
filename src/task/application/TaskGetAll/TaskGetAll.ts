import { Task } from '../../domain/entities/Task';
import { TaskRepository } from '../../domain/repositories/TaskRepository';

export class TaskGetAll {
  constructor(private repository: TaskRepository) {}

  async run(): Promise<Task[]> {
    return this.repository.getAll();
  }
}
