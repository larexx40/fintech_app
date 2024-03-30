import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./user.model";
import { Model } from "mongoose";

@Injectable()
export class UserRepository{
    constructor(
        @InjectModel(User.name) 
        private readonly userModel: Model<User>
    ){}

    async createUser(createUserDto: any): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findOne(id: string): Promise<User> {
        return this.userModel.findOne({userId:id}).exec();
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