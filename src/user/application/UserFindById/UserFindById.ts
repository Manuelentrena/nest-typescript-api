import { User } from 'src/user/domain/entities/User';
import { UserId } from 'src/user/domain/value-objects';
import { UserRepository } from '../../domain/repositories/UserRepository';

export class UserFindById {
  constructor(private readonly repository: UserRepository) {}

  async run(userId: string): Promise<User | null> {
    return this.repository.findById(new UserId(userId));
  }
}
