import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmUserEntity } from '../shared/database/TypeOrmUser.entity';
import { UserFindByEmail } from './application/uses-cases/userFindByEmail.use-case';

import { UserController } from 'src/modules/user/infrastructure/controllers/user.controller';
import { TypeOrmUserRepository } from 'src/modules/user/infrastructure/database/TypeOrmUser.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmUserEntity])],
  controllers: [UserController],
  providers: [
    {
      provide: 'UserRepository',
      useClass: TypeOrmUserRepository,
    },
    {
      provide: 'UserFindByEmail',
      useFactory: (repository: TypeOrmUserRepository) =>
        new UserFindByEmail(repository),
      inject: ['UserRepository'],
    },
  ],
  exports: ['UserFindByEmail'],
})
export class UserModule {}
