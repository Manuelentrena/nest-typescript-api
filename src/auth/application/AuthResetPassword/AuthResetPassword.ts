import { User } from '../../domain/entities/User';
import { AuthRepository } from '../../domain/repositories/AuthRepository';
import { UserId } from '../../domain/value-objects/UserId';

export class AuthResetPassword {
  constructor(private readonly repository: AuthRepository) {}

  async run(id: string, newPassword: string): Promise<User | null> {
    return this.repository.resetPassword(new UserId(id), newPassword);
  }
}
