import {
  UserEmail,
  UserName,
  UserPassword,
} from 'src/auth/domain/value-objects';
import { User } from '../../domain/entities/User';
import { AuthRepository } from '../../domain/repositories/AuthRepository';
import { UserId } from '../../domain/value-objects/UserId';

export class AuthRegister {
  constructor(private readonly repository: AuthRepository) {}

  async run(
    id: string,
    username: string,
    password: string,
    email: string,
  ): Promise<User | null> {
    const user = new User(
      new UserId(id),
      new UserName(username),
      await UserPassword.create(password, true),
      new UserEmail(email),
    );
    return this.repository.register(user);
  }
}
