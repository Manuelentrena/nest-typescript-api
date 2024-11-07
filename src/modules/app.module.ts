import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envConfig } from 'src/config/env';
import { AuthModule } from 'src/modules/auth/auth.module';
import { TaskModule } from 'src/modules/task/task.module';
import { UserModule } from 'src/modules/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: envConfig.DB_TYPE as 'postgres',
      host: envConfig.DB_HOST,
      port: envConfig.DB_PORT,
      username: envConfig.DB_USERNAME,
      password: envConfig.DB_PASSWORD,
      database: envConfig.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: envConfig.DB_SYNCHRONIZE,
    }),
    TaskModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
