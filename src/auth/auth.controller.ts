import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto } from 'src/user/user.dto';
import { AuthGuard } from './auth.gaurd';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @HttpCode(HttpStatus.OK)
    @Post('signup')
    async signUp(
        @Body()registerDto: CreateUserDto
    ) {
        const signUp = await this.authService.signUp(registerDto);
        const response = {
            message: 'User registered successfully',
            data: signUp
        };
        
        return response;
    }

    @Post('login')
    async login(@Body()loginDto: LoginDto){
        const login = await this.authService.login(loginDto)
        return login
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
