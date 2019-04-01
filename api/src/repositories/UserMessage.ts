import { insert, select } from './db';

export class UserMessage {
    id: number = 0;
    userId: number;
    body: string;
    createdAt: Date;
    operatorId: number | null;

    constructor(userId: number, body: string) {
        this.userId = userId;
        this.body = body;
        this.createdAt = new Date();
        this.operatorId = null;
    }
}

export interface UserMessageRepository {
    histories(userId: number): Promise<UserMessage[]>;
    add(userMessage: UserMessage): Promise<void>;
}

class UserMessageMemory implements UserMessageRepository {
    private messages: { [key: number]: UserMessage[] } = {};

    async histories(userId: number): Promise<UserMessage[]> {
        return this.messages[userId] || [];
    }

    async add(userMessage: UserMessage): Promise<void> {
        if (!this.messages[userMessage.userId]) {
            this.messages[userMessage.userId] = [];
        }
        this.messages[userMessage.userId].push(userMessage);
    }
}

export class UserMessageDAO implements UserMessageRepository {
    async histories(userId: number): Promise<UserMessage[]> {
        const query = 'SELECT * FROM user_messages WHERE user_id = ? ORDER BY id';
        const rows = await select(query, [userId]);
        return rows.map((r) => {
            const m = new UserMessage(r.user_id, r.body);
            m.id = r.id;
            m.createdAt = r.created_at;
            m.operatorId = r.operator_id;
            return m;
        });
    }

    async add(userMessage: UserMessage): Promise<void> {
        const query = `
        INSERT INTO user_messages
            (user_id, body, created_at, operator_id)
            VALUES
            (?, ?, ?, ?)
        `;
        await insert(query, [
            userMessage.userId, userMessage.body,
            userMessage.createdAt, userMessage.operatorId]);
    }
}

export const userMessages: UserMessageRepository = new UserMessageMemory();
