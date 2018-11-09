
export class UserMessage {
    id: number = 0;
    userId: number;
    body: string;
    createdAt: Date;
    operatorId: number|null;

    constructor(userId: number, body: string) {
        this.userId = userId;
        this.body = body;
        this.createdAt = new Date();
        this.operatorId = null;
    }
}

export interface UserMessageRepository {
    histories(userId: number): UserMessage[];
    add(userMessage: UserMessage): void;
}

class UserMessageMemory implements UserMessageRepository {
    private messages: {[key: number]: UserMessage[]} = {};

    histories(userId: number): UserMessage[] {
        return this.messages[userId] || [];
    }

    add(userMessage: UserMessage): void {
        if (!this.messages[userMessage.userId]) {
            this.messages[userMessage.userId] = [];
        }
        this.messages[userMessage.userId].push(userMessage);
    }
}

export const userMessages : UserMessageRepository = new UserMessageMemory();
