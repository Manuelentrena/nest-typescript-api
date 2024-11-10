import { EmailRepository } from '../../domain/contract/EmailRepository';

export class SendEmail {
  constructor(private readonly repository: EmailRepository) {}

  async run(email: string, subject: string, message: string): Promise<void> {
    this.repository.sendEmail(email, subject, message);
  }
}
