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

    // Repository
    async findAll(page = 1, limit = 10): Promise<{data:User[], total: number}> {
        const skip = (page - 1) * limit;
        const data = await this.userModel.find().skip(skip).limit(limit);
        const total = await this.userModel.countDocuments();
        return { data, total };
    }

    async getAllUser(): Promise<IUser[]>{
        return await this.userModel.find()
    }

    async findOne(id: string): Promise<IUser> {
        return await this.userModel.findOne({userId:id}).exec();
    }

    async findUserLogin(emailOrUsername: string):Promise<IUser>{
        // Check if the user exists with the provided username or email
        const user = await this.userModel.findOne({
          $or: [{ username: emailOrUsername }, { email: emailOrUsername }],
        }).exec();
        return user
    }

    async checkExist(whereClause: Partial<IUser>): Promise<IUser> {
        return await this.userModel.findOne(whereClause).exec();
    }

    async updateProfile(id: string, updateUserDto: any): Promise<IUser> {
        return await this.userModel.findOneAndUpdate({userId:id}, updateUserDto, { new: true }).exec();
    }

    async updateBalance(id: string, newBalance: number): Promise<User> {
        return await this.userModel.findOneAndUpdate({userId:id}, {balance: newBalance}, { new: true }).exec();
    }

    async removeFromeBalance(id: string, amountToDeduct: number): Promise<User> {
        return await this.userModel.findOneAndUpdate({userId:id}, { $inc: { balance: - amountToDeduct } }, { new: true }).exec();
    }

    async addToBalance(id: string, amountToDeduct: number): Promise<User> {
        return await this.userModel.findOneAndUpdate({userId:id}, { $inc: { balance:  amountToDeduct } }, { new: true }).exec();
    }


    async updateProfilePicture(id: string, imageUrl: any): Promise<User> {
        return await this.userModel.findOneAndUpdate({userId:id}, imageUrl, { new: true }).exec();
    }

    async remove(id: string): Promise<boolean> {
        const del = await this.userModel.findOneAndDelete({userId:id}).exec();
        return !!del
    }

    async changePassword(userId: string, hashPassword: string){
        return await this.userModel.findOneAndUpdate({userId}, {password: hashPassword}, { new: true }).exec();
    }

    async setPin(userId: string, hashPin: string){
        return await this.userModel.findOneAndUpdate({userId}, {pin: hashPin}, { new: true }).exec();
    }
}