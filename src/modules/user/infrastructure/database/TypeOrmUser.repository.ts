import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmUserEntity } from 'src/modules/shared/database/TypeOrmUser.entity';
import { UserRepository } from 'src/modules/user/domain/contract/user.repository';
import { User } from 'src/modules/user/domain/entities/User';
import { UserName, UserPassword } from 'src/modules/user/domain/value-objects';
import { UserEmail } from 'src/modules/user/domain/value-objects/UserEmail';
import { UserId } from 'src/modules/user/domain/value-objects/UserId';
import { Repository } from 'typeorm';

export class TypeOrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(TypeOrmUserEntity)
    private readonly repository: Repository<TypeOrmUserEntity>,
  ) {}

  private async mapToDomain(user: TypeOrmUserEntity): Promise<User> {
    return new User(
      new UserId(user.id),
      new UserName(user.username),
      new UserPassword(user.password),
      new UserEmail(user.email),
    );
  }

  async findAll(): Promise<User[]> {
    const users = await this.repository.find();
    return Promise.all(users.map((user) => this.mapToDomain(user)));
  }

  async findById(id: UserId): Promise<User | null> {
    const user = await this.repository.findOne({ where: { id: id.value } });
    return user ? this.mapToDomain(user) : null;
  }

  async findByEmail(email: UserEmail): Promise<User | null> {
    const user = await this.repository.findOne({
      where: { email: email.value },
    });
    return user ? this.mapToDomain(user) : null;
  }

  async changeName(user: User): Promise<User> {
    await this.repository.update(user.id.value, {
      username: user.username.value,
    });

    const updatedUser = await this.repository.findOne({
      where: { id: user.id.value },
    });

    return updatedUser ? this.mapToDomain(updatedUser) : null;
  }

  async delete(id: UserId): Promise<void> {
    await this.repository.delete(id.value);
  }
}
