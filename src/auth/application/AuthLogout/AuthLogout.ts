import { UserId } from 'src/auth/domain/value-objects';
import { AuthRepository } from '../../domain/repositories/AuthRepository';

export class AuthLogout {
  constructor(private readonly repository: AuthRepository) {}

  async run(userId: string): Promise<void> {
    return this.repository.logout(new UserId(userId));
  }
}
