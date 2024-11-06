import { UserId } from 'src/auth/domain/value-objects';
import { UserRepository } from '../../domain/repositories/AuthRepository';

export class UserLogout {
  constructor(private readonly repository: UserRepository) {}

  async run(userId: string): Promise<void> {
    return this.repository.logout(new UserId(userId));
  }
}
