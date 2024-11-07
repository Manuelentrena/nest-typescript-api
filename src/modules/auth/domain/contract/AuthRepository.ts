import { User } from 'src/modules/user/domain/entities/User';
import { UserId } from 'src/modules/user/domain/value-objects/UserId';

export interface AuthRepository {
  register(user: User): Promise<User | null>;
  login(user: User, password: string): Promise<User | null>;
  resetPassword(userId: UserId, newPassword: string): Promise<User | null>;
  logout(userId: UserId): Promise<void>;
}
