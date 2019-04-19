import { Operator } from '@/models/Operator';
import { LoginRepository } from '@/repositories/LoginRepository';
import post from './api';

export class LoginApi implements LoginRepository {

    public async login(operator: Operator): Promise<Operator> {
        const data = await post('/v1/operator/authenticate', {
            loginid: operator.loginId,
            password: operator.password,
        },
        );
        operator.loggedIn(data.token, data.operator.name);
        return operator;
    }
}
