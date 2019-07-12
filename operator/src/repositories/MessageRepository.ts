export interface MessageRepository {
  post(request: PostRequest): Promise<PostResponse>;
  histories(request: HistoriesRequest): Promise<HistoriesResponse>;
  activities(): Promise<ActivitiesResponse>;
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
  createdAt: Date;
  operatorId?: number;
  uid: string;
}

export interface HistoriesRequest {
  uid: string;
}

export interface HistoriesResponse {
  messages: RawMessage[];
}

export interface ActivitiesResponse {
  messages: RawMessage[];
}
