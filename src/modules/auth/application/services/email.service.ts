import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { SendEmail } from 'src/modules/auth/application/use-cases/sendEmail.use-case';
import { UserRegisterEvent } from 'src/modules/auth/domain/events/user-register.event';
import { UserFindById } from 'src/modules/user/application/uses-cases/userFindById.use-case';
import { UserNotFoundError } from 'src/modules/user/domain/errors/UserNotFound.error';

@Injectable()
export class EmailService {
  private readonly emailSubject = 'Welcome to our platform';
  private readonly emailMessage =
    'Welcome to our platform, we are glad to have you here';
  constructor(
    @Inject('SendEmail') private readonly sendEmail: SendEmail,
    @Inject('UserFindById')
    private readonly userFindById: UserFindById,
  ) {}

  @OnEvent('user.register', { async: true })
  async handleUserRegisterEvent(payload: UserRegisterEvent): Promise<void> {
    const userFind = await this.userFindById.run(payload.userId);

    if (!userFind) {
      throw new UserNotFoundError('User not found');
    }

    if (userFind?.email) {
      await this.sendWelcomeEmail(userFind.email.value);
    }
  }

  private async sendWelcomeEmail(email: string): Promise<void> {
    await this.sendEmail.run(email, this.emailSubject, this.emailMessage);
  }
}
