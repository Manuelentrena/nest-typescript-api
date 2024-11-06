import { UserId } from 'src/auth/domain/value-objects';
import { Task } from '../../domain/entities/Task';
import { TaskRepository } from '../../domain/repositories/TaskRepository';

export class TaskGetAllByUserId {
  constructor(private repository: TaskRepository) {}

  async run(id: string): Promise<Task[]> {
    return this.repository.getAllByIdUser(new UserId(id));
  }
}
