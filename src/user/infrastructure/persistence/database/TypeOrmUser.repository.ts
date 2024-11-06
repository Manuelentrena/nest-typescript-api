import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmUserEntity } from 'src/shared/database/TypeOrmUser.entity';
import { User } from 'src/user/domain/entities/User';
import { UserRepository } from 'src/user/domain/repositories/user.repository';
import { UserName, UserPassword } from 'src/user/domain/value-objects';
import { UserEmail } from 'src/user/domain/value-objects/UserEmail';
import { UserId } from 'src/user/domain/value-objects/UserId';
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
      await UserPassword.create(user.password, true),
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

  async exists(id: UserId): Promise<boolean> {
    const count = await this.repository.count({ where: { id: id.value } });
    return count > 0;
  }

  async changeName(user: User): Promise<User> {
    await this.repository.update(user.id.value, {
      username: user.username.value,
    });

    return user;
  }

  async delete(id: UserId): Promise<void> {
    await this.repository.delete(id.value);
  }
}
