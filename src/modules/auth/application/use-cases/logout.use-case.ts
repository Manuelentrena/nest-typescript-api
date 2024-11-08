import { AuthRepository } from 'src/modules/auth/domain/contract/AuthRepository';
import { UserId } from 'src/modules/user/domain/value-objects/UserId';

export class AuthLogout {
  constructor(private readonly repository: AuthRepository) {}

  async run(userId: string): Promise<void> {
    return this.repository.logout(new UserId(userId));
  }
}
