import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document { 
    @Prop({ type: String, unique: true, required: true })
    userId: string;

    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop()
    password: string;

    @Prop()
    email: string;

    @Prop()
    username: string;

    @Prop()
    age: number;

    @Prop()
    phoneNumber: string;
    
    @Prop()
    profilePic: string;

    @Prop()
    role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);