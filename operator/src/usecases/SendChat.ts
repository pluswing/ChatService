import { Message } from '@/models/Message';
import { ChatRepository } from '@/repositories/ChatRepository';

export class SendChat {
    private repo: ChatRepository;

    constructor(repo: ChatRepository) {
        this.repo = repo;
    }

    public onNewMessage: (message: Message) => void = (m) => { };

    public async post(message: Message, token: string) {
        const m = await this.repo.post(message, token);
        this.onNewMessage(m);
    }
}
