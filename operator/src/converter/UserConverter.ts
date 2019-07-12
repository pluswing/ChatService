import { Message } from '@/models/Message';
import { User } from '@/models/User';
import { RawUser, UserListResponse } from '@/repositories/UserRepository';
import { MessageConverter } from './MessageConverter';

export class UserConverter {

  public static convertUserList(response: UserListResponse) {
    const data = response.data;
    return data.map((um) => {
      const message = MessageConverter.convertMessage(um.message);
      return this.convertUser(um.user, message);
    });
  }

  public static convertUser(raw: RawUser, message: Message): User {
    return new User(raw.id, raw.uid, message);
  }
}
