import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmUserEntity } from '../shared/database/TypeOrmUser.entity';
import { AuthLogin } from './application/AuthLogin/AuthLogin';
import { AuthLogout } from './application/AuthLogout/AuthLogout';
import { AuthRegister } from './application/AuthRegister/AuthRegister';
import { AuthResetPassword } from './application/AuthResetPassword/AuthResetPassword';
import { UserController } from './infrastructure/http/controllers/auth.controller';
import { TypeOrmAuthRepository } from './infrastructure/persistence/DataBase/TypeOrmAuth.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmUserEntity])],
  controllers: [UserController],
  providers: [
    {
      provide: 'UserRepository',
      useClass: TypeOrmAuthRepository,
    },
    {
      provide: 'AuthRegister',
      useFactory: (repository: TypeOrmAuthRepository) =>
        new AuthRegister(repository),
      inject: ['UserRepository'],
    },
    {
      provide: 'AuthLogin',
      useFactory: (repository: TypeOrmAuthRepository) =>
        new AuthLogin(repository),
      inject: ['UserRepository'],
    },
    {
      provide: 'AuthResetPassword',
      useFactory: (repository: TypeOrmAuthRepository) =>
        new AuthResetPassword(repository),
      inject: ['UserRepository'],
    },
    {
      provide: 'AuthLogout',
      useFactory: (repository: TypeOrmAuthRepository) =>
        new AuthLogout(repository),
      inject: ['UserRepository'],
    },
  ],
})
export class AuthModule {}
