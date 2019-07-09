import { MessageConverter } from '@/converter/MessageConverter';
import { Message } from '@/models/Message';
import { MessageRepository } from '@/repositories/MessageRepository';

export class ActivitiesUsecase {
  private repo: MessageRepository;

  constructor(repo: MessageRepository) {
    this.repo = repo;
  }

  public async execute(): Promise<Message[]> {
    const res = await this.repo.activities();
    return MessageConverter.convertMessages(res);
  }
}
