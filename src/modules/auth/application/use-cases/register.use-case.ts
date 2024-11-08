import { AuthRegisterDto } from 'src/modules/auth/application/dto/register-auth.dto';
import { AuthRepository } from 'src/modules/auth/domain/contract/AuthRepository';
import { User } from 'src/modules/user/domain/entities/User';
import {
  UserEmail,
  UserName,
  UserPassword,
} from 'src/modules/user/domain/value-objects';
import { UserId } from 'src/modules/user/domain/value-objects/UserId';

export class AuthRegister {
  constructor(private readonly repository: AuthRepository) {}

  async run(register: AuthRegisterDto): Promise<User | null> {
    const user = new User(
      new UserId(register.id),
      new UserName(register.username),
      await UserPassword.create(register.password, true),
      new UserEmail(register.email),
    );
    return this.repository.register(user);
  }
}
