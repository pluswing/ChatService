import db from './db';

export class User {
    id: number = 0;
    uid: string;
    constructor(uid: string) {
        this.uid = uid;
    }
}

export interface UserRepository {
    findOrCreate(uid: string): Promise<User | null>;
}

class UserMemory implements UserRepository {
    private users: { [key: string]: User } = {};

    async findOrCreate(uid: string): Promise<User | null> {
        if (this.users[uid]) {
            return this.users[uid];
        }
        const u = new User(uid);
        u.id = Object.keys(this.users).length + 1;
        this.users[uid] = u;
        return u;
    }
}

export class UserDAO implements UserRepository {

    async findOrCreate(uid: string): Promise<User | null> {
        const query = 'SELECT * FROM users WHERE uid = ?';
        const [rows, fields] = await db().execute(query, [uid]);
        console.log(fields);
        if (rows.length === 0) return null;
        const u = new User(rows[0].uid);
        u.id = rows[0].id;
        return u;
    }
}

export const users: UserRepository = new UserMemory();
