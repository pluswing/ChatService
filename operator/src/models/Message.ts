import moment from 'moment';
import 'moment/locale/ja';

export class Message {
    public id: number = 0;
    public message: string = '';
    public createdAt: Date = new Date();
    public operatorId: number | null = null;

    constructor(message: string) {
        this.message = message;
    }

    public date(): string {
        // return moment(this.createdAt).fromNow();
        return moment(this.createdAt).format('YYYY/MM/DD HH:mm:ss');
    }
}
