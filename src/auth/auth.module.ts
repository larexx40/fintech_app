import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.gaurd';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[
    UserModule,
  ],
  providers: [
    AuthService, // Include AuthService in the providers array
    AuthGuard,
  ],
  controllers: [AuthController], // Export JwtAuthService if needed by other modules
  exports: [AuthService],
})
export class AuthModule {}
