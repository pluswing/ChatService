import { User } from '@/models/User';
import { UserRepository } from '@/repositories/UserRepository';

export default class GetUsers {
  private repo: UserRepository;

  constructor(repo: UserRepository) {
    this.repo = repo;
  }

  public async do(token: string): Promise<User[]> {
    return await this.repo.list(token);
  }
}
