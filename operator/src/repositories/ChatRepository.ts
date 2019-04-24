import { Message } from '@/models/Message';

export interface ChatRepository {
    post(message: Message): Promise<Message>;
    histories(uid: string, token: string): Promise<Message[]>;
}
