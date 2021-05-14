import { action, observable } from "mobx";
import ApiService from "../../services/api";
import { IUser } from "../../interfaces";
import { IUsersStore } from "./types";

export class UsersStore implements IUsersStore {
  @observable
  public users: IUser[] = [];

  @observable
  public isLoading: boolean = false;

  @action.bound
  public async fetchUsers(_id: string) {
    this.isLoading = true;

    try {
      const { data } = await ApiService.get("users", { params: { _id } });

      this.users = data;
    } catch (e) {
      console.log(e);
    } finally {
      this.isLoading = false;
    }
  }

  @action.bound
  public clearUsers() {
      this.users = []
  }
}
