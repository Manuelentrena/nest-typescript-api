import { UserId } from 'src/user/domain/value-objects';
import { TaskRepository } from '../../domain/contract/TaskRepository';
import { Task } from '../../domain/entities/Task';

export class TaskFindByUser {
  constructor(private repository: TaskRepository) {}

  async run(id: string): Promise<Task[]> {
    return this.repository.getAllByIdUser(new UserId(id));
  }
}
