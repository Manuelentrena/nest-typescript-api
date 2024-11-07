import { User } from 'src/user/domain/entities/User';
import { UserEmail } from 'src/user/domain/value-objects/UserEmail';
import { UserId } from 'src/user/domain/value-objects/UserId';

export interface UserRepository {
  findAll(): Promise<User[]>;
  findById(id: UserId): Promise<User | null>;
  findByEmail(email: UserEmail): Promise<User | null>;
  changeName(user: User): Promise<User>;
  delete(id: UserId): Promise<void>;
}