import { action, observable } from 'mobx'
import ApiService from '../../services/api'
import AuthService from '../../services/auth'
import { IUser } from '../../interfaces'
import { IAuthStore, ISignupPayload } from './types'

export class AuthStore implements IAuthStore {
    @observable
    public user: IUser | null = null

    constructor() {
        this.user = AuthService.getUser()
    }

    @action.bound
    public async signIn() {
        const {} = await ApiService.post('auth/signin')
    }

    @action.bound
    public async signUp(payload: ISignupPayload) {
        try {
        const { data } = await ApiService.post('auth/signup', payload)
        
        this.user = { _id: payload._id, about: payload.about }

        AuthService.setToken(data.token)

        } catch(e) {
            throw e
        }
    }
}