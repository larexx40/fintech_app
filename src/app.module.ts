import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigurationModule } from './config/configuration.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { SuccessInterceptor } from './response/success.response';
import { ErrorInterceptor } from './response/error.response';

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule,
    JwtModule.registerAsync({
      useFactory: ()=>({
        secret: process.env.JWT_SECRET_KEY,
        signOptions: { expiresIn: '1h' }
      })
    }),
    UserModule, 
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: SuccessInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorInterceptor,
    },
    AppService,
  ],
})
export class AppModule {}
