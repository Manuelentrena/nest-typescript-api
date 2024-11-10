import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmUserEntity } from 'src/modules/shared/database/TypeOrmUser.entity';
import { Task } from 'src/modules/task/domain/entities/Task';
import {
  TaskCreatedAt,
  TaskDate,
  TaskId,
  TaskName,
} from 'src/modules/task/domain/value-objects';
import { UserRepository } from 'src/modules/user/domain/contract/user.repository';
import { User } from 'src/modules/user/domain/entities/User';
import { UserWithTasks } from 'src/modules/user/domain/entities/UserWithTasks';
import { UserName, UserPassword } from 'src/modules/user/domain/value-objects';
import { UserEmail } from 'src/modules/user/domain/value-objects/UserEmail';
import { UserId } from 'src/modules/user/domain/value-objects/UserId';
import { Repository } from 'typeorm';

export class TypeOrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(TypeOrmUserEntity)
    private readonly repository: Repository<TypeOrmUserEntity>,
  ) {}

  private async mapToDomain(
    user: TypeOrmUserEntity,
  ): Promise<User | UserWithTasks> {
    const hasTasks = user.tasks && user.tasks.length > 0;

    if (hasTasks) {
      return new UserWithTasks(
        new UserId(user.id),
        new UserName(user.username),
        new UserPassword(user.password),
        new UserEmail(user.email),
        user.tasks.map(
          (task) =>
            new Task(
              new TaskId(task.id),
              new TaskName(task.name),
              new TaskDate(task.date),
              new TaskCreatedAt(task.createdAt),
              new UserId(task.userId),
            ),
        ),
      );
    } else {
      return new User(
        new UserId(user.id),
        new UserName(user.username),
        new UserPassword(user.password),
        new UserEmail(user.email),
      );
    }
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

  async findTasks(id: UserId): Promise<User | UserWithTasks | null> {
    const user = await this.repository.findOne({
      where: { id: id.value },
      relations: ['tasks'],
    });

    return user ? await this.mapToDomain(user) : null;
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
