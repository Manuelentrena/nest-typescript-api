import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmUserEntity } from '../shared/database/TypeOrmUser.entity';
import { UserExists } from './application/UserExists/UserExists.service';

import { UserController } from 'src/user/infrastructure/http/controllers/user.controller';
import { TypeOrmUserRepository } from 'src/user/infrastructure/persistence/database/TypeOrmUser.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmUserEntity])],
  controllers: [UserController],
  providers: [
    {
      provide: 'UserRepository',
      useClass: TypeOrmUserRepository,
    },
    {
      provide: 'UserExists',
      useFactory: (repository: TypeOrmUserRepository) =>
        new UserExists(repository),
      inject: ['UserRepository'],
    },
  ],
  exports: ['UserExists'],
})
export class UserModule {}
