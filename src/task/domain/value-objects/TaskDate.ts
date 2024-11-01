export class TaskDate {
  value: Date;

  constructor(value: Date) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    const date = new Date(this.value);
    if (isNaN(date.getTime())) {
      throw new Error('TaskDate must be a valid date');
    }
  }
}
