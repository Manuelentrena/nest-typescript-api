import * as bcrypt from 'bcrypt';
const SALT = 10;

export class UserPassword {
  private readonly _value: string;

  constructor(value: string) {
    this._value = value;
  }

  static async create(
    rawPassword: string,
    hashPassword = false,
  ): Promise<UserPassword> {
    if (rawPassword.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }

    if (hashPassword) {
      const hashedPassword = await bcrypt.hash(rawPassword, SALT);
      return new UserPassword(hashedPassword);
    }

    return new UserPassword(rawPassword);
  }

  static fromHashed(hashedPassword: string): UserPassword {
    return new UserPassword(hashedPassword);
  }

  public async comparePassword(rawPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, this._value);
  }

  public get value(): string {
    throw new Error('Direct access to password value is not allowed');
  }

  public get hashedValue(): string {
    return this._value;
  }
}
