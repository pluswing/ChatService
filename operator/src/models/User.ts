import { IMessage, Message } from './Message';

export interface IUser {
    id: number;
    uid: string;
    message: IMessage;
    arrival: number;
}

export class User implements IUser {

    public static from(o: IUser): User {
        const u = new User(o.id, o.uid, Message.from(o.message));
        u.arrival = o.arrival;
        return u;
    }

    public id: number = 0;
    public uid: string = '';
    public message: Message;
    public arrival: number = 0;

    constructor(id: number, uid: string, message: Message) {
        this.id = id;
        this.uid = uid;
        this.message = message;
        this.arrival = 0;
    }
}
