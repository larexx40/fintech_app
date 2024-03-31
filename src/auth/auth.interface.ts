import { Request } from "express";
import { UserRoles } from "src/utils/enum";

const statuses = ["ACTIVE", "INACTIVE", "SUSPENDED", "DELETED", "BANNED"] as const;
export interface IUser {
    _id?: string;
    userId: string;
    name: string;
    email: string;
    password: string;
    username: string;
    age?: number;
    phoneNumber?: string;
    role?: UserRoles;
    status?: typeof statuses[number];
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