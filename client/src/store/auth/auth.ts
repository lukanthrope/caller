import { action, observable } from "mobx";
import ApiService from "../../services/api";
import AuthService from "../../services/auth";
import { IUser } from "../../interfaces";
import { IAuthStore, ISigninPayload, ISignupPayload } from "./types";

export class AuthStore implements IAuthStore {
  @observable
  public user: IUser | null = null;

  @observable
  public isLoading: boolean = true;

  @observable
  public error: string = "";

  constructor() {
    this.user = AuthService.getUser();
    this.isLoading = false;
  }

  @action
  private clearErrors() {
    if (this.error) this.error = "";
  }

  @action.bound
  public async signIn(payload: ISigninPayload) {
    this.isLoading = true;
    try {
      const { data } = await ApiService.post("auth/signin", payload);

      AuthService.setToken(data.token);
      this.user = AuthService.getUser();
      this.clearErrors();
    } catch (e) {
      console.log(e);
      this.error = "Wrong email or password";
    } finally {
      this.isLoading = false;
    }
  }

  @action.bound
  public async signUp(payload: ISignupPayload) {
    this.isLoading = true;

    try {
      const { data } = await ApiService.post("auth/signup", payload);

      AuthService.setToken(data.token);
      this.user = AuthService.getUser();

      this.clearErrors();
    } catch (e) {
      console.log(e);
      this.error = "ID or email is already taken";
    } finally {
      this.isLoading = false;
    }
  }

  @action.bound
  public logout() {
      this.isLoading = true
      this.user = null;
      AuthService.deleteUser()
      this.isLoading = false
  }
}
