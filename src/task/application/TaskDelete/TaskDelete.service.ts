import { TaskRepository } from '../../domain/repositories/TaskRepository';
import { TaskId } from '../../domain/value-objects';

export class TaskDelete {
  constructor(private repository: TaskRepository) {}

  async run(id: string): Promise<void> {
    await this.repository.delete(new TaskId(id));
  }
}
