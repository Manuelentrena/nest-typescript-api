import { EmailRepository } from 'src/modules/auth/domain/contract/EmailRepository';

export class ResendEmailRepository implements EmailRepository {
  constructor() {}

  async sendEmail(
    email: string,
    subject: string,
    message: string,
  ): Promise<void> {
    console.log(
      `Email sent to ${email} with subject ${subject} and message ${message}`,
    );
  }
}
