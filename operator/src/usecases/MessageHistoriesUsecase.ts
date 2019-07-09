import { MessageConverter } from '@/converter/MessageConverter';
import { Message } from '@/models/Message';
import { MessageRepository } from '@/repositories/MessageRepository';

export class MessageHistoriesUsecase {
  private repo: MessageRepository;

  constructor(repo: MessageRepository) {
    this.repo = repo;
  }

  public async execute(uid: string): Promise<Message[]> {
    const res = await this.repo.histories({ uid });
    return MessageConverter.convertMessages(res);
  }
}
