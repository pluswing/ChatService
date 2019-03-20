import { Operator } from '@/models/Operator';
import { LoginRepository } from '@/repositories/LoginRepository';
import axios from 'axios';

export class LoginApi implements LoginRepository {
    public url: string;

    constructor(url: string) {
        this.url = url;
    }

    public async login(operator: Operator): Promise<Operator> {
        const res = await axios.post(
            `${this.url}/v1/operator/authenticate`, {
                loginid: operator.loginId,
                password: operator.password,
            },
        );
        operator.loggedIn(res.data.token, res.data.operator.name);
        return operator;
    }
}
