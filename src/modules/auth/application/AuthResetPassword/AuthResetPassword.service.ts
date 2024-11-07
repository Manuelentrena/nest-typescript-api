import { AuthRepository } from 'src/modules/auth/domain/contract/AuthRepository';
import { User } from 'src/modules/user/domain/entities/User';
import { UserId } from 'src/modules/user/domain/value-objects/UserId';

export class AuthResetPassword {
  constructor(private readonly repository: AuthRepository) {}

  async run(id: string, newPassword: string): Promise<User | null> {
    return this.repository.resetPassword(new UserId(id), newPassword);
  }
}
