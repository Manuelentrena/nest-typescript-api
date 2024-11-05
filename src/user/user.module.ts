import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFindById } from './application/UserFindById/UserFindById';
import { UserLogin } from './application/UserLogin/UserLogin';
import { UserLogout } from './application/UserLogout/UserLogout';
import { UserRegister } from './application/UserRegister/UserRegister';
import { UserResetPassword } from './application/UserResetPassword/UserResetPassword';
import { UserController } from './infrastructure/http/controllers/user.controller';
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
    {
      provide: 'UserFindById',
      useFactory: (repository: TypeOrmUserRepository) =>
        new UserFindById(repository),
      inject: ['UserRepository'],
    },
  ],
})
export class UserModule {}
