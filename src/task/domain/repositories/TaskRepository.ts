import { UserId } from 'src/auth/domain/value-objects';
import { Task } from '../entities/Task';
import { TaskId } from '../value-objects';

export interface TaskRepository {
  create(task: Task): Promise<Task | null>;
  getAllByIdUser(id: UserId): Promise<Task[]>;
  getOneById(id: TaskId): Promise<Task | null>;
  edit(task: Task): Promise<Task | null>;
  delete(id: TaskId): Promise<Task | null>;
}
