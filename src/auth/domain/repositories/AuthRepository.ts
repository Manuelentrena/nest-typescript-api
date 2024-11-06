import { User } from '../entities/User';
import { UserEmail } from '../value-objects';
import { UserId } from '../value-objects/UserId';

export interface UserRepository {
  register(user: User): Promise<User | null>;
  login(email: UserEmail, password: string): Promise<User | null>;
  resetPassword(userId: UserId, newPassword: string): Promise<User | null>;
  logout(userId: UserId): Promise<void>;
}
