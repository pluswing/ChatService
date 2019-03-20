import { Operator } from '@/models/Operator';

export interface LoginRepository {
    login(operator: Operator): Promise<Operator>;
}
