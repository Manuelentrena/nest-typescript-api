import {
  UserEmail,
  UserName,
  UserPassword,
} from 'src/user/domain/value-objects';
import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { UserId } from '../../domain/value-objects/UserId';

export class UserRegister {
  constructor(private readonly repository: UserRepository) {}

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
