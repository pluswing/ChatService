import { UserRepository } from './UserRepository';
import { User } from '@/models/User';
import { Message } from '@/models/Message';
import post from './api';

export default class UserApi implements UserRepository {

    public async list(token: string): Promise<User[]> {
        const data = await post('/v1/operator/users', {}, token);
        const list: any[] = data.data;
        return list.map((row) => {
            const message = new Message(row.message.body);
            message.id = row.message.id;
            message.createdAt = row.message.createdAt;
            message.operatorId = row.message.operatorId;
            return new User(row.user.id, row.user.uid, message);
        });
    }
}
