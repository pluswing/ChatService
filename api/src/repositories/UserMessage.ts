import { insert, select } from './db';
import { User } from './User';

export class UserMessage {
  public id: number = 0;
  public userId: number;
  public body: string;
  public createdAt: Date;
  public operatorId: number | null;

  constructor(userId: number, body: string) {
    this.userId = userId;
    this.body = body;
    this.createdAt = new Date();
    this.operatorId = null;
  }
}

export interface UserMessageRepository {
  histories(user: User): Promise<UserMessage[]>;
  add(userMessage: UserMessage): Promise<UserMessage>;
  latestMessage(user: User): Promise<UserMessage>;
}

class UserMessageMemory implements UserMessageRepository {
  private messages: { [key: number]: UserMessage[] } = {};

  public async histories(user: User): Promise<UserMessage[]> {
    return this.messages[user.id] || [];
  }

  public async add(userMessage: UserMessage): Promise<UserMessage> {
    if (!this.messages[userMessage.userId]) {
      this.messages[userMessage.userId] = [];
    }
    this.messages[userMessage.userId].push(userMessage);
    return userMessage;
  }
  public async latestMessage(user: User): Promise<UserMessage> {
    const list = await this.histories(user);
    return list[list.length - 1];
  }
}

export class UserMessageDAO implements UserMessageRepository {
  public async histories(user: User): Promise<UserMessage[]> {
    const query = 'SELECT * FROM user_messages WHERE user_id = ? ORDER BY id';
    const rows = await select(query, [user.id]);
    return rows.map((r) => {
      const m = new UserMessage(r.user_id, r.body);
      m.id = r.id;
      m.createdAt = r.created_at;
      m.operatorId = r.operator_id;
      return m;
    });
  }

  public async add(userMessage: UserMessage): Promise<UserMessage> {
    const res = await insert('user_messages', {
      user_id: userMessage.userId,
      body: userMessage.body,
      created_at: userMessage.createdAt,
      operator_id: userMessage.operatorId,
    });
    userMessage.id = res.insertId;
    return userMessage;
  }

  public async latestMessage(user: User): Promise<UserMessage> {
    const query =
      'SELECT * FROM user_messages WHERE user_id = ? ORDER BY id DESC limit 1';
    const rows = await select(query, [user.id]);
    if (rows.length === 0) {
      throw new Error('illigal state');
    }
    const m = new UserMessage(rows[0].user_id, rows[0].body);
    m.id = rows[0].id;
    m.createdAt = rows[0].created_at;
    m.operatorId = rows[0].operator_id;
    return m;
  }
}

export const userMessages: UserMessageRepository = new UserMessageMemory();
