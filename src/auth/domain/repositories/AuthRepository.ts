import { User } from '../../../user/domain/entities/User';
import { UserEmail } from '../../../user/domain/value-objects';
import { UserId } from '../../../user/domain/value-objects/UserId';

export interface AuthRepository {
  register(user: User): Promise<User | null>;
  login(email: UserEmail, password: string): Promise<User | null>;
  resetPassword(userId: UserId, newPassword: string): Promise<User | null>;
  logout(userId: UserId): Promise<void>;
}
