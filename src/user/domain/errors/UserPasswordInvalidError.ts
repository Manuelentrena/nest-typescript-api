export class UserPasswordInvalidError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UserPasswordInvalidError';
  }
}
