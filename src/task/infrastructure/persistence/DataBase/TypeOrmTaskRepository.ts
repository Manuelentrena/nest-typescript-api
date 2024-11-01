// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Task } from '../../../domain/entities/Task';
// import { TaskRepository } from '../../../domain/repositories/TaskRepository';
// import {
//   TaskCreatedAt,
//   TaskDate,
//   TaskId,
//   TaskName,
// } from '../../../domain/value-objects';
// import { TypeOrmTaskEntity } from './TypeOrmTaskEntity';

// export class TypeOrmTaskRepository implements TaskRepository {
//   constructor(
//     @InjectRepository(TypeOrmTaskEntity)
//     private readonly repository: Repository<TypeOrmTaskEntity>,
//   ) {}

//   private mapToDomain(t: TypeOrmTaskEntity) {
//     return new Task(
//       new TaskId(t.id),
//       new TaskName(t.name),
//       new TaskDate(t.date),
//       new TaskCreatedAt(t.createdAt),
//     );
//   }

//   async getAll(): Promise<Task[]> {
//     const tasks = await this.repository.find();

//     return tasks.map((u) => this.mapToDomain(u));
//   }

//   async getOneById(id: TaskId): Promise<Task | null> {
//     const task = await this.repository.findOne({
//       where: {
//         id: id.value,
//       },
//     });

//     if (!task) return null;

//     return this.mapToDomain(task);
//   }

//   async create(task: Task): Promise<void> {
//     await this.repository.save({
//       id: task.id.value,
//       name: task.name.value,
//       date: task.date.value,
//       createdAt: task.createdAt.value,
//     });
//   }

//   async edit(task: Task): Promise<void> {
//     await this.repository.update(task.id.value, {
//       name: task.name.value,
//       date: task.date.value,
//       createdAt: task.createdAt.value,
//     });
//   }

//   async delete(id: TaskId): Promise<void> {
//     await this.repository.delete(id.value);
//   }
// }
