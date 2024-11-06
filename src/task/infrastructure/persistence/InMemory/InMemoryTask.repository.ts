// import { Injectable } from '@nestjs/common';
// // import { randomUUID } from 'crypto';
// import { TaskNotFoundError } from 'src/task/domain/errors/TaskNotFoundError';
// import { Task } from '../../../domain/entities/Task';
// import { TaskRepository } from '../../../domain/repositories/TaskRepository';
// import { TaskId } from '../../../domain/value-objects';
// import { UserId } from 'src/user/domain/value-objects';

// @Injectable()
// export class InMemoryTaskRepository implements TaskRepository {
//   private tasks: Task[] = [];

//   async create(task: Task): Promise<Task | null> {
//     this.tasks.push(task);
//     return task;
//   }

//   async getAllByIdUser(id: UserId): Promise<Task[]> {
//     return await this.repository.find({ where: { userId: id.value } });
//   }

//   async getOneById(id: TaskId): Promise<Task | null> {
//     const findTask = this.tasks.find((task) => task.id.value === id.value);
//     if (!findTask) {
//       return null;
//     }
//     return findTask;
//   }

//   async edit(task: Task): Promise<Task | null> {
//     const taskIndex = this.tasks.findIndex((t) => t.id.value === task.id.value);
//     if (taskIndex === -1) {
//       throw new TaskNotFoundError(`Task with id ${task.id} not found`);
//     }
//     this.tasks[taskIndex].name = task.name;
//     console.log(this.tasks[taskIndex]);
//     return this.tasks[taskIndex];
//   }

//   async delete(id: TaskId): Promise<Task | null> {
//     const taskIndex = this.tasks.findIndex(
//       (task) => task.id.value === id.value,
//     );
//     if (taskIndex === -1) {
//       throw new TaskNotFoundError(`Task with id ${id.value} not found`);
//     }
//     this.tasks.splice(taskIndex, 1);
//     return null;
//   }
// }
