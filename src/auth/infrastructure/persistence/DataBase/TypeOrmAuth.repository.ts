import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from 'src/auth/domain/repositories/AuthRepository';
import { TypeOrmUserEntity } from 'src/shared/database/TypeOrmUser.entity';
import { User } from 'src/user/domain/entities/User';
import { UserPasswordInvalidError } from 'src/user/domain/errors/UserPasswordInvalidError';
import {
  UserEmail,
  UserName,
  UserPassword,
} from 'src/user/domain/value-objects';
import { UserId } from 'src/user/domain/value-objects/UserId';
import { Repository } from 'typeorm';

export class TypeOrmAuthRepository implements AuthRepository {
  constructor(
    @InjectRepository(TypeOrmUserEntity)
    private readonly repository: Repository<TypeOrmUserEntity>,
  ) {}

  async register(user: User): Promise<User | null> {
    const newUser = await this.repository.save({
      id: user.id.value,
      username: user.username.value,
      password: user.password.hashedValue,
      email: user.email.value,
    });
    return new User(
      new UserId(newUser.id),
      new UserName(newUser.username),
      await UserPassword.create(newUser.password, true),
      new UserEmail(newUser.email),
    );
  }

  async login(user: User, password: string): Promise<User | null> {
    const isPasswordCorrect = await user.password.comparePassword(password);

    if (!isPasswordCorrect) {
      throw new UserPasswordInvalidError(`User password invalid`);
    }

    return user;
  }

  async findById(id: UserId): Promise<User | null> {
    const user = await this.repository.findOne({ where: { id: id.value } });
    if (!user) return null;
    return new User(
      new UserId(user.id),
      new UserName(user.username),
      await UserPassword.create(user.password, true),
      new UserEmail(user.email),
    );
  }

  async resetPassword(
    userId: UserId,
    newPassword: string,
  ): Promise<User | null> {
    await this.repository.update(userId.value, {
      password: (await UserPassword.create(newPassword, true)).hashedValue,
    });
    const user = await this.repository.findOne({ where: { id: userId.value } });
    if (!user) return null;
    return new User(
      new UserId(user.id),
      new UserName(user.username),
      await UserPassword.create(user.password, true),
      new UserEmail(user.email),
    );
  }

  async logout(userId: UserId): Promise<void> {
    // Implementación específica si se requiere
  }
}
