import { insert, select } from './db';

export class User {
  public id: number = 0;
  public uid: string;
  constructor(uid: string) {
    this.uid = uid;
  }
}

export interface UserRepository {
  findOrCreate(uid: string): Promise<User>;
  list(): Promise<User[]>;
}

class UserMemory implements UserRepository {
  private users: { [key: string]: User } = {};

  public async findOrCreate(uid: string): Promise<User> {
    if (this.users[uid]) {
      return this.users[uid];
    }
    const u = new User(uid);
    u.id = Object.keys(this.users).length + 1;
    this.users[uid] = u;
    return u;
  }
  public async list(): Promise<User[]> {
    return Object.values(this.users);
  }
}

export class UserDAO implements UserRepository {
  public async findOrCreate(uid: string): Promise<User> {
    const selectQuery = 'SELECT * FROM users WHERE uid = ?';
    let rows = await select(selectQuery, [uid]);
    if (rows.length === 0) {
      await insert('users', { uid });
      rows = await select(selectQuery, [uid]);
    }
    const u = new User(rows[0].uid);
    u.id = rows[0].id;
    return u;
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
