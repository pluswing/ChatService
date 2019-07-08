import { Message } from '@/models/Message';

export interface ChatRepository {
  post(request: PostRequest): Promise<PostResponse>;
  histories(request: HistoriesRequest): Promise<HistoriesResponse>;
}

export interface PostRequest {
  uid: string;
  body: string;
}

export interface PostResponse {
  message: RawMessage;
}

export interface RawMessage {
  id: number;
  body: string;
  createdAt: string;
  operatorId?: number;
}

export interface HistoriesRequest {
  uid: string;
}

export interface HistoriesResponse {
  messages: RawMessage[];
}
