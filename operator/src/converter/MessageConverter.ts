import { Message } from '@/models/Message';
import { HistoriesResponse, PostResponse } from '@/repositories/ChatRepository';

export class MessageConverter {

  public static convertMessage(response: PostResponse): Message {
    const row = response.message;
    const m = new Message(row.body);
    m.id = row.id;
    m.createdAt = new Date(row.createdAt);
    m.operatorId = row.operatorId || null;
    return m;
  }

  public static convertMessages(response: HistoriesResponse): Message[] {
    return response.messages.map((row: any) => {
      const m = new Message(row.body);
      m.id = row.id;
      m.createdAt = row.createdAt;
      m.operatorId = row.operatorId;
      return m;
    });
  }

}
