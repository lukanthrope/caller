import { action, observable } from "mobx";
import ApiService from "../../services/api";
import SocketService from "../../services/ws.service";
import { IChat, IMessage, IUser } from "../../interfaces";
import { IChatsStore } from "./types";
import { Store } from "../root";
import { EMessageType } from "../../enums";

export class ChatsStore implements IChatsStore {
  @observable
  public chats: IChat[] = [];

  @observable
  public currentChat: IChat | null = null;

  @observable
  public error = "";

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

      this.setupSocketListeters();

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

    const exists = await this.checkIfExists(userIds);

    if (exists) return;

    try {
      const { authStore } = this.root;
      if (authStore.user) userIds.push(authStore.user?._id);

      const { data } = await ApiService.post("chats/create", { userIds });

      this.currentChat = data;
      this.chats.unshift(data);
    } catch (e) {
      console.log(e);
    } finally {
      this.isLoading = false;
    }
  }

  @action.bound
  public async addUserToChat(userId: string) {
    this.isLoading = true;

    try {
      await ApiService.post("chats/add-user-to-chat", {
        chatId: this.currentChat?._id,
        userId,
      });

      this.error = "";
    } catch (e) {
      this.error = "User not found";
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
  public async sendMessage(content: string) {
    this.isLoading = true;

    try {
      await ApiService.post("chats/send-message", {
        type: EMessageType.Text,
        content,
        senderId: this.root?.authStore?.user?._id,
        chatId: this.currentChat?._id,
      });
    } catch (e) {
      console.log(e);
    } finally {
      this.isLoading = false;
    }
  }
  @action.bound
  public async sendImageMessage(image: File) {
    this.isLoading = true;

    try {
      const formData = new FormData();
      formData.append("image", image as any);

      await ApiService.post("chats/send-image-message", formData, {
        params: {
          type: EMessageType.Image,
          senderId: this.root?.authStore?.user?._id,
          chatId: this.currentChat?._id,
        },
      });
    } catch (e) {
      console.log(e);
    } finally {
      this.isLoading = false;
    }
  }

  @action.bound
  public clearError() {
    this.error = "";
  }

  @action.bound
  private async checkIfExists(userIds: string[]) {
    let exists = false;
    if (userIds.length === 1) {
      await Promise.all(
        this.chats.map(async (chat) => {
          const { users } = chat;
          console.log(users);
          if (users.includes(userIds[0]) && users.length < 3) {
            await this.fetchChat(chat._id);
            exists = true;
          }
        })
      );
    }

    return exists;
  }

  @action.bound
  private appendMessage(message: IMessage) {
    const exists = this.currentChat?.messages?.find(
      (it) => it._id === message._id
    );
    if (!exists) this.currentChat?.messages?.push(message);
  }

  private setupSocketListeters() {
    if (this.root.authStore.user) {
      SocketService.handleConnection(this.root.authStore.user._id);

      SocketService.on("new-message", (data: any) => {
        if (data.chat._id === this.currentChat?._id)
          this.appendMessage(data.message);

        if (this.chats[0]._id !== data.chat._id) {
          this.chats = this.chats.filter((it) => it._id !== data.chat._id);
          this.chats.unshift(data.chat);
        }
      });

      SocketService.on("user-added", (data: any) => {
        const { chat } = data.payload;

        if (this.currentChat && chat._id === this.currentChat._id) {
          this.currentChat.users = chat.users;
          this.currentChat.title = chat.title;
          return;
        }

        this.chats = this.chats.filter((it) => it._id !== chat._id);
        this.chats.unshift(chat);
      });
    }
  }
}
