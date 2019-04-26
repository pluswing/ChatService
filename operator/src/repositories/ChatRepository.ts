import { Message } from '@/models/Message';

export interface ChatRepository {
    post(message: Message, token: string): Promise<Message>;
    histories(uid: string, token: string): Promise<Message[]>;
}
