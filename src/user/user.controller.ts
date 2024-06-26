import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { AuthGuard } from 'src/auth/auth.gaurd';
import { RequestWithAuth } from './user.interface';
import { ApiResponse } from 'src/response/success.response';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  //to be called by admin (AdminGuard needed)
  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ): Promise<ApiResponse<any>> {
    const {data, total} = await this.userService.findAll(Number(page), Number(limit));
    const totalPage = Math.ceil(total / limit);
    return {
      message: "User fetched successfully",
      data: {
        totalNumber: total,
        totalPage: totalPage,
        perPage: limit,
        page: page,
        users: data
      }
    };
  }

  @Get('balance')
  @UseGuards(AuthGuard)
  async getUserBalance(
    @Request() req: RequestWithAuth
  ): Promise<ApiResponse<any>> {
    const userId = req.user.userId
    const balance = await this.userService.getUserBalance(userId);
    return {
      message: "Balance fetched",
      data:{
        balance
      }
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ApiResponse<any>> {
    const user = await this.userService.findOne(id);
    return {
      message: "User details fetched",
      data: user
    }
  }

  @Patch()
  @UseGuards(AuthGuard)
  async updateUserDetails(
    @Request() req: RequestWithAuth, 
    @Body() updateUserDto: UpdateUserDto
  ): Promise<ApiResponse<any>> {
    const userId = req.user.userId;
    const updateUser =  await  this.userService.updateProfile(userId, updateUserDto);
    return {
      message: (updateUser)?"User profile updated" : "Unable to update user details",
      data: updateUser
    }
  }

  @Delete()
  @UseGuards(AuthGuard)
  async deleteAccount(
    @Request() req: RequestWithAuth, 
  ): Promise<ApiResponse<any>> {
    const userId = req.user.userId;
    const del = await this.userService.deleteUser(userId);
    return {
      message: (del)? "Account deleted": "Unable to delete account"
    }
  }
}