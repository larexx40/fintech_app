import { CreateUserDto, UpdateUserDto } from './user.dto';
import { IUser, UserData } from './user.interface';
import { User } from './user.model';
import { UserRepository } from './user.repository';
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { compare, hash } from "bcrypt";

@Injectable()
export class UserService{
    constructor(
        private readonly userRepository: UserRepository
    ){}

    async createUser(createUserDto: CreateUserDto): Promise<IUser> {
        //throw badrequest if input not passed;
        if(!createUserDto) throw new BadRequestException("Pass in new user data");
        return await this.userRepository.createUser(createUserDto);
    }
    
    async findAll(page = 1, limit = 10): Promise<{ data: User[]; total: number }> {
        return await this.userRepository.findAll(page, limit);
    }

    async findOne(id: string): Promise<UserData> {
        //throw badrequest if input not passed;
        if(!id) throw new BadRequestException("Pass in user id")
        const user = await this.userRepository.findOne(id);
        if(!user) throw new NotFoundException("User with id not found")
        return user;
    }

    async getUserBalance(id: string) {
        //throw badrequest if input not passed;
        if(!id) throw new BadRequestException("Pass in user id")
        const user = await this.userRepository.findOne(id);
        if(!user) throw new NotFoundException("User not found")
        return user.balance; 
    }

    async findUserLogin(emailOrUsername): Promise<IUser>{
        //throw badrequest if input not passed;
        if(!emailOrUsername) throw new BadRequestException("Pass in email or username")
        return this.userRepository.findUserLogin(emailOrUsername);
    }

    async updateProfile(id: string, updateUserDto: UpdateUserDto): Promise<IUser> {
        //throw badrequest if input not passed;
        if(!updateUserDto) throw new BadRequestException("Pass in user data")
        const res = await this.userRepository.updateProfile(id, updateUserDto);
        if (!res) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return res
    }

    async updateUserBalance(userId: string, amount: number){
        //throw badrequest if input not passed
        if(!userId || !amount) throw new BadRequestException("Pass in user amount data")
        const res = await this.userRepository.updateBalance(userId, amount)
        if(!res) throw new NotFoundException(`User with id ${userId} not found`);
        return res;
    }

    async deductUserBalance(userId: string, amount: number):Promise<number>{
        //throw badrequest if input not passed
        if(!userId || !amount) throw new BadRequestException("Pass in user amount data")
        const res = await this.userRepository.removeFromeBalance(userId, amount)
        if(!res) throw new NotFoundException(`User with id ${userId} not found`);
        return res.balance;
    }

    async addToUserBalance(userId: string, amount: number):Promise<number>{
        //throw badrequest if input not passed
        if(!userId || !amount) throw new BadRequestException("Pass in user amount data")
        const res = await this.userRepository.addToBalance(userId, amount)
        if(!res) throw new NotFoundException(`User with id ${userId} not found`);
        return res.balance;
    }

    async deleteUser(id: string): Promise<boolean> {
        //throw badrequest if input not passed;
        if(!id) throw new BadRequestException("Pass in user id")        
        const del = await  this.userRepository.remove(id);
        if(!del) throw new NotFoundException("User with id not found");
        return !!del;
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
        //throw badrequest if input not passed;
        if(!pin) throw new BadRequestException("Pass in 4 digit pin")
        const hashPin = await hash(pin, 10)
        const user = await this.userRepository.setPin(userId, hashPin);
        return !!user;
    }

    async verifyPin (userId: string, pin: number): Promise<boolean>{
        //throw badrequest if input not passed;
        if(!pin) throw new BadRequestException("Pass in 4 digit pin")
        const user = await this.userRepository.findOne(userId);
        if(!user){
            //throw not found exception if not in database;
            throw new NotFoundException("User not found");
        }
        
        //verify pin
        const isValid = await compare(pin, user.pin)
        //throw error if pin is incorrect
        if(!isValid) throw new BadRequestException("Incorrect pin");
        return !!user;
    }
}


