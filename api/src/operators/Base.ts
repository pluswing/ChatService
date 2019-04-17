import { UserMessage } from '../repositories/UserMessage';
import { User } from '../repositories/User';

export interface Base {
    onMessage(user: User, message: UserMessage): Promise<void>;
}
