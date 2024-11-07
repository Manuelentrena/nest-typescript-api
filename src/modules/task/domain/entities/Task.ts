import { UserId } from 'src/modules/user/domain/value-objects';
import { TaskCreatedAt, TaskDate, TaskId, TaskName } from '../value-objects';

export class Task {
  id: TaskId;
  name: TaskName;
  date: TaskDate;
  createdAt: TaskCreatedAt;
  userId: UserId;

  constructor(
    id: TaskId,
    name: TaskName,
    date: TaskDate,
    createdAt: TaskCreatedAt,
    userId: UserId,
  ) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.createdAt = createdAt;
    this.userId = userId;
  }

  public toPlainObject() {
    return {
      id: this.id.value,
      name: this.name.value,
      date: this.date.value,
      createdAt: this.createdAt.value,
      userId: this.userId.value,
    };
  }
}
