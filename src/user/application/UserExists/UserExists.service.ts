import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/domain/repositories/user.repository';
import { UserId } from 'src/user/domain/value-objects';

@Injectable()
export class UserExists {
  constructor(private readonly repository: UserRepository) {}

  async userExists(userId: string): Promise<boolean> {
    const user = await this.repository.exists(new UserId(userId));
    return !!user;
  }
}
