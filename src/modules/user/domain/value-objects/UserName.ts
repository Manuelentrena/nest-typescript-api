export class UserName {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (this.value.length < 3) {
      throw new Error('UserName must be at least 3 characters long');
    }
    if (this.value.length > 255) {
      throw new Error('UserName must be at most 255 characters long');
    }
  }
}
