import moment from 'moment';
import 'moment/locale/ja';

export class Message {
  public id: number = 0;
  public uid: string = '';
  public body: string = '';
  public createdAt: Date = new Date();
  public operatorId?: number;

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
