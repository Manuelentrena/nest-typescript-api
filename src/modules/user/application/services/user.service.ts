import { Inject, Injectable } from '@nestjs/common';
import { FindOneUserParams } from 'src/modules/user/application/param/uuid-user.param';
import { UserFindTasks } from 'src/modules/user/application/uses-cases/userFindTasks.use-case';
import { UserPlainObject } from 'src/modules/user/domain/entities/User.plain-object';
import { UserNotFoundError } from 'src/modules/user/domain/errors/UserNotFound.error';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserFindTasks') private readonly userFindTasks: UserFindTasks,
  ) {}

  async findUserWithTasks({ id }: FindOneUserParams): Promise<UserPlainObject> {
    const userWithTasks = await this.userFindTasks.run(id);

    if (!userWithTasks) {
      throw new UserNotFoundError('User not found or no tasks assigned');
    }

    return userWithTasks.toPlainObject();
  }
}
