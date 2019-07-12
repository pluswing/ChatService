import { Operator } from '@/models/Operator';
import { LoginResponse } from '@/repositories/LoginRepository';

export class LoginConverter {
  public static convert(operator: Operator, response: LoginResponse): Operator {
    operator.id = response.operator.id;
    operator.token = response.token;
    operator.name = response.operator.name;
    return operator;
  }
}
