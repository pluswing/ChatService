import { UserConverter } from '@/converter/UserConverter';
import { User } from '@/models/User';
import { UserRepository } from '@/repositories/UserRepository';

export class GetUsersUsecase {
  private repo: UserRepository;

  constructor(repo: UserRepository) {
    this.repo = repo;
  }

  public async execute(): Promise<User[]> {
    const res = await this.repo.list();
    return UserConverter.convertUserList(res);
  }
}
