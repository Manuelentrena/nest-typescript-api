import { EmailRepository } from 'src/modules/auth/domain/contract/EmailRepository';

export class MockEmailRepository implements EmailRepository {
  async sendEmail(
    email: string,
    subject: string,
    message: string,
  ): Promise<void> {
    console.log(
      `Simulated email to ${email} with subject "${subject}" and message: ${message}`,
    );
  }
}
