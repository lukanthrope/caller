import { action, observable } from "mobx";
import ApiService from "../../services/api";
import { IChat, IUser } from "../../interfaces";
import { IChatsStore } from "./types";
import { Store } from "../root";
import { EMessageType } from "../../enums";

export class ChatsStore implements IChatsStore {
  @observable
  public chats: IChat[] = [];

  @observable
  public currentChat: IChat | null = null;

  @observable
  public isLoading: boolean = false;

  private root: Store;

  constructor(root: Store) {
    this.root = root;
  }

  @action.bound
  public clearStore() {
    this.chats = [];
    this.currentChat = null;
  }

  @action.bound
  public async fetchChats() {
    this.isLoading = true;

    try {
      const { data } = await ApiService.get("chats", {
        params: { userId: this.root.authStore.user?._id },
      });

      this.chats = data;
    } catch (e) {
      console.log(e);
    } finally {
      this.isLoading = false;
    }
  }

  @action.bound
  public async createChat(userIds: string[]) {
    this.isLoading = true;

    try {
      const { authStore } = this.root;
      if (authStore.user) userIds.push(authStore.user?._id);

      const { data } = await ApiService.post("chats/create", { userIds });

      data.users = data.users.map((usr: IUser) => usr._id);

      this.currentChat = data;
      this.chats.unshift(data);
    } catch (e) {
      console.log(e);
    } finally {
      this.isLoading = false;
    }
  }

  @action.bound
  public async fetchChat(chatId: string) {
    this.isLoading = true;

    try {
      const { data } = await ApiService.get(`chats/${chatId}`);
      console.log(data);
      this.currentChat = data;
    } catch (e) {
      console.log(e);
    } finally {
      this.isLoading = false;
    }
  }

  @action.bound
  public async sendMessage(type: EMessageType, content: string) {
    this.isLoading = true;

    try {
      const { data } = await ApiService.post("chats/send-message", {
        type,
        content,
        senderId: this.root?.authStore?.user?._id,
        chatId: this.currentChat?._id,
      });

      this.currentChat?.messages?.push(data);
    } catch (e) {
      console.log(e);
    } finally {
      this.isLoading = false;
    }
  }
}
