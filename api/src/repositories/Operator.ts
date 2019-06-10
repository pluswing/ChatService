import { select, insert, update } from './db';
import * as crypto from 'crypto';

export class Operator {
    id: number = 0;
    name: string;
    loginId: string;
    private password: string;
    constructor(name: string, loginId: string, password: string) {
        this.name = name;
        this.loginId = loginId;
        this.password = this.toDigest(password);
    }

    toDigest(password: string) {
        const secret = 'abcdefg';
        return crypto.createHmac('sha256', secret)
            .update(password)
            .digest('hex');
    }

    changePassword(newPassword: string) {
        this.password = this.toDigest(newPassword);
    }

    getDigestedPassword() {
        return this.password;
    }

    setDigestedPassword(password: string) {
        this.password = password;
    }
}

export interface OperatorRepository {
    create(name: string, loginId: string, password: string): Promise<Operator>;
    availableLoginId(loginId: string): Promise<boolean>;
    update(operator: Operator): Promise<Operator>;
    login(loginId: string, password: string): Promise<Operator>;
    find(loginId: string): Promise<Operator | null>;
    findAll(): Promise<Operator[]>;
}

class OperatorMemory implements OperatorRepository {
    private operators: { [key: string]: Operator } = {};

    async create(name: string, loginId: string, password: string): Promise<Operator> {
        if (this.availableLoginId(loginId)) {
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

    async availableLoginId(loginId: string): Promise<boolean> {
        return !!this.operators[loginId];
    }

    async update(operator: Operator): Promise<Operator> {
        // FIXME loginIdが変わった時に変更前のデータが残る問題。
        this.operators[operator.loginId] = operator;
        return operator;
    }

    async login(loginId: string, password: string): Promise<Operator> {
        const o = this.operators[loginId];
        if (!o) {
            throw new Error('operator not found');
        }
        if (o.getDigestedPassword() !== o.toDigest(password)) {
            throw new Error('invalid password');
        }
        return o;
    }
    async find(loginId: string): Promise<Operator | null> {
        return this.operators[loginId];
    }

    async findAll(): Promise<Operator[]> {
        return Object.keys(this.operators).map((k: string) => {
            return this.operators[k];
        });
    }
}

export class OperatorDAO implements OperatorRepository {

    async create(name: string, loginId: string, password: string): Promise<Operator> {
        if (!await this.availableLoginId(loginId)) {
            throw new Error('already login id');
        }
        let operator = await this.find(loginId);
        if (operator) {
            return operator;
        }

        operator = new Operator(name, loginId, password);
        await insert('operators', {
            name: operator.name,
            login_id: operator.loginId,
            password: operator.getDigestedPassword(),
        });
        operator = await this.find(loginId);
        return operator!!;
    }

    async availableLoginId(loginId: string): Promise<boolean> {
        return ! await this.find(loginId);
    }

    async update(operator: Operator): Promise<Operator> {
        const query = 'SELECT * FROM operators WHERE id = ?';
        const rows = await select(query, [operator.id]);

        if (rows.length === 0) {
            throw new Error('operator not found');
        }

        if (rows[0].login_id !== operator.loginId) {
            if (!await this.availableLoginId(operator.loginId)) {
                throw new Error('already login id');
            }
        }

        const params = {
            name: operator.name,
            login_id: operator.loginId,
            password: operator.getDigestedPassword(),
        };
        const where = {
            id: operator.id,
        };
        await update('operators', params, where);
        return operator;
    }

    async login(loginId: string, password: string): Promise<Operator> {
        const o = await this.find(loginId);
        if (!o) {
            throw new Error('operator not found');
        }
        if (o.getDigestedPassword() !== o.toDigest(password)) {
            throw new Error('invalid password');
        }
        return o;
    }

    async find(loginId: string): Promise<Operator | null> {
        const query = 'SELECT * FROM operators WHERE login_id = ?';
        const rows = await select(query, [loginId]);
        if (rows.length === 0) return null;
        const o = new Operator(rows[0].name, rows[0].login_id, '');
        o.setDigestedPassword(rows[0].password);
        o.id = rows[0].id;
        return o;
    }

    async findAll(): Promise<Operator[]> {
        const query = 'SELECT * FROM operators ORDER BY id';
        const rows = await select(query, []);
        return rows.map((r) => {
            const o = new Operator(r.name, r.login_id, '');
            o.setDigestedPassword(r.password);
            o.id = r.id;
            return o;
        });
    }
}

export const operators: OperatorRepository = new OperatorMemory();
