import { EMessageType } from "../../enums";
import { IChat } from "../../interfaces";

export interface IChatsStore {
  chats: IChat[];
  currentChat: IChat | null;
  isLoading: boolean;
  fetchChats(): Promise<void>;
  fetchChat(chatId: string): Promise<void>;
  sendMessage(type: EMessageType, content: string): Promise<void>;
}
