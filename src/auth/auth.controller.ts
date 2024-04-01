import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto } from 'src/user/user.dto';
import { AuthGuard } from './auth.gaurd';

export interface ApiResponse<T> {
    message: string;
    data?: T;
    statusCode?: HttpStatus;
  }
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @HttpCode(HttpStatus.CREATED)
    @Post('signup')
    async signUp(
        @Body()registerDto: CreateUserDto
    ):Promise<ApiResponse<any>> {
        const signUp = await this.authService.signUp(registerDto);
        const res = {
            message: 'User registered successfully',
            data: signUp,
            statusCode: HttpStatus.CREATED
        };
        
        return res;
    }

    @Post('login')
    async login(@Body()loginDto: LoginDto){
        const login = await this.authService.login(loginDto)
        const res = {
            message: 'Login successful',
            data: login
        };
        return res
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
