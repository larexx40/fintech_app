import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ErrorFilter } from './utils/error';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ErrorFilter())
  //whitelist remove any other data that was not sppecified in dto
  app.useGlobalPipes(new ValidationPipe({ whitelist: true })) ,
  await app.listen(3000);
}
bootstrap();
