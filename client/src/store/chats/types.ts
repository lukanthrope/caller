import { IChat } from "../../interfaces";
import { IFile } from "../../interfaces/file.interface";

export interface IChatsStore {
  chats: IChat[];
  currentChat: IChat | null;
  isLoading: boolean;

  fetchChats(): Promise<void>;

  fetchChat(chatId: string): Promise<void>;
  createChat(userIds: string[]): Promise<void>;

  sendMessage(content: string): Promise<void>;
  sendImageMessage(image: IFile): Promise<void>;

  clearStore(): void;
}
