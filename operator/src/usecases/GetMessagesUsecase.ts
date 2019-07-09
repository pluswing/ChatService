import { MessageConverter } from '@/converter/MessageConverter';
import { Message } from '@/models/Message';
import { ChatRepository } from '@/repositories/ChatRepository';

export class GetMessagesUsecase {
  private repo: ChatRepository;

  constructor(repo: ChatRepository) {
    this.repo = repo;
  }

  public async execute(uid: string): Promise<Message[]> {
    const res = await this.repo.histories({ uid });
    return MessageConverter.convertMessages(res);
  }
}
