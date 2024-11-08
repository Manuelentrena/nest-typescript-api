import { TaskRepository } from 'src/modules/task/domain/contract/TaskRepository';
import { TaskId } from 'src/modules/task/domain/value-objects';
import { Task } from '../../domain/entities/Task';

export class TaskDelete {
  constructor(private repository: TaskRepository) {}

  async run(id: string): Promise<Task | null> {
    return await this.repository.delete(new TaskId(id));
  }
}
