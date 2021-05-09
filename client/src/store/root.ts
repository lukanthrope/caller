import { AuthStore, IAuthStore } from "./auth";
import { ChatsStore, IChatsStore } from "./chats";
import { IUsersStore, UsersStore } from "./users";

export class Store {
  public authStore: IAuthStore;
  public usersStore: IUsersStore;
  public chatsStore: IChatsStore;

  constructor() {
    this.authStore = new AuthStore(this);
    this.usersStore = new UsersStore();
    this.chatsStore = new ChatsStore(this);
  }
}
