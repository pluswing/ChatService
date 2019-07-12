import { User } from '../repositories/User';
import { UserMessage } from '../repositories/UserMessage';

export interface Base {
  onMessage(user: User, message: UserMessage): Promise<void>;
}
