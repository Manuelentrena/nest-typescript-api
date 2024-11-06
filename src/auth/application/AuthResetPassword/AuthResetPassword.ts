import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/repositories/AuthRepository';
import { UserId } from '../../domain/value-objects/UserId';

export class UserResetPassword {
  constructor(private readonly repository: UserRepository) {}

  async run(id: string, newPassword: string): Promise<User | null> {
    return this.repository.resetPassword(new UserId(id), newPassword);
  }
}
