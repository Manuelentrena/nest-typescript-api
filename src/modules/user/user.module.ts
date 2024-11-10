import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmUserEntity } from 'src/modules/shared/database/TypeOrmUser.entity';
import { UserService } from 'src/modules/user/application/services/user.service';
import { UserFindByEmail } from 'src/modules/user/application/uses-cases/userFindByEmail.use-case';
import { UserFindById } from 'src/modules/user/application/uses-cases/userFindById.use-case';
import { UserFindTasks } from 'src/modules/user/application/uses-cases/userFindTasks.use-case';
import { UserController } from 'src/modules/user/infrastructure/controllers/user.controller';
import { TypeOrmUserRepository } from 'src/modules/user/infrastructure/database/TypeOrmUser.repository';

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
    {
      provide: 'UserFindById',
      useFactory: (repository: TypeOrmUserRepository) =>
        new UserFindById(repository),
      inject: ['UserRepository'],
    },
  ],
  exports: ['UserFindByEmail', 'UserFindById'],
})
export class UserModule {}
