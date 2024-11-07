import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmTaskEntity } from 'src/modules/shared/database/TypeOrmTask.entity';
import { TaskRepository } from 'src/modules/task/domain/contract/TaskRepository';
import { Task } from 'src/modules/task/domain/entities/Task';
import {
  TaskCreatedAt,
  TaskDate,
  TaskId,
  TaskName,
} from 'src/modules/task/domain/value-objects';
import { UserId } from 'src/modules/user/domain/value-objects';
import { Repository } from 'typeorm';

export class TypeOrmTaskRepository implements TaskRepository {
  constructor(
    @InjectRepository(TypeOrmTaskEntity)
    private readonly repository: Repository<TypeOrmTaskEntity>,
  ) {}

  private mapToDomain(t: TypeOrmTaskEntity) {
    return new Task(
      new TaskId(t.id),
      new TaskName(t.name),
      new TaskDate(t.date),
      new TaskCreatedAt(t.createdAt),
      new UserId(t.userId),
    );
  }

  async getAllByIdUser(id: UserId): Promise<Task[]> {
    const tasks = await this.repository.find({ where: { userId: id.value } });
    return tasks.map((t) => this.mapToDomain(t));
  }

  async getOneById(id: TaskId): Promise<Task | null> {
    const task = await this.repository.findOne({
      where: {
        id: id.value,
      },
    });

    if (!task) return null;

    return this.mapToDomain(task);
  }

  async create(task: Task): Promise<Task | null> {
    const newTask = await this.repository.save({
      id: task.id.value,
      name: task.name.value,
      date: task.date.value,
      createdAt: task.createdAt.value,
      userId: task.userId.value,
    });

    return this.mapToDomain(newTask);
  }

  async edit(task: Task): Promise<Task | null> {
    await this.repository.update(task.id.value, {
      name: task.name.value,
      date: task.date.value,
      createdAt: task.createdAt.value,
      userId: task.userId.value,
    });

    return task;
  }

  async delete(id: TaskId): Promise<Task | null> {
    await this.repository.delete(id.value);
    return null;
  }
}
