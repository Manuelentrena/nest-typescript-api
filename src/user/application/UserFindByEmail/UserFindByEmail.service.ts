import { User } from 'src/user/domain/entities/User';
import { UserRepository } from 'src/user/domain/repositories/user.repository';
import { UserEmail } from 'src/user/domain/value-objects';

export class UserFindByEmail {
  constructor(private readonly repository: UserRepository) {}

  async run(userEmail: string): Promise<User | null> {
    const user = await this.repository.findByEmail(new UserEmail(userEmail));
    return user || null;
  }
}
