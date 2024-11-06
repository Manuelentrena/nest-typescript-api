import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLogin } from './application/AuthLogin/AuthLogin';
import { UserLogout } from './application/AuthLogout/AuthLogout';
import { UserRegister } from './application/AuthRegister/AuthRegister';
import { UserResetPassword } from './application/AuthResetPassword/AuthResetPassword';
import { UserController } from './infrastructure/http/controllers/auth.controller';
import { TypeOrmUserEntity } from './infrastructure/persistence/DataBase/TypeOrmUser.entity';
import { TypeOrmUserRepository } from './infrastructure/persistence/DataBase/TypeOrmUser.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmUserEntity])],
  controllers: [UserController],
  providers: [
    {
      provide: 'UserRepository',
      useClass: TypeOrmUserRepository,
    },
    {
      provide: 'UserRegister',
      useFactory: (repository: TypeOrmUserRepository) =>
        new UserRegister(repository),
      inject: ['UserRepository'],
    },
    {
      provide: 'UserLogin',
      useFactory: (repository: TypeOrmUserRepository) =>
        new UserLogin(repository),
      inject: ['UserRepository'],
    },
    {
      provide: 'UserResetPassword',
      useFactory: (repository: TypeOrmUserRepository) =>
        new UserResetPassword(repository),
      inject: ['UserRepository'],
    },
    {
      provide: 'UserLogout',
      useFactory: (repository: TypeOrmUserRepository) =>
        new UserLogout(repository),
      inject: ['UserRepository'],
    },
  ],
})
export class UserModule {}
