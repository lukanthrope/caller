import { AuthStore, IAuthStore } from './auth'

export class Store {
    public authStore: IAuthStore

    constructor() {
        this.authStore = new AuthStore()
    }
}