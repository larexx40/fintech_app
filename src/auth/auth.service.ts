import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { AuthTokenPayload, IUser, UserData } from "src/user/user.interface";
import * as jwt from 'jsonwebtoken';
import { CreateUserDto, LoginDto } from "src/user/user.dto";
import { compare, hash } from "bcrypt";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService
    ) {};
    
    async signUp(createUserDto: CreateUserDto): Promise<UserData> {
      if(!createUserDto){
         throw new BadRequestException("Pass user details");
      }
      
      const{username, email, password} =createUserDto;
  
      //encrypt password
      const hashPassword = await hash(password, 10)
      createUserDto.password = hashPassword;

      //confirm if name or username already in db
      const [emailExist, usernameExist] = await Promise.all([
        await this.userService.checkIfExist({email}),
        username? await this.userService.checkIfExist({username}): null
      ])
      if(emailExist) throw new ConflictException(`User with email: ${email} already exist`);
      if(usernameExist) throw new ConflictException(`User with username: ${username} already exist`);

      //save user to db
      const user = await this.userService.createUser(createUserDto);
      const payload: AuthTokenPayload={
        userId: user.userId,
        email: user.email,
        role: user.email
      }


      //generate jwt token
      const token = await this.generateToken(payload);
      const userData: UserData={
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        balance: user.balance,
        password: user.password,
        username: user.username,
        emailVerified: user.emailVerified,
        phoneVerified: user.phoneVerified,
        pinSet: user.pinSet,
        token: token
      }
      
      return userData;
        
      
    }

    async getProfile(userId: string): Promise<UserData>{
      if(!userId) throw new BadRequestException("Pass in user id")
      const user = await this.userService.findOne(userId);
      if(!user) throw new NotFoundException("User with id does not exist")
      return user
    }
    
    async login(loginDto: LoginDto): Promise<{user: IUser, token: string}>{
      if(!loginDto) throw new BadRequestException("Pass in login data")
      const {password,  emailOrUsername} = loginDto;
      // Check if the user exists with the provided username or email
      const user: IUser = await this.userService.findUserLogin(emailOrUsername); 
      if(!user){
        throw new NotFoundException("User not found");
      }
  
      const isValid = await compare(password, user.password)
      if(!isValid) throw new BadRequestException("Incorrect password");

      const payload: AuthTokenPayload ={
        userId: user.userId,
        email: user.email,
        role: user.role
      }

      //generate jwt token
      const token = await this.generateToken(payload);
      return {user, token};
        
    }


    async generateToken (user: AuthTokenPayload) {
      const payload = {
        userId: user.userId,
        email: user.email,
        role: user.role
      }
      return jwt.sign(payload, process.env.JWT_SECRET_KEY)
    }

    async verifyToken(token: string): Promise<AuthTokenPayload> {
        const payload = jwt.verify(token,  process.env.JWT_SECRET_KEY ) as AuthTokenPayload;
        return payload;
    }
}