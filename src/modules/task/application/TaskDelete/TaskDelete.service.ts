import { TaskRepository } from 'src/modules/task/domain/contract/TaskRepository';
import { TaskId } from 'src/modules/task/domain/value-objects';

export class TaskDelete {
  constructor(private repository: TaskRepository) {}

  async run(id: string): Promise<void> {
    await this.repository.delete(new TaskId(id));
  }
}
