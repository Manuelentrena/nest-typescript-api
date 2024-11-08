import { UserRepository } from 'src/modules/user/domain/contract/user.repository';
import { User } from 'src/modules/user/domain/entities/User';
import { UserEmail } from 'src/modules/user/domain/value-objects';

export class UserFindByEmail {
  constructor(private readonly repository: UserRepository) {}

  async run(email: string): Promise<User | null> {
    const user = await this.repository.findByEmail(new UserEmail(email));
    return user || null;
  }
}
