import { LoginConverter } from '@/converter/LoginConverter';
import { Operator } from '@/models/Operator';
import { LoginRepository } from '@/repositories/LoginRepository';

export class LoginUsecase {
  private repo: LoginRepository;

  constructor(repo: LoginRepository) {
    this.repo = repo;
  }

  public async execute(operator: Operator) {
    const res = await this.repo.login({
      loginId: operator.loginId,
      password: operator.password,
    });
    return LoginConverter.convert(operator, res);
  }
}
