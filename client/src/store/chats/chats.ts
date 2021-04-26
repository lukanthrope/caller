import { action, observable } from "mobx";
import ApiService from "../../services/api";
import { IUser } from "../../interfaces";
import { IChatsStore } from "./types";
import { Store } from "../root";

export class ChatsStore implements IChatsStore {
  @observable
  public users: IUser[] = [];

  @observable
  public isLoading: boolean = false;

  root: Store;

  constructor(root: Store) {
    this.root = root;

    this.fetchChats()
    console.log('fetched')
  }

  @action.bound
  public async fetchChats() {
    this.isLoading = true;

    try {
      const { data } = await ApiService.get("users", {
        params: { userId: this.root.authStore.user?._id },
      });

      this.users = data;
    } catch (e) {
      console.log(e);
    } finally {
      this.isLoading = false;
    }
  }

  public async createChat() {
    //return this.chatsService.create(dto.userIds)
  }

  public async fetchChat() {
    // return this.chatsService.getChat(params.chatId)
  }

  public async sendMessage() {
    //return this.chatsService.sendMessage(dto)
  }
}
