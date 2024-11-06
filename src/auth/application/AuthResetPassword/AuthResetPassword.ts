import { AuthRepository } from 'src/auth/domain/repositories/AuthRepository';
import { User } from 'src/user/domain/entities/User';
import { UserId } from 'src/user/domain/value-objects/UserId';

export class AuthResetPassword {
  constructor(private readonly repository: AuthRepository) {}

  async run(id: string, newPassword: string): Promise<User | null> {
    return this.repository.resetPassword(new UserId(id), newPassword);
  }
}
