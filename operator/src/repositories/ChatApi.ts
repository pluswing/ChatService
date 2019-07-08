import {
  ChatRepository,
  HistoriesRequest,
  HistoriesResponse,
  PostRequest,
  PostResponse,
} from '@/repositories/ChatRepository';
import { post } from './api';

export class ChatApi implements ChatRepository {
  public async post(request: PostRequest): Promise<PostResponse> {
    return await post('/v1/operator/send', request);
  }

  public async histories(request: HistoriesRequest): Promise<HistoriesResponse> {
    return await post('/v1/operator/messages', request);
  }
}

