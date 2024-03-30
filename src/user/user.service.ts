import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.model';
import { UserRepository } from './user.repository';
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService{
    constructor(
        private readonly userRepository: UserRepository
    ){}

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        return this.userRepository.createUser(createUserDto);
    }
    
    async findAll(): Promise<User[]> {
        return this.userRepository.findAll();
    }

    async findOne(id: string): Promise<User> {
        return this.userRepository.findOne(id);
    }

    async findUserLogin(emailOrUsername): Promise<User>{
        return this.userRepository.findUserLogin(emailOrUsername);
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        return this.userRepository.update(id, updateUserDto);
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
}