import jwtDecode from 'jwt-decode'
import { IUser } from '../interfaces'
import ApiService from './api'

class AuthService {
    public getUser(): IUser | null {
        const token = localStorage.getItem('token')

        if (token) {
            this.saveToken(token)
            const { user }: any = jwtDecode(token)
            return user
        }

        return null
    }

    public setToken(token: string): void {
        localStorage.setItem('token', token)
        this.saveToken(token)
    }

    private saveToken(token: string): void {
        ApiService.setToken(token)
    }
}

export default new AuthService()