import { Task } from 'src/modules/task/domain/entities/Task';
import { TaskPlainObjectWithoutUserId } from 'src/modules/task/domain/entities/Task.plain-object';
import { User } from 'src/modules/user/domain/entities/User';
import { UserPlainObject } from 'src/modules/user/domain/entities/User.plain-object';
import {
  UserEmail,
  UserId,
  UserName,
  UserPassword,
} from 'src/modules/user/domain/value-objects';

export class UserWithTasks extends User {
  tasks: Task[];

  constructor(
    id: UserId,
    username: UserName,
    password: UserPassword,
    email: UserEmail,
    tasks: Task[],
  ) {
    super(id, username, password, email);
    this.tasks = tasks;
  }

  public override toPlainObject(): UserPlainObject & {
    tasks: TaskPlainObjectWithoutUserId[];
  } {
    return {
      ...super.toPlainObject(),
      tasks: this.tasks.map((task) => {
        const { userId, ...taskWithoutUserId } = task.toPlainObject();
        return taskWithoutUserId;
      }),
    };
  }
}
