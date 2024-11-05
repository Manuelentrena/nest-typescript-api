export class UserEmail {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(this.value)) {
      throw new Error('Invalid email format');
    }

    if (this.value.length > 320) {
      throw new Error('UserEmail must be at most 320 characters long');
    }
  }
}
