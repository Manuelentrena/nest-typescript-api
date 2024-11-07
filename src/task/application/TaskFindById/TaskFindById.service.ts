import { Task } from '../../domain/entities/Task';
import { TaskNotFoundError } from '../../domain/errors/TaskNotFoundError';
import { TaskRepository } from '../../domain/repositories/TaskRepository';
import { TaskId } from '../../domain/value-objects';

export class TaskFindById {
  constructor(private repository: TaskRepository) {}

  async run(id: string): Promise<Task> {
    const user = await this.repository.getOneById(new TaskId(id));

    if (!user) throw new TaskNotFoundError('User not found'); // retorna 404

    return user;
  }
}
