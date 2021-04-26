import { IUser } from "../../interfaces";

export interface IUsersStore {
  users: IUser[];
  isLoading: boolean;

  fetchUsers(_id: string): Promise<void>;
  clearUsers(): void;
}
