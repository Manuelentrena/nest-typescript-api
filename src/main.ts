import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { AllExceptionsFilter } from './modules/shared/exceptions/allExceptionsFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
