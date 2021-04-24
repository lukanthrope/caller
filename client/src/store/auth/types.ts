import { IUser } from "../../interfaces";

export interface IAuthStore {
    user: IUser | null

    signIn(payload: ISignupPayload): Promise<void>
    signUp(payload: ISignupPayload): Promise<void>
}

export interface ISignupPayload {
    _id: string
    email: string
    password: string
    about?: string
}

export interface ISigninPayload {
    email: string
    password: string
}