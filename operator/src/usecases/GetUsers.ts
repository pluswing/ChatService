import { Operator } from '@/models/Operator';
import Axios from 'axios';
import { User } from '@/models/User';
import { Message } from '@/models/Message';

export default class GetUsers {
    // private repo: ChatRepository;

    // constructor(repo: ChatRepository) {
    //    this.repo = repo;
    // }

    public async do(token: string): Promise<User[]> {
        const res = await Axios.post(
            'http://localhost:3000/v1/operator/users', {
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
