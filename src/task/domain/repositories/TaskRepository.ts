import { Task } from '../entities/Task';
import { TaskId } from '../value-objects';

export interface TaskRepository {
  create(task: Task): Promise<void>;
  getAll(): Promise<Task[]>;
  getOneById(id: TaskId): Promise<Task | null>;
  edit(task: Task): Promise<Task | null>;
  delete(id: TaskId): Promise<Task | null>;
}
