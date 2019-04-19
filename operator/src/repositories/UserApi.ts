import axios from 'axios';
import { UserRepository } from './UserRepository';
import { User } from '@/models/User';
import { Message } from '@/models/Message';

export default class UserApi implements UserRepository {
    public url: string;

    constructor(url: string) {
        this.url = url;
    }

    public async list(token: string): Promise<User[]> {
        const res = await axios.post(
            `${this.url}/v1/operator/users`, {
                // post data
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        const list: any[] = res.data.data;
        return list.map((row) => {
            const message = new Message(row.message.body);
            message.id = row.message.id;
            message.createdAt = row.message.createdAt;
            message.operatorId = row.message.operatorId;
            return new User(row.user.id, row.user.uid, message);
        });
    }
}
