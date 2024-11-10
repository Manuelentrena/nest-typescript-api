import { UserRepository } from 'src/modules/user/domain/contract/user.repository';
import { User } from 'src/modules/user/domain/entities/User';
import { UserId } from 'src/modules/user/domain/value-objects/UserId';

export class UserFindById {
  constructor(private readonly repository: UserRepository) {}

  async run(userId: string): Promise<User | null> {
    return this.repository.findById(new UserId(userId));
  }
}
