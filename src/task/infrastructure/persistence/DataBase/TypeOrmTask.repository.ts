import { InjectRepository } from '@nestjs/typeorm';
import { UserId } from 'src/auth/domain/value-objects';
import { Repository } from 'typeorm';
import { Task } from '../../../domain/entities/Task';
import { TaskRepository } from '../../../domain/repositories/TaskRepository';
import {
  TaskCreatedAt,
  TaskDate,
  TaskId,
  TaskName,
} from '../../../domain/value-objects';
import { TypeOrmTaskEntity } from './TypeOrmTask.entity';

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
