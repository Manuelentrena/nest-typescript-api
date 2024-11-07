import { UserId } from 'src/user/domain/value-objects';
import { Task } from '../../domain/entities/Task';
import { TaskRepository } from '../../domain/repositories/TaskRepository';

export class TaskFindByUser {
  constructor(private repository: TaskRepository) {}

  async run(id: string): Promise<Task[]> {
    return this.repository.getAllByIdUser(new UserId(id));
  }
}
