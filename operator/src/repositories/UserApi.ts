import { Message } from '@/models/Message';
import { User } from '@/models/User';
import { post } from './api';
import { UserListResponse, UserRepository } from './UserRepository';

export class UserApi implements UserRepository {
  public async list(): Promise<UserListResponse> {
    return await post('/v1/operator/users', {});
  }
}
