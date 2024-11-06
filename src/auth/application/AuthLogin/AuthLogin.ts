import { User } from 'src/auth/domain/entities/User';
import { UserEmail } from 'src/auth/domain/value-objects';
import { AuthRepository } from '../../domain/repositories/AuthRepository';

export class AuthLogin {
  constructor(private readonly repository: AuthRepository) {}

  async run(useremail: string, password: string): Promise<User | null> {
    return this.repository.login(new UserEmail(useremail), password);
  }
}
