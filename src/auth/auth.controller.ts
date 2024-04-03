import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto } from 'src/user/user.dto';
import { AuthGuard } from './auth.gaurd';
import { ApiResponse } from 'src/response/success.response';
import { RequestWithAuth } from './auth.interface';

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
    async login(@Body()loginDto: LoginDto):Promise<ApiResponse<any>>{
        const login = await this.authService.login(loginDto)
        const res = {
            message: 'Login successful',
            data: login
        };
        return res
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    async getProfile(@Request() req: RequestWithAuth):Promise<ApiResponse<any>> {
        const userId = req.user.userId;
        const user = await this.authService.getProfile(userId)
        return {
            message: "Profile fetched successfully",
            data: user
        };
    }
}
