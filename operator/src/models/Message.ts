import moment from 'moment';
import 'moment/locale/ja';

export interface IMessage {
    id: number;
    uid: string;
    body: string;
    createdAt: Date;
    operatorId: number | null;
}

export class Message implements IMessage {

    public static from(o: IMessage): Message {
        const m = new Message(o.body);
        m.id = o.id;
        m.uid = o.uid;
        m.operatorId = o.operatorId;
        m.createdAt = o.createdAt;
        return m;
    }
    public id: number = 0;
    public uid: string = '';
    public body: string = '';
    public createdAt: Date = new Date();
    public operatorId: number | null = null;

    constructor(body: string) {
        this.body = body;
    }

    public date(): string {
        return moment(this.createdAt).format('YYYY/MM/DD HH:mm:ss');
    }
    public fromNow(): string {
        return moment(this.createdAt).fromNow();
    }
}
