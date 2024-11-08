import { UserEmail, UserId, UserName, UserPassword } from '../value-objects';
import { UserPlainObject } from './User.plain-object';

export class User {
  id: UserId;
  username: UserName;
  password: UserPassword;
  email: UserEmail;

  constructor(
    id: UserId,
    username: UserName,
    password: UserPassword,
    email: UserEmail,
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
  }

  public toPlainObject(): UserPlainObject {
    return {
      id: this.id.value,
      username: this.username.value,
      email: this.email.value,
    };
  }
}
