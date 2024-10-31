import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Task } from './task.domain';

@Injectable()
export class TaskService {
  private tasks: Task[] = [];

  getTasks(): Task[] {
    return this.tasks;
  }

  getTask(id: string): Task {
    const findTask = this.tasks.find((task) => task.id === id);
    if (!findTask) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return findTask;
  }

  createTask(name: string): Task {
    const newTask: Task = { id: randomUUID(), name };
    this.tasks.push(newTask);
    return newTask;
  }

  updateTask(newTask: Task): string {
    const taskIndex = this.tasks.findIndex((task) => task.id === newTask.id);
    if (taskIndex === -1) {
      throw new NotFoundException(`Task with id ${newTask.id} not found`);
    }
    this.tasks[taskIndex].name = newTask.name;
    return `Task with id ${newTask.id} was successfully updated`;
  }

  deleteTask(id: string): string {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    this.tasks.splice(taskIndex, 1);
    return `Task with id ${id} was successfully deleted`;
  }
}
