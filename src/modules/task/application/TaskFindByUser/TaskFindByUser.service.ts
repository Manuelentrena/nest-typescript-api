import { TaskRepository } from 'src/modules/task/domain/contract/TaskRepository';
import { Task } from 'src/modules/task/domain/entities/Task';
import { UserId } from 'src/modules/user/domain/value-objects';

export class TaskFindByUser {
  constructor(private repository: TaskRepository) {}

  async run(id: string): Promise<Task[]> {
    return this.repository.getAllByIdUser(new UserId(id));
  }
}
