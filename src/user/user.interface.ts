import { Request } from "express";
import { UserRoles } from "src/utils/enum";

const statuses = ["ACTIVE", "INACTIVE", "SUSPENDED", "DELETED", "BANNED"] as const;
export interface IUser {
    _id?: string;
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    balance: number;
    password: string;
    pin: number;
    username: string;
    dob?: Date;
    phoneNumber?: string;
    role?: UserRoles;
    status?: typeof statuses[number];
    emailVerified: boolean;
    phoneVerified: boolean;
    pinSet: boolean
    token?: string;

}

export interface UserData{
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    balance: number;
    password: string;
    username: string;
    dob?: Date;
    phoneNumber?: string;
    role?: UserRoles;
    emailVerified: boolean;
    phoneVerified: boolean;
    pinSet: boolean;
    token?: string;
}

export interface AuthTokenPayload {
    userId: string;
    email: string;
    role: string; 
}

export interface RequestWithAuth extends Request {
    user: AuthTokenPayload;
}

export class UserWithToken {
    user: IUser;
    token: string;
}