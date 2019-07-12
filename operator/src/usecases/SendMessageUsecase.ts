import { MessageConverter } from '@/converter/MessageConverter';
import { Message } from '@/models/Message';
import { MessageRepository } from '@/repositories/MessageRepository';

export class SendMessageUsecase {
  private repo: MessageRepository;

  constructor(repo: MessageRepository) {
    this.repo = repo;
  }

  public async execute(message: Message) {
    const res = await this.repo.post(message);
    const m = MessageConverter.convertMessage(res.message);
  }
}
