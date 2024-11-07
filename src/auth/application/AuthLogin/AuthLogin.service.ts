import { AuthRepository } from 'src/auth/domain/contract/AuthRepository';
import { UserFindByEmail } from 'src/user/application/UserFindByEmail/UserFindByEmail.service';
import { User } from 'src/user/domain/entities/User';
import { UserNotFoundError } from 'src/user/domain/errors/UserNotFoundError';

export class AuthLogin {
  constructor(
    private readonly repository: AuthRepository,
    private readonly userFindByEmail: UserFindByEmail,
  ) {}

  async run(email: string, password: string): Promise<User | null> {
    const user = await this.userFindByEmail.run(email);
    if (!user) {
      throw new UserNotFoundError('User not found');
    }
    return this.repository.login(user, password);
  }
}
