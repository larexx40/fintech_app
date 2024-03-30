import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto } from 'src/user/user.dto';
import { AuthGuard } from './auth.gaurd';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @HttpCode(HttpStatus.OK)
    @Post('signup')
    signUp(@Body()registerDto: CreateUserDto){
        return this.authService.signUp(registerDto);
    }

    @Post('login')
    login(@Body()loginDto: LoginDto){
        return this.authService.login(loginDto)
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
