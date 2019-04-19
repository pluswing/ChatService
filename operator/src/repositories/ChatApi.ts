import { Message } from '@/models/Message';
import { ChatRepository } from '@/repositories/ChatRepository';
// import request from 'request-promise';

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
    public histories(): Promise<Message[]> {
        return new Promise((resolve, _) => resolve(this.messages));
    }

    //    private async api(path: string, params: {[key: string]: string}) {
    //    }
}
