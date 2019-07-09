import { RawMessage } from './MessageRepository';

export interface UserRepository {
  list(): Promise<UserListResponse>;
}

export interface UserListResponse {
  data: RawUserMessage[];
}

export interface RawUserMessage {
  user: RawUser;
  message: RawMessage;
}

export interface RawUser {
  id: number;
  uid: string;
  message: RawMessage;
}
