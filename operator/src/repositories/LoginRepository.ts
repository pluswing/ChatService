export interface LoginRepository {
  login(request: LoginRequest): Promise<LoginResponse>;
}

export interface LoginRequest {
  loginId: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  operator: RawOperator;
}

export interface RawOperator {
  id: number;
  name: string;
}
