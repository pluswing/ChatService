
export class User {
    id: number = 0;
    uid: string;
    constructor(uid: string) {
        this.uid = uid;
    }
}

export interface UserRepository {
    findOrCreate(uid: string): User;
}

class UserMemory implements UserRepository {
    private users: {[key: string]: User} = {};

    findOrCreate(uid: string): User {
        if (this.users[uid]) {
            return this.users[uid];
        }
        const u = new User(uid);
        u.id = Object.keys(this.users).length + 1;
        this.users[uid] = u;
        return u;
    }
}

export const users : UserRepository = new UserMemory();
