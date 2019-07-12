import { Message } from '@/models/Message';
import {
  HistoriesResponse,
  RawMessage,
} from '@/repositories/MessageRepository';

export class MessageConverter {

  public static convertMessage(raw: RawMessage): Message {
    const m = new Message(raw.body);
    m.id = raw.id;
    m.createdAt = new Date(raw.createdAt);
    m.operatorId = raw.operatorId;
    m.uid = raw.uid;
    return m;
  }

  public static convertMessages(response: HistoriesResponse): Message[] {
    return response.messages.map((row: any) => {
      const m = new Message(row.body);
      m.id = row.id;
      m.createdAt = row.createdAt;
      m.operatorId = row.operatorId;
      m.uid = row.uid;
      return m;
    });
  }
}
