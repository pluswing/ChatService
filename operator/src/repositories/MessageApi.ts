import {
  ActivitiesResponse,
  HistoriesRequest,
  HistoriesResponse,
  MessageRepository,
  PostRequest,
  PostResponse,
} from '@/repositories/MessageRepository';
import { post } from './api';

export class MessageApi implements MessageRepository {
  public async post(request: PostRequest): Promise<PostResponse> {
    return await post('/v1/operator/send', request);
  }

  public async histories(request: HistoriesRequest): Promise<HistoriesResponse> {
    return await post('/v1/operator/messages', request);
  }

  public async activities(): Promise<ActivitiesResponse> {
    return await post('/v1/operator/activities', {});
  }
}

