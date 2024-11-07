import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmUserEntity } from '../shared/database/TypeOrmUser.entity';
import { UserFindByEmail } from './application/UserFindByEmail/UserFindByEmail.service';

import { TypeOrmUserRepository } from 'src/modules/user/infrastructure/database/TypeOrmUser.repository';
import { UserController } from 'src/modules/user/infrastructure/http/controllers/user.controller';

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
