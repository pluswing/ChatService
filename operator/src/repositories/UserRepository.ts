import { User } from '@/models/User';

export interface UserRepository {
  list(token: string): Promise<User[]>;
}
