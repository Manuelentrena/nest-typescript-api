import { Task } from 'src/modules/task/domain/entities/Task';

export class UserTasks {
  value: Task[];

  constructor(value: Task[]) {
    this.value = value;
  }

  get length() {
    return this.value.length;
  }
}
