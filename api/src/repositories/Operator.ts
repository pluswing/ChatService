
export class Operator {
    id: number = 0;
    name: string;
    loginId: string;
    password: string;
    constructor(name: string, loginId: string, password: string) {
        this.name = name;
        this.loginId = loginId;
        this.password = this.toDigest(password);
    }

    toDigest(password: string) {
        return password; // FIXME to hash
    }

    changePassword(newPassword: string) {
        this.password = this.toDigest(newPassword);
    }
}

export interface OperatorRepository {
    create(name: string, loginId: string, password: string): Operator;
    availableLoginId(loginId: string): boolean;
    update(operator: Operator): Operator;
    login(loginId: string, password: string): Operator;
    find(loginId: string): Operator | null;
}

class OperatorMemory implements OperatorRepository {
    private operators: { [key: string]: Operator } = {};

    create(name: string, loginId: string, password: string): Operator {
        if (!this.availableLoginId(loginId)) {
            throw new Error('already login id'); // FIXME
        }
        if (this.operators[loginId]) {
            return this.operators[loginId];
        }
        // FIXME passwordはhash化する。
        const o = new Operator(name, loginId, password);
        o.id = Object.keys(this.operators).length + 1;
        this.operators[loginId] = o;
        return o;
    }

    availableLoginId(loginId: string): boolean {
        return !!this.operators[loginId];
    }

    update(operator: Operator): Operator {
        // FIXME loginIdが変わった時に変更前のデータが残る問題。
        this.operators[operator.loginId] = operator;
        return operator;
    }

    login(loginId: string, password: string): Operator {
        const o = this.operators[loginId];
        if (!o) {
            throw new Error('operator not found');
        }
        if (o.password !== o.toDigest(password)) {
            throw new Error('invalid password');
        }
        return o;
    }
    find(loginId: string): Operator | null {
        return this.operators[loginId];
    }

}

export const operators: OperatorRepository = new OperatorMemory();
