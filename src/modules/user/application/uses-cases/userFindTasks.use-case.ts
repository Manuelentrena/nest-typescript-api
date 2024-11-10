import { UserRepository } from 'src/modules/user/domain/contract/user.repository';
import { User } from 'src/modules/user/domain/entities/User';
import { UserId } from 'src/modules/user/domain/value-objects';
import { UserWithTasks } from '../../domain/entities/UserWithTasks';

export class UserFindTasks {
  constructor(private readonly repository: UserRepository) {}

  async run(id: string): Promise<User | UserWithTasks | null> {
    const user = await this.repository.findTasks(new UserId(id));
    return user || null;
  }
}
