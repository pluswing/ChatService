import { Message } from '@/models/Message';
import { ChatRepository } from '@/repositories/ChatRepository';
import post from './api';
import GetMessages from '@/usecases/GetMessages';

export class ChatApi implements ChatRepository {
    // for test
    private index = 0;
    private messages: Message[] = [];

    public post(message: Message): Promise<Message> {
        /*
                const res = await request.post(this.url + '/v1/post', {
                    message: message.message,
                });
                const json = JSON.parse(res.body());
                return Message(json.id, json.message);
        */
        message.id = this.index;
        this.index++;
        this.messages.push(message);
        return new Promise((resolve, _) => resolve(message));
    }

    public async histories(uid: string, token: string): Promise<Message[]> {
        const data = await post('/v1/operator/messages', { uid }, token);
        return data.messages.map((row: any) => {
            const m = new Message(row.body);
            m.id = row.id;
            m.createdAt = row.createdAt;
            m.operatorId = row.operatorId;
            return m;
        });
    }

    //    private async api(path: string, params: {[key: string]: string}) {
    //    }
}
