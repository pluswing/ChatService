import { Message } from './Message';

export class User {
    public id: number = 0;
    public uid: string = '';
    public message: Message;

    constructor(id: number, uid: string, message: Message) {
        this.id = id;
        this.uid = uid;
        this.message = message;
    }
}
