import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFindByEmail } from 'src/user/application/UserFindByEmail/UserFindByEmail.service';
import { UserModule } from 'src/user/user.module';
import { TypeOrmUserEntity } from '../shared/database/TypeOrmUser.entity';
import { AuthLogin } from './application/AuthLogin/AuthLogin.service';
import { AuthLogout } from './application/AuthLogout/AuthLogout.service';
import { AuthRegister } from './application/AuthRegister/AuthRegister.service';
import { AuthResetPassword } from './application/AuthResetPassword/AuthResetPassword.service';
import { TypeOrmAuthRepository } from './infrastructure/DataBase/TypeOrmAuth.repository';
import { AuthController } from './infrastructure/http/controllers/auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmUserEntity]), UserModule],
  controllers: [AuthController],
  providers: [
    {
      provide: 'AuthRepository',
      useClass: TypeOrmAuthRepository,
    },
    {
      provide: 'AuthRegister',
      useFactory: (repository: TypeOrmAuthRepository) =>
        new AuthRegister(repository),
      inject: ['AuthRepository'],
    },
    {
      provide: 'AuthLogin',
      useFactory: (
        repository: TypeOrmAuthRepository,
        userFindByEmail: UserFindByEmail,
      ) => new AuthLogin(repository, userFindByEmail),
      inject: ['AuthRepository', 'UserFindByEmail'],
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
  ],
})
export class AuthModule {}
