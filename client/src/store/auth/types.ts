import { IUser } from "../../interfaces";

export interface IAuthStore {
    user: IUser | null
    isLoading: boolean
    error: string

    signIn(payload: ISigninPayload): Promise<void>
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