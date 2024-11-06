import { AuthRepository } from 'src/auth/domain/repositories/AuthRepository';
import { UserId } from 'src/user/domain/value-objects';

export class AuthLogout {
  constructor(private readonly repository: AuthRepository) {}

  async run(userId: string): Promise<void> {
    return this.repository.logout(new UserId(userId));
  }
}
