import { TaskRepository } from 'src/modules/task/domain/contract/TaskRepository';
import { Task } from 'src/modules/task/domain/entities/Task';
import { UserId } from 'src/modules/user/domain/value-objects';
import {
  TaskCreatedAt,
  TaskDate,
  TaskId,
  TaskName,
} from '../../domain/value-objects';
import { CreateTaskDto } from '../dto/create-task.dto';

export class TaskCreate {
  constructor(private repository: TaskRepository) {}

  async run(newTask: CreateTaskDto): Promise<Task | null> {
    const task = new Task(
      new TaskId(newTask.id),
      new TaskName(newTask.name),
      new TaskDate(newTask.date),
      new TaskCreatedAt(new Date()),
      new UserId(newTask.userId),
    );

    return this.repository.create(task);
  }
}
