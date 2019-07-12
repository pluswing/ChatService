import { insert, select } from './db';

export class User {
  public id: number = 0;
  public uid: string;
  constructor(uid: string) {
    this.uid = uid;
  }
}

export interface UserRepository {
  find(uid: string): Promise<User|null>;
  findOrCreate(uid: string): Promise<User>;
  list(): Promise<User[]>;
}

class UserMemory implements UserRepository {
  private users: { [key: string]: User } = {};

  public async find(uid: string): Promise<User|null> {
    if (this.users[uid]) {
      return this.users[uid];
    }
    return null;
  }

  public async findOrCreate(uid: string): Promise<User> {
    const u = await this.find(uid);
    if (u) { return u; }
    const newUser = new User(uid);
    newUser.id = Object.keys(this.users).length + 1;
    this.users[uid] = newUser;
    return newUser;
  }

  public async list(): Promise<User[]> {
    return Object.values(this.users);
  }
}

export class UserDAO implements UserRepository {
  public async find(uid: string): Promise<User|null> {
    const selectQuery = 'SELECT * FROM users WHERE uid = ?';
    const rows = await select(selectQuery, [uid]);
    if (rows.length === 0) {
      return null;
    }
    const u = new User(rows[0].uid);
    u.id = rows[0].id;
    return u;
  }

  public async findOrCreate(uid: string): Promise<User> {
    const u = await this.find(uid);
    if (u) { return u; }
    await insert('users', { uid });
    return await this.find(uid) as User;
  }

  public async list(): Promise<User[]> {
    const query = 'SELECT * FROM users ORDER BY id';
    const rows = await select(query, []);
    return rows.map((r) => {
      const u = new User(r.uid);
      u.id = r.id;
      return u;
    });
  }
}

export const users: UserRepository = new UserMemory();
