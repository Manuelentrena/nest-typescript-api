import { AuthRepository } from 'src/modules/auth/domain/contract/AuthRepository';
import { User } from 'src/modules/user/domain/entities/User';

export class AuthLogin {
  constructor(private readonly repository: AuthRepository) {}

  async run(user: User, password: string): Promise<User | null> {
    return this.repository.login(user, password);
  }
}
