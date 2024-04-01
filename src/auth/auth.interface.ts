import { Request } from "express";
import { IUser } from "src/user/user.interface";


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