import { TaskRepository } from 'src/modules/task/domain/contract/TaskRepository';
import { Task } from 'src/modules/task/domain/entities/Task';
import { TaskNotFoundError } from 'src/modules/task/domain/errors/TaskNotFound.error';
import { TaskId } from 'src/modules/task/domain/value-objects';

export class TaskFindById {
  constructor(private repository: TaskRepository) {}

  async run(id: string): Promise<Task> {
    const user = await this.repository.getOneById(new TaskId(id));

    if (!user) throw new TaskNotFoundError('Task not found');

    return user;
  }
}
