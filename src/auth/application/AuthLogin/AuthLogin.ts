import { User } from 'src/auth/domain/entities/User';
import { UserEmail } from 'src/auth/domain/value-objects';
import { UserRepository } from '../../domain/repositories/AuthRepository';

export class UserLogin {
  constructor(private readonly repository: UserRepository) {}

  async run(useremail: string, password: string): Promise<User | null> {
    return this.repository.login(new UserEmail(useremail), password);
  }
}
