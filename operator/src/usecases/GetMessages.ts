import { MessageConverter } from '@/converter/MessageConverter';
import { Message } from '@/models/Message';
import { ChatRepository } from '@/repositories/ChatRepository';

export default class GetMessages {
  private repo: ChatRepository;

  constructor(repo: ChatRepository) {
    this.repo = repo;
  }

  public async handle(uid: string, token: string): Promise<Message[]> {
    const res = await this.repo.histories({ uid });
    return MessageConverter.convertMessages(res);
  }
}
