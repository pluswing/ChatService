import { Message } from '@/models/Message';
import { ChatRepository } from '@/repositories/ChatRepository';

export class SendChat {
    private repo: ChatRepository;

    constructor(repo: ChatRepository) {
        this.repo = repo;
    }

    public onNewMessage: (message: Message) => void = (m) => {};

    public async post(message: Message) {
        const m = await this.repo.post(message);
        this.onNewMessage(m);
    }

    public async histories(): Promise<Message[]> {
        return await this.repo.histories();
    }
}
