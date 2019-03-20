import { Operator } from '@/models/Operator';
import { LoginRepository } from '@/repositories/LoginRepository';

export class Login {
    private repo: LoginRepository;

    constructor(repo: LoginRepository) {
        this.repo = repo;
    }

    public async login(operator: Operator) {
        const m = await this.repo.login(operator);
        return m;
    }
}
