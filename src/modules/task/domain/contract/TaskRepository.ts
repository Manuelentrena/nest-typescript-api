import { Task } from 'src/modules/task/domain/entities/Task';
import { TaskId } from 'src/modules/task/domain/value-objects';
import { UserId } from 'src/modules/user/domain/value-objects';

export interface TaskRepository {
  create(task: Task): Promise<Task | null>;
  getAllByIdUser(id: UserId): Promise<Task[]>;
  getOneById(id: TaskId): Promise<Task | null>;
  edit(task: Task): Promise<Task | null>;
  delete(id: TaskId): Promise<Task | null>;
}
