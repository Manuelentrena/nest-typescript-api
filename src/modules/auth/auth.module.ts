import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envConfig } from 'src/config/env';
import { AuthService } from 'src/modules/auth/application/services/auth.service';
import { EmailService } from 'src/modules/auth/application/services/email.service';
import { AuthLogin } from 'src/modules/auth/application/use-cases/login.use-case';
import { AuthLogout } from 'src/modules/auth/application/use-cases/logout.use-case';
import { AuthRegister } from 'src/modules/auth/application/use-cases/register.use-case';
import { AuthResetPassword } from 'src/modules/auth/application/use-cases/reset-password.use-case';
import { SendEmail } from 'src/modules/auth/application/use-cases/sendEmail.use-case';
import { TypeOrmAuthRepository } from 'src/modules/auth/infrastructure/DataBase/TypeOrmAuth.repository';
import { ResendEmailRepository } from 'src/modules/auth/infrastructure/Mailer/ResendEmail.repository';
import { AuthController } from 'src/modules/auth/infrastructure/controllers/auth.controller';
import { TypeOrmUserEntity } from 'src/modules/shared/database/TypeOrmUser.entity';
import { UserModule } from 'src/modules/user/user.module';
import { MockEmailRepository } from './infrastructure/Mailer/MockEmail.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmUserEntity]), UserModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    EmailService,
    {
      provide: 'AuthRepository',
      useClass: TypeOrmAuthRepository,
    },
    {
      provide: 'EmailRepository',
      useClass:
        envConfig.NODE_ENV === 'development'
          ? MockEmailRepository
          : ResendEmailRepository,
    },
    {
      provide: 'AuthRegister',
      useFactory: (repository: TypeOrmAuthRepository) =>
        new AuthRegister(repository),
      inject: ['AuthRepository'],
    },
    {
      provide: 'AuthLogin',
      useFactory: (repository: TypeOrmAuthRepository) =>
        new AuthLogin(repository),
      inject: ['AuthRepository'],
    },
    {
      provide: 'AuthResetPassword',
      useFactory: (repository: TypeOrmAuthRepository) =>
        new AuthResetPassword(repository),
      inject: ['AuthRepository'],
    },
    {
      provide: 'AuthLogout',
      useFactory: (repository: TypeOrmAuthRepository) =>
        new AuthLogout(repository),
      inject: ['AuthRepository'],
    },
    {
      provide: 'SendEmail',
      useFactory: (repository: ResendEmailRepository) =>
        new SendEmail(repository),
      inject: ['EmailRepository'],
    },
  ],
})
export class AuthModule {}
