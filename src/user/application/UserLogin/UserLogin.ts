import { User } from 'src/user/domain/entities/User';
import { UserEmail } from 'src/user/domain/value-objects';
import { UserRepository } from '../../domain/repositories/UserRepository';

export class UserLogin {
  constructor(private readonly repository: UserRepository) {}

  async run(useremail: string, password: string): Promise<User | null> {
    return this.repository.login(new UserEmail(useremail), password);
  }
}
