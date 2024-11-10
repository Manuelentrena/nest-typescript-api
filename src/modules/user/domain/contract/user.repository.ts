import { User } from 'src/modules/user/domain/entities/User';
import { UserEmail } from 'src/modules/user/domain/value-objects/UserEmail';
import { UserId } from 'src/modules/user/domain/value-objects/UserId';
import { UserWithTasks } from '../entities/UserWithTasks';

export interface UserRepository {
  findAll(): Promise<User[]>;
  findById(id: UserId): Promise<User | null>;
  findByEmail(email: UserEmail): Promise<User | null>;
  findTasks(id: UserId): Promise<User | UserWithTasks | null>;
  changeName(user: User): Promise<User>;
  delete(id: UserId): Promise<void>;
}
