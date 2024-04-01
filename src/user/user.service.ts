import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.model';
import { UserRepository } from './user.repository';
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { compare, hash } from "bcrypt";

@Injectable()
export class UserService{
    constructor(
        private readonly userRepository: UserRepository
    ){}

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        return this.userRepository.createUser(createUserDto);
    }
    
    async findAll(page = 1, limit = 10): Promise<{ data: User[]; total: number }> {
        return await this.userRepository.findAll(page, limit);
    }

    async findOne(id: string): Promise<User> {
        if(!id) throw new BadRequestException("Pass in user id")
        const user = await this.userRepository.findOne(id);
        if(!user) throw new NotFoundException("User with id not found")
        return user;
    }

    async getUserBalance(id: string) {
        if(!id) throw new BadRequestException("Pass in user id")
        const user = await this.userRepository.findOne(id);
        if(!user) throw new NotFoundException("User not found")
        return user.balance; 
    }

    async findUserLogin(emailOrUsername): Promise<User>{
        if(!emailOrUsername) throw new BadRequestException("Pass in email or username")
        return this.userRepository.findUserLogin(emailOrUsername);
    }

    async updateProfile(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        if(!updateUserDto) throw new BadRequestException("Pass in user data")
        return this.userRepository.updateProfile(id, updateUserDto);
    }

    async remove(id: string): Promise<User> {
        return this.userRepository.remove(id);
    }

    async checkIfUserExists(userId: string): Promise<boolean> {
        const user = await this.userRepository.findOne(userId);
        return !!user;
    }
    
    async checkIfExist (whereClause: Partial<CreateUserDto>): Promise<boolean>{
        const user = await this.userRepository.checkExist(whereClause);
        return !!user;
    }

    async setPin (userId: string, pin: number): Promise<boolean>{
        if(!pin) throw new BadRequestException("Pass in 4 digit pin")
        const hashPin = await hash(pin, 10)
        const user = await this.userRepository.setPin(userId, hashPin);
        return !!user;
    }

    async verifyPin (userId: string, pin: number): Promise<boolean>{
        const user = await this.userRepository.findOne(userId);
        if(!user){
            throw new NotFoundException("User not found");
        }
        
        //verify pin
        const isValid = await compare(pin, user.pin)
        if(!isValid) throw new BadRequestException("Incorrect pin");
        return !!user;
    }
}


