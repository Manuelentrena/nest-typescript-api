import { AuthRepository } from 'src/auth/domain/repositories/AuthRepository';
import { User } from 'src/user/domain/entities/User';
import { UserEmail } from 'src/user/domain/value-objects';

export class AuthLogin {
  constructor(private readonly repository: AuthRepository) {}

  async run(useremail: string, password: string): Promise<User | null> {
    return this.repository.login(new UserEmail(useremail), password);
  }
}
