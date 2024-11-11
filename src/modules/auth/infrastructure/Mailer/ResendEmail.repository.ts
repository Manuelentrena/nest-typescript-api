import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import { envConfig } from 'src/config/env';
import { EmailRepository } from 'src/modules/auth/domain/contract/EmailRepository';

@Injectable()
export class ResendEmailRepository implements EmailRepository {
  private readonly resend: Resend;

  constructor() {
    this.resend = new Resend(envConfig.RESEND_API_KEY);
  }

  async sendEmail(
    email: string,
    subject: string,
    message: string,
  ): Promise<void> {
    try {
      await this.resend.emails.send({
        from: envConfig.RESEND_EMAIL_FROM,
        to: email,
        subject,
        html: message,
      });
    } catch (error) {
      console.error('Failed to send email:', error);
      throw new Error('Error sending email');
    }
  }
}
