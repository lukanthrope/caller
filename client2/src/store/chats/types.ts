import { IChat } from "../../interfaces";

export interface IChatsStore {
  chats: IChat[];
  currentChat: IChat | null;
  isLoading: boolean;
  error: string;

  fetchChats(): Promise<void>;
  fetchChat(chatId: string): Promise<void>;
  createChat(userIds: string[]): Promise<void>;
  addUserToChat(userId: string): Promise<void>;

  sendMessage(content: string): Promise<void>;
  sendImageMessage(image: File): Promise<void>;

  clearStore(): void;
  clearError(): void;
}
