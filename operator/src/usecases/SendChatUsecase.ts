import { MessageConverter } from '@/converter/MessageConverter';
import { Message } from '@/models/Message';
import { ChatRepository } from '@/repositories/ChatRepository';

export class SendChatUsecase {
  private repo: ChatRepository;

  constructor(repo: ChatRepository) {
    this.repo = repo;
  }

  public onNewMessage: (message: Message) => void = (m) => {};

  public async execute(message: Message) {
    const res = await this.repo.post(message);
    const m = MessageConverter.convertMessage(res.message);
    this.onNewMessage(m);
  }
}
