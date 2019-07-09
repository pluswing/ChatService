import { Message } from '@/models/Message';
import { User } from '@/models/User';
import { HistoriesResponse, PostResponse, RawMessage } from '@/repositories/ChatRepository';
import { StoreMessage } from '@/store/messages';

export class MessageConverter {

  public static convertMessage(raw: RawMessage): Message {
    const m = new Message(raw.body);
    m.id = raw.id;
    m.createdAt = new Date(raw.createdAt);
    m.operatorId = raw.operatorId;
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
