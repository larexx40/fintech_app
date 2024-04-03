import { IsString, IsEmail, IsOptional, IsPhoneNumber, IsNotEmpty, Matches, IsDate } from 'class-validator';
const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;
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
  @Matches(passwordRegEx, {
    message: `Password must contain Minimum 8 and maximum 20 characters,
    at least 1 uppercase letter,
    lowercase letter,
    number and
    a special character`,
  })
  password: string;

  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsDate()
  dob?: Date;

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

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  occupation?: string;

  @IsOptional()
  @IsDate()
  dob: Date;

}

export class LoginDto{
    @IsNotEmpty()
    @IsString()
    emailOrUsername: string;
  
    @IsNotEmpty()
    @IsString()
    password: string;
  }



