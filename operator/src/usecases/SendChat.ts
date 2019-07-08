import { MessageConverter } from '@/converter/MessageConverter';
import { Message } from '@/models/Message';
import { ChatRepository } from '@/repositories/ChatRepository';

export class SendChat {
  private repo: ChatRepository;

  constructor(repo: ChatRepository) {
    this.repo = repo;
  }

  public onNewMessage: (message: Message) => void = (m) => {};

  public async post(message: Message) {
    const res = await this.repo.post(message);
    const m = MessageConverter.convertMessage(res);
    this.onNewMessage(m);
  }
}
