import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRoles } from 'src/utils/enum';

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

    @Prop({type: String, enum: UserRoles, default: UserRoles.USER})
    role: UserRoles;

    @Prop()
    pin: number; //4 digit pin for transaction

    @Prop({type: Boolean, default: false})
    emailVerified: boolean;
    
    @Prop({type: Boolean, default: false})
    phoneVerified: boolean;

    @Prop({type: Boolean, default: false})
    pinSet: boolean;

    @Prop({ default: 0 })
    balance: number;
}

export const UserSchema = SchemaFactory.createForClass(User);