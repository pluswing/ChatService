import { Operator } from '@/models/Operator';
import { LoginRepository, LoginRequest, LoginResponse } from '@/repositories/LoginRepository';
import { post } from './api';

export class LoginApi implements LoginRepository {
  public async login(request: LoginRequest): Promise<LoginResponse> {
    return await post('/v1/operator/authenticate', request);
  }
}
