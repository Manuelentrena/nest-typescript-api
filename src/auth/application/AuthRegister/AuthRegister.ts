import { AuthRepository } from 'src/auth/domain/repositories/AuthRepository';
import { User } from 'src/user/domain/entities/User';
import {
  UserEmail,
  UserName,
  UserPassword,
} from 'src/user/domain/value-objects';
import { UserId } from 'src/user/domain/value-objects/UserId';

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
