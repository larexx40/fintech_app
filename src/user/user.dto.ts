import { IsString, IsEmail, IsOptional, IsPhoneNumber, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;
  
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsNumber()
  age?: number;

  @IsOptional()
  @IsPhoneNumber()
  phoneNumber?: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  firstName?: string;
  
  @IsOptional()
  @IsString()
  lastName?: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  occupation: string;

  @IsString()
  password: string;
}

export class LoginDto{
    @IsNotEmpty()
    @IsString()
    emailOrUsername: string;
  
    @IsNotEmpty()
    @IsString()
    password: string;
  }



