import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./user.model";
import { Model } from "mongoose";
import { IUser } from "./user.interface";
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from "./user.dto";
import { UserRoles } from "src/utils/enum";

@Injectable()
export class UserRepository{
    constructor(
        @InjectModel(User.name) 
        private readonly userModel: Model<User>
    ){}

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = this.userModel.create({
            userId: uuidv4(),
            ...createUserDto,
            role: UserRoles.USER
        });
        return createdUser;
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findOne(id: string): Promise<User> {
        return this.userModel.findOne({userId:id}).exec();
    }

    async findUserLogin(emailOrUsername: string):Promise<User>{
        // Check if the user exists with the provided username or email
        const user = await this.userModel.findOne({
          $or: [{ username: emailOrUsername }, { email: emailOrUsername }],
        }).exec();
        return user
    }

    async checkExist(whereClause: Partial<IUser>): Promise<User> {
        return this.userModel.findOne(whereClause).exec();
    }

    async update(id: string, updateUserDto: any): Promise<User> {
        return this.userModel.findOneAndUpdate({userId:id}, updateUserDto, { new: true }).exec();
    }

    async updateProfilePicture(id: string, imageUrl: any): Promise<User> {
        return this.userModel.findOneAndUpdate({userId:id}, imageUrl, { new: true }).exec();
    }

    async remove(id: string): Promise<User> {
        return this.userModel.findOneAndDelete({userId:id}).exec();
    }
}