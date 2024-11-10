import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFindTasks } from 'src/modules/user/application/uses-cases/userFindTasks.use-case';
import { UserController } from 'src/modules/user/infrastructure/controllers/user.controller';
import { TypeOrmUserRepository } from 'src/modules/user/infrastructure/database/TypeOrmUser.repository';
import { TypeOrmUserEntity } from '../shared/database/TypeOrmUser.entity';
import { UserService } from './application/services/user.service';
import { UserFindByEmail } from './application/uses-cases/userFindByEmail.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmUserEntity])],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'UserRepository',
      useClass: TypeOrmUserRepository,
    },
    {
      provide: 'UserFindTasks',
      useFactory: (repository: TypeOrmUserRepository) =>
        new UserFindTasks(repository),
      inject: ['UserRepository'],
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
