import { TaskCreatedAt, TaskDate, TaskId, TaskName } from '../value-objects';

export class Task {
  id: TaskId;
  name: TaskName;
  date: TaskDate;
  createdAt: TaskCreatedAt;

  constructor(
    id: TaskId,
    name: TaskName,
    date: TaskDate,
    createdAt: TaskCreatedAt,
  ) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.createdAt = createdAt;
  }

  public toPlainObject() {
    return {
      id: this.id.value,
      name: this.name.value,
      date: this.date.value,
      createdAt: this.createdAt.value,
    };
  }
}
