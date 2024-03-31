import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { ErrorFilter } from './utils/error';
// import { ResponseInterceptor } from './response/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalFilters(new ErrorFilter())
  // app.useGlobalInterceptors(new ResponseInterceptor());
  //whitelist remove any other data that was not sppecified in dto
  app.useGlobalPipes(new ValidationPipe({ whitelist: true })) ,
  await app.listen(3000);
}
bootstrap();
